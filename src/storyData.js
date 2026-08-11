import { gardenProposalStory } from './stories/gardenProposal'
import { pawanAndJaspreetStory } from './stories/pawanAndJaspreet'
import { preWeddingPortraitStory } from './stories/preWeddingPortrait'

const supportedBlockTypes = new Set(['introduction', 'imageText', 'text', 'fullImage', 'quote', 'gallery'])
const requiredStoryFields = ['slug', 'category', 'location', 'title', 'excerpt', 'metaTitle', 'metaDescription', 'heroImage']

export const stories = [
  pawanAndJaspreetStory,
  preWeddingPortraitStory,
  gardenProposalStory,
]

function validateStory(story) {
  requiredStoryFields.forEach((field) => {
    if (!story[field]) throw new Error(`Story "${story.slug || story.title || 'untitled'}" is missing required field "${field}"`)
  })

  if (story.blocks !== undefined && !Array.isArray(story.blocks)) {
    throw new Error(`Story "${story.slug}" must use an array for "blocks"`)
  }

  story.blocks?.forEach((block, index) => {
    if (!supportedBlockTypes.has(block.type)) {
      throw new Error(`Story "${story.slug}" has unsupported block type "${block.type}" at position ${index + 1}`)
    }
    if (['introduction', 'text'].includes(block.type) && !block.paragraphs?.length) {
      throw new Error(`Story "${story.slug}" needs paragraphs in its ${block.type} block at position ${index + 1}`)
    }
    if (block.type === 'imageText' && (!block.image || !block.paragraphs?.length)) {
      throw new Error(`Story "${story.slug}" needs an image and paragraphs in its imageText block at position ${index + 1}`)
    }
    if (block.type === 'fullImage' && !block.image) {
      throw new Error(`Story "${story.slug}" needs an image in its fullImage block at position ${index + 1}`)
    }
    if (block.type === 'quote' && !block.quote) {
      throw new Error(`Story "${story.slug}" needs quote text in its quote block at position ${index + 1}`)
    }
    if (block.type === 'gallery' && !block.images?.length) {
      throw new Error(`Story "${story.slug}" needs images in its gallery block at position ${index + 1}`)
    }
  })
}

stories.forEach(validateStory)

export function getStory(slug) {
  return stories.find((story) => story.slug === slug)
}

export function getStoryStructuredData(story, origin) {
  const pageUrl = `${origin}/stories/${story.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#story`,
    url: pageUrl,
    headline: story.title,
    description: story.metaDescription,
    author: { '@type': 'Person', name: 'Madhu' },
    publisher: { '@type': 'Organization', name: 'ijós Stories' },
    about: { '@type': 'Service', name: `${story.category} photography in Singapore` },
  }
}
