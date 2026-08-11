export const STORY_SLUGS = {
  pawanAndJaspreet: 'sikh-wedding-portrait-story-singapore',
  preWeddingPortrait: 'singapore-pre-wedding-portrait-story',
  gardenProposal: 'garden-proposal-fairy-lights-singapore',
}

export const storyPaths = Object.values(STORY_SLUGS).map((slug) => `/stories/${slug}`)
