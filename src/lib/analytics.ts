declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

export const initGA = () => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We handle page views manually with React Router
  })
}

export const trackPageView = (url: string) => {
  if (!window.gtag || !GA_MEASUREMENT_ID) return
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (!window.gtag) return
  window.gtag('event', eventName, params)
}
