import { mkdir, readFile, writeFile } from 'node:fs/promises'

const configuredUrl = process.env.SITE_URL || process.env.CF_PAGES_URL || 'http://localhost:5173'

let siteOrigin

try {
  const url = new URL(configuredUrl)

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('the URL must use HTTP or HTTPS')
  }

  siteOrigin = url.href.replace(/\/$/, '')
} catch (error) {
  throw new Error(`Invalid SITE_URL or CF_PAGES_URL value "${configuredUrl}": ${error.message}`)
}

const projectRoot = new URL('../', import.meta.url)
const outputDirectory = new URL('dist/client/', projectRoot)
const robotsSource = await readFile(new URL('public/robots.txt', projectRoot), 'utf8')
const sitemapUrl = `${siteOrigin}/sitemap.xml`
const pagePaths = [
  '/',
  '/wedding-day',
  '/pre-wedding',
  '/proposal',
  '/stories',
  '/stories/sikh-wedding-portrait-story-singapore',
  '/stories/singapore-pre-wedding-portrait-story',
  '/stories/garden-proposal-fairy-lights-singapore',
]

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;')

const sitemapEntries = pagePaths
  .map((path) => `  <url>\n    <loc>${escapeXml(`${siteOrigin}${path}`)}</loc>\n  </url>`)
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>
`

const robots = `${robotsSource.trim()}\n\nSitemap: ${sitemapUrl}\n`

await mkdir(outputDirectory, { recursive: true })
await Promise.all([
  writeFile(new URL('sitemap.xml', outputDirectory), sitemap),
  writeFile(new URL('robots.txt', outputDirectory), robots),
])

console.log(`Generated robots.txt and sitemap.xml for ${siteOrigin}`)
