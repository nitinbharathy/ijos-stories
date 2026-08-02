import { mkdir, readFile, writeFile } from 'node:fs/promises'

const configuredUrl = process.env.SITE_URL || process.env.CF_PAGES_URL || 'http://localhost:5173'

let siteOrigin

try {
  const url = new URL(configuredUrl)

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('the URL must use HTTP or HTTPS')
  }

  siteOrigin = url.origin
} catch (error) {
  throw new Error(`Invalid SITE_URL or CF_PAGES_URL value "${configuredUrl}": ${error.message}`)
}

const projectRoot = new URL('../', import.meta.url)
const outputDirectory = new URL('dist/client/', projectRoot)
const robotsSource = await readFile(new URL('public/robots.txt', projectRoot), 'utf8')
const sitemapUrl = `${siteOrigin}/sitemap.xml`
const pageUrl = `${siteOrigin}/`

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(pageUrl)}</loc>
  </url>
</urlset>
`

const robots = `${robotsSource.trim()}\n\nSitemap: ${sitemapUrl}\n`

await mkdir(outputDirectory, { recursive: true })
await Promise.all([
  writeFile(new URL('sitemap.xml', outputDirectory), sitemap),
  writeFile(new URL('robots.txt', outputDirectory), robots),
])

console.log(`Generated robots.txt and sitemap.xml for ${siteOrigin}`)
