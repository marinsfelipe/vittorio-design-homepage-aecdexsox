import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn, optimizeImage } from '@/lib/utils'

export interface ProductImage {
  id: string
  imagem_url: string
  tipo_imagem: string
  ordem: number
}

interface ProductGalleryProps {
  nome: string
  imagemPrincipal?: string
  imagens: ProductImage[]
}

export function ProductGallery({ nome, imagemPrincipal, imagens }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null)

  const sortedImages = [...(imagens || [])].sort((a, b) => a.ordem - b.ordem)
  const defaultImage = sortedImages.length > 0 ? sortedImages[0].imagem_url : imagemPrincipal
  const currentImage = activeImage || defaultImage || ''

  const fallbackCurling = `https://img.usecurling.com/p/1200/1600?q=${encodeURIComponent(nome || 'produto')}&color=black`

  useEffect(() => {
    if (!activeImage && defaultImage) {
      setActiveImage(defaultImage)
    }
  }, [defaultImage, activeImage])

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (e.currentTarget.src !== fallbackCurling) {
      e.currentTarget.src = fallbackCurling
    }
  }

  const activeImageType =
    sortedImages.find((img) => img.imagem_url === currentImage)?.tipo_imagem || 'principal'

  return (
    <div className="sticky top-32 space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted/20 border border-white/5 p-4 lg:p-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent z-10"></div>
        <img
          src={optimizeImage(currentImage)}
          alt={nome}
          loading="lazy"
          onError={handleImageError}
          className="w-full h-full object-cover object-center shadow-2xl relative z-0 transition-opacity duration-300 animate-fade-in"
          key={currentImage}
        />
        <Badge className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white border-white/20 uppercase tracking-widest text-[10px]">
          {activeImageType}
        </Badge>
      </div>

      {sortedImages.length > 1 && (
        <Carousel opts={{ align: 'start' }} className="w-full">
          <CarouselContent className="-ml-2">
            {sortedImages.map((img) => (
              <CarouselItem key={img.id || img.imagem_url} className="pl-2 basis-1/3 sm:basis-1/4">
                <button
                  onClick={() => setActiveImage(img.imagem_url)}
                  className={cn(
                    'relative aspect-square w-full overflow-hidden border transition-all duration-300',
                    currentImage === img.imagem_url
                      ? 'border-primary'
                      : 'border-white/10 hover:border-white/30',
                  )}
                >
                  <img
                    src={optimizeImage(img.imagem_url)}
                    alt={`${nome} - ${img.tipo_imagem}`}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 backdrop-blur-sm">
                    <span className="text-[9px] text-white uppercase tracking-wider block text-center truncate">
                      {img.tipo_imagem}
                    </span>
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-black/50 border-white/20 hover:bg-black/80 text-white w-8 h-8" />
          <CarouselNext className="right-2 bg-black/50 border-white/20 hover:bg-black/80 text-white w-8 h-8" />
        </Carousel>
      )}
    </div>
  )
}
