import { access, mkdir, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const DEFAULT_INPUT = 'incoming-photos'
const DEFAULT_OUTPUT = 'src/assets/images'
const DEFAULT_MAX_WIDTH = 2400
const RESPONSIVE_WIDTHS = [640, 1280]
const SUPPORTED_EXTENSIONS = new Set([
  '.avif',
  '.heic',
  '.heif',
  '.jpeg',
  '.jpg',
  '.png',
  '.tif',
  '.tiff',
  '.webp',
])

function printHelp() {
  console.log(`Usage:
  npm run images:process -- --manifest <file>
  npm run images:process:all

Options:
  --input <dir>       Source folder (default: ${DEFAULT_INPUT})
  --output <dir>      Destination folder (default: ${DEFAULT_OUTPUT})
  --manifest <file>   JSON file containing reviewed photo mappings
  --all               Process every supported image and preserve its folder structure
  --max-width <px>    Maximum output width (default: ${DEFAULT_MAX_WIDTH})
  --force             Replace existing generated variants
  --dry-run           Show planned output without writing files
  --help              Show this message

The source photos are never changed. Each selected photo produces matching
.avif, .webp, and .jpg files. EXIF data, including location data, is removed.`)
}

function parseArguments(argv) {
  const options = {
    input: DEFAULT_INPUT,
    output: DEFAULT_OUTPUT,
    maxWidth: DEFAULT_MAX_WIDTH,
    all: false,
    force: false,
    dryRun: false,
  }

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]

    if (argument === '--help') options.help = true
    else if (argument === '--all') options.all = true
    else if (argument === '--force') options.force = true
    else if (argument === '--dry-run') options.dryRun = true
    else if (['--input', '--output', '--manifest', '--max-width'].includes(argument)) {
      const value = argv[index + 1]
      if (!value || value.startsWith('--')) {
        throw new Error(`${argument} requires a value`)
      }
      const key = argument.slice(2).replace('-width', 'Width')
      options[key] = value
      index += 1
    } else {
      throw new Error(`Unknown option: ${argument}`)
    }
  }

  options.maxWidth = Number(options.maxWidth)
  if (!Number.isInteger(options.maxWidth) || options.maxWidth < 320) {
    throw new Error('--max-width must be an integer of at least 320 pixels')
  }
  if (options.all && options.manifest) {
    throw new Error('Choose either --all or --manifest, not both')
  }
  if (!options.all && !options.manifest && !options.help) {
    throw new Error('Choose --manifest <file> for reviewed photos or --all for every photo')
  }

  return options
}

function slugifySegment(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

function outputBaseForSource(relativeSource) {
  const parsed = path.parse(relativeSource)
  const segments = parsed.dir.split(path.sep).filter(Boolean).map(slugifySegment)
  const filename = slugifySegment(parsed.name)
  return path.join(...segments, filename)
}

function resolveInside(root, relativePath, label) {
  if (path.isAbsolute(relativePath)) {
    throw new Error(`${label} must be relative: ${relativePath}`)
  }

  const resolvedRoot = path.resolve(root)
  const resolvedPath = path.resolve(resolvedRoot, relativePath)
  const relation = path.relative(resolvedRoot, resolvedPath)

  if (relation.startsWith('..') || path.isAbsolute(relation)) {
    throw new Error(`${label} escapes its root folder: ${relativePath}`)
  }
  return resolvedPath
}

async function exists(filename) {
  try {
    await access(filename)
    return true
  } catch {
    return false
  }
}

async function findImages(root, current = '') {
  const directory = resolveInside(root, current || '.', 'Source path')
  const entries = await readdir(directory, { withFileTypes: true })
  const images = []

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name === '.DS_Store') continue
    const relativePath = path.join(current, entry.name)
    if (entry.isDirectory()) {
      images.push(...await findImages(root, relativePath))
    } else if (SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      images.push(relativePath)
    }
  }

  return images
}

function validateManifestPhoto(photo, index) {
  if (!photo || typeof photo !== 'object') {
    throw new Error(`Manifest photo ${index + 1} must be an object`)
  }
  if (!photo.source || typeof photo.source !== 'string') {
    throw new Error(`Manifest photo ${index + 1} requires a source`)
  }
  if (photo.include !== false && (!photo.base || typeof photo.base !== 'string')) {
    throw new Error(`Manifest photo ${index + 1} requires an output base`)
  }
}

