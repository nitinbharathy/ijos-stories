import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const inputRoot = path.resolve('incoming-photos')
const manifestPath = path.resolve('scripts/photo-import-manifest.json')
const metadataPath = path.resolve('src/importedPhotoMetadata.js')

const actualDayAlts = [
  'Newlyweds walking outdoors in Chinese wedding attire',
  'Bride laughing while holding a red fan during her wedding celebration',
  'Newlyweds walking between applauding guests after their ceremony',
  'Groom embracing the bride during an outdoor wedding portrait',
  'Newlyweds sharing tea beneath a Happy Wedding sign',
  'Bride walking through a warmly lit corridor with the groom behind her',
  'Newlyweds dancing together in front of their reception flowers',
  'Groom reading a note during wedding door games',
  'Amelia and Brandon smiling at each other during their church ceremony',
  'Bride and groom holding hands during their wedding ceremony',
  'Newlyweds posing with their wedding party on garden steps',
  'Newlyweds celebrating as friends gather around them outdoors',
  'Sikh groom kissing the bride on the forehead',
  'Sikh bride twirling in her embroidered red wedding dress',
  'Sikh newlyweds seated beneath a large tree by the water',
  'Victoria and Sean standing outside the Church of St Teresa',
  'Bride smiling as she displays the mehndi on both hands',
  'Bride laughing during her joyful haldi ceremony',
  'Bride kissing the groom on the cheek during their Sangeet celebration',
  'Wedding stationery arranged on a reception table',
  'Mother helping a bride prepare before the wedding ceremony',
  'Close view of hands signing a wedding certificate',
  'Sikh newlyweds walking through a bright white colonnade',
  'Close detail of a couple holding hands in wedding attire',
  'Sikh newlyweds facing each other beneath white arches',
  'Bride embracing a family member after her wedding ceremony',
  'Bride approaching the seated groom during their reception',
  'Black-and-white portrait of a bride looking through a car window',
  'Champagne being poured into a tower of glasses at a wedding reception',
  'Sikh newlyweds touching foreheads in an intimate portrait',
  'Sikh newlyweds holding hands on stone steps',
  'Bride smiling during her wedding reception',
  'Sikh bride twirling beneath a white colonnade',
  'Sikh newlyweds sharing a quiet portrait in the evening sun',
  'Sikh bride photographed alone in her red wedding dress at dusk',
  'Sikh newlyweds standing together in a shadowed garden',
  'Backlit portrait of a Sikh bride and groom outdoors',
  'Bride laughing as family apply haldi during her ceremony',
  'Victoria and Sean’s wedding stationery with floral details',
  'Sean gently touching Victoria’s veil before their ceremony',
  'Victoria and Sean kissing in the aisle of the Church of St Teresa',
  'Black-and-white close portrait of Victoria and Sean behind her veil',
  'The aisle and altar inside the Church of St Teresa',
  'Victoria smiling at Sean through her wedding veil',
  'Victoria and Sean walking down the church aisle after their ceremony',
  'Victoria and Sean meeting on a grand staircase',
  'Black-and-white view of Victoria and Sean entering their reception',
  'Victoria and Sean entering their reception with their parents',
  'Victoria laughing with guests during her wedding reception',
]

const preWeddingAlts = [
  'Couple raising their joined hands during a playful portrait session',
  'Close view of a couple holding hands with an engagement ring visible',
  'Couple walking together in formal shoes during a portrait session',
  'Couple moving together through a bright city colonnade',
  'Bride posing with a bouquet beside a stone column',
  'Couple sharing a playful moment at a bar',
  'Couple sharing a quiet outdoor portrait surrounded by greenery',
  'Close portrait of a couple kissing in soft natural light',
  'Newlyweds posing together on garden steps',
  'Black-and-white motion portrait of a couple embracing',
  'Intimate black-and-white silhouette of a couple about to kiss',
  'Couple posing together against a stone wall',
  'Couple exchanging a playful look during their portrait session',
  'Couple walking together through a bright colonnade',
  'Couple raising their drinks during a warm bar portrait',
  'Couple kissing inside a warmly lit elevator',
  'Couple walking together through a sunlit garden',
]

const proposalAlts = [
  'Couple embracing immediately after a garden proposal beneath warm lights',
  'Newly engaged couple holding hands with the engagement ring in view',
]

const headerAlts = [
  'Newlyweds in Chinese wedding attire surrounded by motion on a red bridge',
  'Joelle and Wilson holding hands as they enter their wedding reception',
  'Victoria and Sean holding hands during their Catholic wedding ceremony',
]

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

async function collectImages(directory, relative = '') {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries.sort((a, b) => naturalSort(a.name, b.name))) {
    if (entry.name === '.DS_Store') continue
    const absolute = path.join(directory, entry.name)
    const nextRelative = path.join(relative, entry.name)
    if (entry.isDirectory()) files.push(...await collectImages(absolute, nextRelative))
    else if (/\.(jpe?g)$/i.test(entry.name)) files.push(nextRelative.split(path.sep).join('/'))
  }

  return files
}

function sourceId(source) {
  return slugify(path.parse(source).name)
}

