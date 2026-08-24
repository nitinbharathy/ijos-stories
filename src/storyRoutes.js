export const STORY_SLUGS = {
  pawanAndJaspreet: 'sikh-wedding-portrait-story-singapore',
  victoriaAndSean: 'victoria-sean-catholic-wedding-singapore',
  ameliaAndBrandon: 'amelia-brandon-church-wedding-singapore',
  joelleAndWilson: 'joelle-wilson-wedding-singapore',
  preWeddingPortrait: 'singapore-pre-wedding-portrait-story',
  gardenProposal: 'garden-proposal-fairy-lights-singapore',
}

export const storyPaths = Object.values(STORY_SLUGS).map((slug) => `/stories/${slug}`)
