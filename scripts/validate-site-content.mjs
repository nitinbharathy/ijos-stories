import { createServer } from 'vite'

const vite = await createServer({
  appType: 'custom',
  logLevel: 'silent',
  server: { middlewareMode: true, hmr: false },
})

const issues = []
const checkedBases = new Set()

function issue(message) {
  issues.push(message)
}

try {
  const [{ images, getImageSources }, { services }, { stories }] = await Promise.all([
    vite.ssrLoadModule('/src/imageCatalog.js'),
    vite.ssrLoadModule('/src/serviceData.js'),
    vite.ssrLoadModule('/src/storyData.js'),
  ])

  function checkImage(image, label) {
    if (!image?.base) {
      issue(`${label} does not reference a catalogue image`)
      return
    }
    if (checkedBases.has(image.base)) return
    checkedBases.add(image.base)

    const sources = getImageSources(image.base)
    if (!sources) issue(`${label} references missing image variants for "${image.base}"`)
    else if (!sources.jpg) issue(`${label} needs a JPEG fallback for "${image.base}"`)
  }

  function walkCatalogue(value, label) {
    if (Array.isArray(value)) {
      value.forEach((item, index) => walkCatalogue(item, `${label}[${index}]`))
      return
    }
    if (!value || typeof value !== 'object') return
    if ('base' in value) {
      checkImage(value, label)
      return
    }
    Object.entries(value).forEach(([key, item]) => walkCatalogue(item, `${label}.${key}`))
  }

  walkCatalogue(images, 'images')

  services.forEach((service) => {
    checkImage(service.heroImage, `Service "${service.slug}" hero`)
    if (!Array.isArray(service.gallery) || !service.gallery.length) {
      issue(`Service "${service.slug}" needs at least one gallery image`)
    }
  })

  stories.forEach((story) => {
    checkImage(story.heroImage, `Story "${story.slug}" hero`)
    story.heroImages?.forEach((image, index) => checkImage(image, `Story "${story.slug}" hero ${index + 1}`))
    story.blocks?.forEach((block, index) => {
      if (['imageText', 'fullImage'].includes(block.type)) {
        checkImage(block.image, `Story "${story.slug}" block ${index + 1}`)
      }
      if (block.type === 'gallery' && (!Array.isArray(block.images) || !block.images.length)) {
        issue(`Story "${story.slug}" gallery block ${index + 1} needs at least one image`)
      }
    })
  })

  if (issues.length) {
    throw new Error(`Site content validation failed:\n- ${issues.join('\n- ')}`)
  }

  console.log(`Validated ${checkedBases.size} catalogue images across ${services.length} services and ${stories.length} stories.`)
} finally {
  await vite.close()
}
