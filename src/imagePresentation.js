export function resolveImagePresentation(image, sources) {
  const fallback = sources?.jpg || sources?.webp || sources?.avif || null
  const focus = image?.focus || { desktop: '50% 50%', mobile: '50% 50%' }

  return {
    available: Boolean(image && fallback),
    alt: image?.alt || '',
    fallback,
    focus: {
      desktop: focus.desktop || '50% 50%',
      mobile: focus.mobile || focus.desktop || '50% 50%',
    },
  }
}
