import { useState, useEffect } from 'react'
import { Camera, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
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
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const processedImages =
    Array.isArray(imagens) && imagens.length > 0
      ? [...imagens].sort((a, b) => a.ordem - b.ordem)
      : imagemPrincipal
        ? [{ id: 'main', imagem_url: imagemPrincipal, tipo_imagem: 'principal', ordem: 1 }]
        : []

  useEffect(() => {
    setActiveIndex(0)
  }, [nome])

  if (processedImages.length === 0) {
    return (
      <div className="sticky top-32 w-full aspect-[4/5] bg-muted/10 flex flex-col items-center justify-center border border-dashed border-white/20 p-8 text-center rounded-sm">
        <Camera className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
        <p className="text-sm text-muted-foreground">
          Nenhuma imagem disponível para este produto.
        </p>
      </div>
    )
  }

  const currentImg = processedImages[activeIndex] || processedImages[0]
  const fallbackCurling = `https://img.usecurling.com/p/1200/1600?q=${encodeURIComponent(nome || 'produto')}&color=black`

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (e.currentTarget.src !== fallbackCurling) {
      e.currentTarget.src = fallbackCurling
    }
  }

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setActiveIndex((prev) => (prev + 1) % processedImages.length)
  }

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setActiveIndex((prev) => (prev - 1 + processedImages.length) % processedImages.length)
  }

  return (
    <div className="sticky top-32 space-y-4">
      <div
        className="relative aspect-[4/5] overflow-hidden bg-muted/20 border border-white/5 p-4 lg:p-8 group cursor-zoom-in"
        onClick={() => setIsLightboxOpen(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent z-10 pointer-events-none"></div>
        <img
          key={currentImg.imagem_url}
          src={optimizeImage(currentImg.imagem_url)}
          alt={`${nome} - ${currentImg.tipo_imagem}`}
          onError={handleImageError}
          className="w-full h-full object-cover object-center shadow-2xl relative z-0 transition-opacity duration-300 animate-fade-in"
        />
        <Badge className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white border-white/20 uppercase tracking-widest text-[10px]">
          {currentImg.tipo_imagem}
        </Badge>

        {processedImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 right-4 z-20 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm border border-white/20">
          <Maximize2 className="w-4 h-4 text-white" />
        </div>
      </div>

      {processedImages.length > 1 && (
        <Carousel opts={{ align: 'start' }} className="w-full">
          <CarouselContent className="-ml-2">
            {processedImages.map((img, idx) => (
              <CarouselItem key={img.id || idx} className="pl-2 basis-1/3 sm:basis-1/4">
                <button
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    'relative aspect-square w-full overflow-hidden border transition-all duration-300',
                    activeIndex === idx
                      ? 'border-primary ring-1 ring-primary ring-offset-1 ring-offset-background'
                      : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100',
                  )}
                >
                  <img
                    src={optimizeImage(img.imagem_url)}
                    alt={`${nome} thumbnail ${idx + 1}`}
                    onError={handleImageError}
                    loading="lazy"
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

      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] h-[90vh] p-0 bg-black/95 border-white/10 shadow-2xl flex flex-col items-center justify-center [&>button]:text-white [&>button]:bg-black/50 [&>button]:p-2 [&>button]:rounded-full [&>button]:hover:bg-black/80 [&>button]:border [&>button]:border-white/20 [&>button]:z-50 [&>button]:right-6 [&>button]:top-6">
          <DialogTitle className="sr-only">Visualização ampliada - {nome}</DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
            <img
              key={`lightbox-${currentImg.imagem_url}`}
              src={optimizeImage(currentImg.imagem_url)}
              alt={`${nome} - ampliado`}
              onError={handleImageError}
              className="max-w-full max-h-full object-contain animate-fade-in"
            />

            {processedImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-black/80 text-white p-3 md:p-4 rounded-full backdrop-blur-sm border border-white/20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 bg-black/50 hover:bg-black/80 text-white p-3 md:p-4 rounded-full backdrop-blur-sm border border-white/20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 text-white text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl">
              <span className="font-bold text-primary">
                {activeIndex + 1} / {processedImages.length}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30"></span>
              <span>{currentImg.tipo_imagem}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
