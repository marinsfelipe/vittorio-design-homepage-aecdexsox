import { useEffect } from 'react'

interface SEOProps {
  title: string
  description?: string
  image?: string
  url?: string
}

export function SEO({ title, description, image, url }: SEOProps) {
  useEffect(() => {
    // Update the document title
    document.title = title

    // Helper to safely update or create meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attrName, attrValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    if (description) {
      setMetaTag('name', 'description', description)
      setMetaTag('property', 'og:description', description)
    }

    setMetaTag('property', 'og:title', title)

    if (image) {
      setMetaTag('property', 'og:image', image)
    }

    setMetaTag('property', 'og:url', url || window.location.href)
  }, [title, description, image, url])

  return null
}
