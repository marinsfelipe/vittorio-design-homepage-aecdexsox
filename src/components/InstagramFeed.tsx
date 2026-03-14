import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Instagram } from 'lucide-react'

interface InstagramPost {
  id: string
  media_url: string
  thumbnail_url?: string
  permalink: string
  media_type?: string
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchInstagramFeed() {
      try {
        const { data, error: functionError } = await supabase.functions.invoke('instagram-feed')

        if (functionError) throw new Error(functionError.message)
        if (data?.data) {
          setPosts(data.data.slice(0, 8))
        } else {
          throw new Error('Invalid data format')
        }
      } catch (err) {
        console.error('Failed to fetch Instagram feed:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchInstagramFeed()
  }, [])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-up">
        <p className="text-muted-foreground mb-6 font-light">
          Não foi possível carregar o feed do Instagram no momento.
        </p>
        <Button
          asChild
          variant="outline"
          className="gap-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground rounded-none px-6 py-6 uppercase tracking-widest text-xs"
        >
          <a
            href="https://instagram.com/VittorioDesignOficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-4 w-4" />
            Ver perfil no Instagram
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-4">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-none bg-white/5" />
          ))
        : posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden block bg-muted animate-fade-in"
            >
              <img
                src={
                  post.media_type === 'VIDEO' && post.thumbnail_url
                    ? post.thumbnail_url
                    : post.media_url
                }
                alt="Instagram post"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500 flex items-center justify-center">
                <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 h-8 w-8" />
              </div>
            </a>
          ))}
    </div>
  )
}