async function loadJobs(options) {
  if (options.all) {
    const sources = await findImages(options.input)
    return sources.map((source) => ({ source, base: outputBaseForSource(source) }))
  }

  const manifest = JSON.parse(await readFile(options.manifest, 'utf8'))
  if (!Array.isArray(manifest.photos)) {
    throw new Error('Manifest must contain a photos array')
  }
  manifest.photos.forEach(validateManifestPhoto)
  return manifest.photos.filter((photo) => photo.include !== false)
}

function assertNoOutputCollisions(jobs) {
  const seen = new Map()
  for (const job of jobs) {
    const normalized = job.base.replaceAll('\\', '/').toLowerCase()
    if (seen.has(normalized)) {
      throw new Error(`Output collision: ${job.source} and ${seen.get(normalized)} both use ${job.base}`)
    }
    seen.set(normalized, job.source)
  }
}

async function processPhoto(job, options) {
  const source = resolveInside(options.input, job.source, 'Photo source')
  const outputBase = resolveInside(options.output, job.base, 'Photo output base')
  const outputs = {
    avif: `${outputBase}.avif`,
    webp: `${outputBase}.webp`,
    jpg: `${outputBase}.jpg`,
  }
  const responsiveOutputs = Object.fromEntries(RESPONSIVE_WIDTHS.flatMap((width) => [
    [`avif-${width}`, `${outputBase}-${width}w.avif`],
    [`webp-${width}`, `${outputBase}-${width}w.webp`],
    [`jpg-${width}`, `${outputBase}-${width}w.jpg`],
  ]))

  if (!SUPPORTED_EXTENSIONS.has(path.extname(source).toLowerCase())) {
    throw new Error(`Unsupported image type: ${job.source}`)
  }
  if (!await exists(source)) {
    throw new Error(`Source photo not found: ${job.source}`)
  }

  const outputExists = await Promise.all([...Object.values(outputs), ...Object.values(responsiveOutputs)].map(exists))
  if (!options.force && outputExists.every(Boolean)) {
    return { status: 'skipped', source: job.source, base: job.base }
  }
  if (!options.force && outputExists.some(Boolean)) {
    throw new Error(`Only some variants exist for ${job.base}; inspect them or rerun with --force`)
  }
  if (options.dryRun) {
    return { status: 'planned', source: job.source, base: job.base }
  }

  await mkdir(path.dirname(outputBase), { recursive: true })
  const pipeline = sharp(source, { failOn: 'warning' })
    .rotate()
    .resize({
      width: options.maxWidth,
      fit: 'inside',
      withoutEnlargement: true,
    })

  await pipeline.clone().avif({ quality: 55, effort: 5 }).toFile(outputs.avif)
  await pipeline.clone().webp({ quality: 78, effort: 5, smartSubsample: true }).toFile(outputs.webp)
  await pipeline.clone().jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(outputs.jpg)

  for (const width of RESPONSIVE_WIDTHS.filter((candidate) => candidate < options.maxWidth)) {
    const responsive = pipeline.clone().resize({ width, fit: 'inside', withoutEnlargement: true })
    await responsive.clone().avif({ quality: 52, effort: 5 }).toFile(responsiveOutputs[`avif-${width}`])
    await responsive.clone().webp({ quality: 76, effort: 5, smartSubsample: true }).toFile(responsiveOutputs[`webp-${width}`])
    await responsive.clone().jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(responsiveOutputs[`jpg-${width}`])
  }

  return { status: 'created', source: job.source, base: job.base }
}

async function main() {
  const options = parseArguments(process.argv.slice(2))
  if (options.help) {
    printHelp()
    return
  }

  const jobs = await loadJobs(options)
  assertNoOutputCollisions(jobs)
  if (jobs.length === 0) {
    console.log('No photos matched.')
    return
  }

  const counts = { created: 0, planned: 0, skipped: 0 }
  for (const job of jobs) {
    const result = await processPhoto(job, options)
    counts[result.status] += 1
    console.log(`${result.status.padEnd(7)} ${result.source} -> ${result.base}`)
  }

  console.log(`Finished: ${counts.created} created, ${counts.planned} planned, ${counts.skipped} skipped.`)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