function ameliaAlt(source) {
  if (source.endsWith('BandPhoto-10.jpg')) return 'Musicians performing during Amelia and Brandon’s wedding ceremony'
  const number = Number(source.match(/\d+/)?.[0] || 0)
  if (number <= 6978) return 'Amelia getting ready with family before her wedding'
  if (number <= 7287) return 'Amelia and Brandon sharing a joyful first look before their ceremony'
  if (number <= 7575) return 'Amelia and Brandon celebrating a family wedding tradition'
  if (number <= 8590) return 'Amelia and Brandon during their church wedding ceremony'
  if (number <= 8737) return 'Amelia and Brandon photographed together in a tropical garden after their wedding'
  if (number <= 8826) return 'Amelia and Brandon celebrating outdoors with their wedding party'
  return 'Amelia and Brandon sharing a quiet outdoor portrait after their wedding'
}

function joelleBaseAlt(source) {
  const number = Number(source.match(/\d+/)?.[0] || 0)
  if (number <= 3157) return 'Joelle getting ready while Wilson and friends take part in wedding gatecrash games'
  if (number <= 3518) return 'Joelle and Wilson sharing family wedding traditions at home'
  if (number <= 3971) return 'Joelle and Wilson photographed together outdoors after their ceremony'
  if (number <= 4131) return 'Joelle preparing for her evening wedding reception'
  return 'Joelle and Wilson celebrating with family and friends at their wedding reception'
}

function joelleAlt(source) {
  const number = Number(source.match(/\d+/)?.[0] || 0)
  if (number <= 3157) return 'Joelle getting ready while Wilson and friends take part in wedding gatecrash games'
  if (number <= 3518) return 'Joelle and Wilson sharing family wedding traditions at home'
  if (number <= 3589) return 'Joelle and Wilson seeing each other for the first time on their wedding day'
  if (number <= 3721) return 'Joelle and Wilson taking part in a traditional wedding tea ceremony'
  if (number <= 3971) return 'Joelle and Wilson photographed together outdoors after their ceremony'
  if (number <= 4131) return 'Joelle preparing for her evening wedding reception'
  return 'Joelle and Wilson celebrating with family and friends at their wedding reception'
}

function pawanAlt(source) {
  if (source.includes('/01-maiyyan-mehendi/')) return 'Jaspreet celebrating her Maiyyan and Mehendi with family'
  if (source.includes('/02-sangeet/')) return 'Pawan and Jaspreet celebrating with family during their Sangeet'
  if (source.includes('/04-reception/')) return 'Pawan and Jaspreet celebrating at their Orchard Hotel wedding reception'

  const number = Number(source.match(/DSC(\d+)/)?.[1] || 0)
  if (number <= 4293) return 'Jaspreet preparing in her red bridal attire before the Sikh wedding ceremony'
  if (number <= 4666) return 'Pawan arriving with family for his Sikh wedding ceremony'
  if (number <= 5216) return 'Pawan and Jaspreet during their Sikh wedding ceremony'
  if (number <= 6440) return 'Pawan and Jaspreet photographed together at the National Gallery after their wedding'
  if (number <= 6777) return 'Pawan and Jaspreet celebrating family traditions after their Sikh wedding'
  return 'Pawan and Jaspreet sharing a post-wedding portrait at sunset in Singapore'
}

async function createEntry(source, destination, alt, roles, extra = {}) {
  const { baseLabel = alt, ...entryExtra } = extra
  const absolute = path.join(inputRoot, source)
  const metadata = await sharp(absolute).metadata()
  const swapsSides = [5, 6, 7, 8].includes(metadata.orientation)
  const width = swapsSides ? metadata.height : metadata.width
  const height = swapsSides ? metadata.width : metadata.height
  const orientation = width > height ? 'landscape' : width < height ? 'portrait' : 'square'
  const id = sourceId(source)
  const fullSemantic = slugify(baseLabel)
  const semantic = fullSemantic.length > 64
    ? fullSemantic.slice(0, 64).replace(/-[^-]*$/, '')
    : fullSemantic
  const base = `${destination}/${semantic}-${id}`

  return { source, base, alt, orientation, roles, id, ...entryExtra }
}

async function buildFixedGroup(folder, destination, alts, roles) {
  const sources = await collectImages(path.join(inputRoot, folder))
  if (sources.length !== alts.length) throw new Error(`${folder} has ${sources.length} images but ${alts.length} descriptions`)
  return Promise.all(sources.map((file, index) => createEntry(`${folder}/${file}`, destination, alts[index], roles)))
}

async function buildStoryGroup(folder, destination, altForSource, role, chapterMap = {}) {
  const files = await collectImages(path.join(inputRoot, folder))
  return Promise.all(files.map((file) => {
    const source = `${folder}/${file}`
    const sourceChapter = file.includes('/') ? file.split('/')[0] : undefined
    const chapterConfig = sourceChapter ? chapterMap[sourceChapter] : undefined
    const chapter = chapterConfig?.label || sourceChapter
    const chapterSlug = chapterConfig?.output || (chapter ? slugify(chapter) : null)
    const imageDestination = chapterSlug ? `${destination}/${chapterSlug}` : destination
    const description = altForSource(source)
    const alt = typeof description === 'string' ? description : description.alt
    const baseLabel = typeof description === 'string' ? description : description.baseLabel
    return createEntry(source, imageDestination, alt, [role, 'story-gallery'], {
      ...(chapter ? { chapter } : {}),
      ...(baseLabel ? { baseLabel } : {}),
    })
  }))
}

