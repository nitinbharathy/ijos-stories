const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

export const sitePath = (path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${basePath}${normalizedPath}` || '/'
}

export const currentSitePath = () => {
  const pathname = window.location.pathname
  const withoutBase = basePath && pathname.startsWith(basePath)
    ? pathname.slice(basePath.length)
    : pathname

  return withoutBase.replace(/^\/+|\/+$/g, '')
}
