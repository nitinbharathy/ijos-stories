import assert from 'node:assert/strict'
import test from 'node:test'
import { resolveImagePresentation } from '../src/imagePresentation.js'

test('treats a missing catalogue image as a local unavailable state', () => {
  assert.deepEqual(resolveImagePresentation(undefined, null), {
    available: false,
    alt: '',
    fallback: null,
    focus: { desktop: '50% 50%', mobile: '50% 50%' },
  })
})

test('uses a real JPEG fallback when modern variants fail to load', () => {
  const presentation = resolveImagePresentation(
    { alt: 'A wedding moment', focus: { desktop: '40% 30%', mobile: '50% 20%' } },
    { avif: '/photo.avif', webp: '/photo.webp', jpg: '/photo.jpg' },
  )

  assert.equal(presentation.available, true)
  assert.equal(presentation.fallback, '/photo.jpg')
  assert.equal(presentation.alt, 'A wedding moment')
  assert.deepEqual(presentation.focus, { desktop: '40% 30%', mobile: '50% 20%' })
})