const [hero, weddingDay, preWedding, proposal, ameliaBrandon, pawanJaspreet, joelleWilson] = await Promise.all([
  buildFixedGroup('homepage/hero', 'hero', headerAlts, ['home-hero']),
  buildFixedGroup('services/wedding-day/gallery', 'galleries/wedding-day', actualDayAlts, ['wedding-day-carousel']),
  buildFixedGroup('services/pre-wedding/gallery', 'galleries/pre-wedding', preWeddingAlts, ['pre-wedding-carousel']),
  buildFixedGroup('services/proposal/gallery', 'galleries/proposal', proposalAlts, ['proposal-carousel']),
  buildStoryGroup('stories/amelia-and-brandon', 'stories/amelia-brandon', ameliaAlt, 'amelia-brandon-story'),
  buildStoryGroup('stories/pawan-and-jaspreet', 'stories/pawan-jaspreet', pawanAlt, 'pawan-jaspreet-story', {
    '01-maiyyan-mehendi': { label: 'Day 1', output: 'day-1' },
    '02-sangeet': { label: 'Day 2 Sangeeth', output: 'day-2-sangeeth' },
    '03-wedding-and-portraits': { label: 'Day 3 wedding and post wedding shoot', output: 'day-3-wedding-and-post-wedding-shoot' },
    '04-reception': { label: 'Day 4 reception', output: 'day-4-reception' },
  }),
  buildStoryGroup('stories/joelle-and-wilson', 'stories/joelle-wilson', (source) => ({
    alt: joelleAlt(source),
    baseLabel: joelleBaseAlt(source),
  }), 'joelle-wilson-story'),
])

const heroOrder = ['dsc4293', 'dsc3540m', 'victoriaandseancatholicweddingsg-63']
hero.sort((a, b) => heroOrder.indexOf(a.id) - heroOrder.indexOf(b.id))

const photographer = await createEntry(
  'homepage/about/2 madhu.JPG',
  'people',
  'Madhu, founder and lead photographer of ijós Stories, seated with a cup',
  ['about-photographer'],
)

const victoriaSean = [
  hero.find((entry) => entry.id === 'victoriaandseancatholicweddingsg-63'),
  ...weddingDay.filter((entry) => entry.id.startsWith('victoriaandseancatholicweddingsg') || entry.id.startsWith('2victoriaandseancatholicweddingsg')),
].filter(Boolean)

const groups = {
  hero,
  galleries: { weddingDay, preWedding, proposal },
  people: { photographer },
  stories: { ameliaBrandon, pawanJaspreet, joelleWilson, victoriaSean },
}

const clientEntry = ({ base, alt, orientation, id, chapter }) => ({
  base,
  alt,
  orientation,
  id,
  ...(chapter ? { chapter } : {}),
})
const clientGroups = {
  hero: hero.map(clientEntry),
  galleries: {
    weddingDay: weddingDay.map(clientEntry),
    preWedding: preWedding.map(clientEntry),
    proposal: proposal.map(clientEntry),
  },
  people: { photographer: clientEntry(photographer) },
  stories: {
    ameliaBrandon: ameliaBrandon.map(clientEntry),
    pawanJaspreet: pawanJaspreet.map(clientEntry),
    joelleWilson: joelleWilson.map(clientEntry),
    victoriaSean: victoriaSean.map(clientEntry),
  },
}

const allEntries = [hero, weddingDay, preWedding, proposal, [photographer], ameliaBrandon, pawanJaspreet, joelleWilson].flat(2)
const manifest = {
  generatedFrom: 'incoming-photos',
  photoCount: allEntries.length,
  photos: allEntries.map(({ source, base, roles }) => ({ source, base, include: true, roles })),
}

function serialize(value, indent = 0) {
  const padding = ' '.repeat(indent)
  if (Array.isArray(value)) {
    if (!value.length) return '[]'
    return `[\n${value.map((item) => `${' '.repeat(indent + 2)}${serialize(item, indent + 2)}`).join(',\n')}\n${padding}]`
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value)
    return `{\n${entries.map(([key, item]) => `${' '.repeat(indent + 2)}${JSON.stringify(key)}: ${serialize(item, indent + 2)}`).join(',\n')}\n${padding}}`
  }
  return JSON.stringify(value)
}

const metadataModule = `// Generated by scripts/create-photo-import-manifest.mjs.\n// Edit the generator or src/imageCatalog.js focal overrides, then regenerate.\n\nexport const importedPhotoMetadata = ${serialize(clientGroups)}\n`

await mkdir(path.dirname(manifestPath), { recursive: true })
await mkdir(path.dirname(metadataPath), { recursive: true })
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
await writeFile(metadataPath, metadataModule)
console.log(`Created manifest and metadata for ${allEntries.length} photographs.`)
