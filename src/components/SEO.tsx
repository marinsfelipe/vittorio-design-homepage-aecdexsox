import { useEffect } from 'react'

interface SEOProps {
  title: string
  description?: string
  image?: string
  url?: string
  structuredData?: object
}

export function SEO({ title, description, image, url, structuredData }: SEOProps) {
  useEffect(() => {
    document.title = title

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
    setMetaTag('property', 'og:type', 'website')

    if (image) {
      setMetaTag('property', 'og:image', image)
      setMetaTag('name', 'twitter:image', image)
      setMetaTag('name', 'twitter:card', 'summary_large_image')
    }

    setMetaTag('property', 'og:url', url || window.location.href)

    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]')
      if (!script) {
        script = document.createElement('script')
        script.setAttribute('type', 'application/ld+json')
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(structuredData)
    } else {
      const script = document.querySelector('script[type="application/ld+json"]')
      if (script) script.remove()
    }
  }, [title, description, image, url, structuredData])

  return null
}
