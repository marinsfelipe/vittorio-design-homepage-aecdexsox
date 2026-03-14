import { useState, useEffect } from 'react'

const cache = new Map<string, { data: any; timestamp: number }>()
// Cache duration: 10 minutes to avoid redundant fetches during session navigation
const CACHE_DURATION = 1000 * 60 * 10

export function useCachedSupabase<T>(
  key: string,
  fetcher: () => Promise<T>,
  dependencies: any[] = [],
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    async function load() {
      setLoading(true)
      setError(null)

      const cached = cache.get(key)
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        if (isMounted) {
          setData(cached.data)
          setLoading(false)
        }
        return
      }

      try {
        const result = await fetcher()
        if (isMounted) {
          cache.set(key, { data: result, timestamp: Date.now() })
          setData(result)
        }
      } catch (err: any) {
        if (isMounted) setError(err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, ...dependencies])

  return { data, loading, error }
}
