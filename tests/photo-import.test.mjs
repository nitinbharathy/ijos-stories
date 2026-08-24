import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import { importedPhotoMetadata } from '../src/importedPhotoMetadata.js'

const manifest = JSON.parse(await readFile(new URL('../scripts/photo-import-manifest.json', import.meta.url), 'utf8'))
const imageRoot = path.resolve(new URL('../src/assets/images', import.meta.url).pathname)

test('maps every incoming photograph to one unique output base', () => {
  assert.equal(manifest.photoCount, 480)
  assert.equal(manifest.photos.length, 480)
  assert.equal(new Set(manifest.photos.map((photo) => photo.source)).size, 480)
  assert.equal(new Set(manifest.photos.map((photo) => photo.base)).size, 480)
})

test('keeps the reviewed collection counts', () => {
  assert.equal(importedPhotoMetadata.hero.length, 3)
  assert.equal(importedPhotoMetadata.galleries.weddingDay.length, 49)
  assert.equal(importedPhotoMetadata.galleries.preWedding.length, 17)
  assert.equal(importedPhotoMetadata.galleries.proposal.length, 2)
  assert.equal(importedPhotoMetadata.stories.ameliaBrandon.length, 85)
  assert.equal(importedPhotoMetadata.stories.pawanJaspreet.length, 268)
  assert.equal(importedPhotoMetadata.stories.joelleWilson.length, 55)
})

test('provides accessible metadata for every imported photograph', () => {
  const entries = [
    ...importedPhotoMetadata.hero,
    ...importedPhotoMetadata.galleries.weddingDay,
    ...importedPhotoMetadata.galleries.preWedding,
    ...importedPhotoMetadata.galleries.proposal,
    importedPhotoMetadata.people.photographer,
    ...importedPhotoMetadata.stories.ameliaBrandon,
    ...importedPhotoMetadata.stories.pawanJaspreet,
    ...importedPhotoMetadata.stories.joelleWilson,
  ]

  entries.forEach((entry) => {
    assert.doesNotMatch(entry.base, /(^|\/)imported(\/|$)/, `${entry.base} should use a clean role-based path`)
    assert.ok(entry.alt.trim(), `${entry.base} needs alt text`)
    assert.match(entry.orientation, /^(landscape|portrait|square)$/)
  })
})

test('generates AVIF, WebP and JPEG variants for every mapped photograph', async () => {
  for (const photo of manifest.photos) {
    for (const extension of ['avif', 'webp', 'jpg']) {
      const variant = path.join(imageRoot, `${photo.base}.${extension}`)
      assert.ok((await stat(variant)).size > 0, `${variant} is missing or empty`)
    }
  }
})
