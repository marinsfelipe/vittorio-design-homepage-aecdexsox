import { useState, useEffect, useCallback } from 'react'
import { ZoomIn, X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn, optimizeImage } from '@/lib/utils'

type Family = 'Balcões' | 'Vitrines' | 'Expositores'
type Line = 'Strongest' | 'Speciale' | 'Aprezzo' | 'Fredda'

type GalleryItem = {
  id: string
  image: string
  productName: string
  family: Family
  line: Line
  clientName?: string
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    image: 'https://img.usecurling.com/p/1200/800?q=luxury%20bakery%20interior&color=black&seed=1',
    productName: 'Vitrine Torre Quente',
    family: 'Vitrines',
    line: 'Speciale',
    clientName: 'Padaria Bella Vista',
  },
  {
    id: '2',
    image: 'https://img.usecurling.com/p/1200/800?q=luxury%20butcher%20shop&color=black&seed=2',
    productName: 'Balcão Frigorífico',
    family: 'Balcões',
    line: 'Strongest',
    clientName: 'Boutique de Carnes Prime',
  },
  {
    id: '3',
    image: 'https://img.usecurling.com/p/1200/800?q=gourmet%20supermarket&color=black&seed=3',
    productName: 'Expositor Vertical Aberto',
    family: 'Expositores',
    line: 'Aprezzo',
    clientName: 'Mercado Super Fresh',
  },
  {
    id: '4',
    image: 'https://img.usecurling.com/p/1200/800?q=italian%20gelateria&color=black&seed=4',
    productName: 'Vitrine de Gelato',
    family: 'Vitrines',
    line: 'Fredda',
    clientName: 'Gelateria Dolce Vita',
  },
  {
    id: '5',
    image: 'https://img.usecurling.com/p/1200/800?q=minimalist%20pastry%20shop&color=black&seed=5',
    productName: 'Balcão de Atendimento Neutro',
    family: 'Balcões',
    line: 'Speciale',
    clientName: 'Confeitaria Paris',
  },
  {
    id: '6',
    image: 'https://img.usecurling.com/p/1200/800?q=modern%20wine%20cellar&color=black&seed=6',
    productName: 'Expositor de Vinhos',
    family: 'Expositores',
    line: 'Speciale',
  },
  {
    id: '7',
    image: 'https://img.usecurling.com/p/1200/800?q=fine%20deli%20interior&color=black&seed=7',
    productName: 'Vitrine Refrigerada Curva',
    family: 'Vitrines',
    line: 'Aprezzo',
    clientName: 'Empório Delicatessen',
  },
  {
    id: '8',
    image: 'https://img.usecurling.com/p/1200/800?q=industrial%20coffee%20shop&color=black&seed=8',
    productName: 'Balcão Caixa',
    family: 'Balcões',
    line: 'Aprezzo',
    clientName: 'Café Central',
  },
]

export default function Galeria() {
  const [activeFamily, setActiveFamily] = useState<string>('Todos')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const families = ['Todos', 'Balcões', 'Vitrines', 'Expositores']

  const filteredItems = galleryItems.filter(
    (item) => activeFamily === 'Todos' || item.family === activeFamily,
  )

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
    }
  }, [lightboxIndex, filteredItems.length])

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length)
    }
  }, [lightboxIndex, filteredItems.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, closeLightbox, nextImage, prevImage])

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [lightboxIndex])

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <SEO
        title="Galeria | Vittorio Design"
        description="Explore nossos produtos em ambientes reais. Inspire-se com projetos realizados utilizando nossas vitrines, balcões e expositores."
      />
      <div className="container">
        <div className="mb-12 max-w-2xl opacity-0 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Ambientes Reais</h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light">
            Inspire-se com as soluções Vittorio Design aplicadas em projetos e estabelecimentos
            reais. A harmonia perfeita entre forma, função e exclusividade.
          </p>
        </div>

        <div
          className="flex flex-wrap gap-3 mb-10 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          {families.map((fam) => (
            <Button
              key={fam}
              variant={activeFamily === fam ? 'default' : 'outline'}
              onClick={() => setActiveFamily(fam)}
              className={cn(
                'rounded-none uppercase tracking-widest text-xs px-6 py-5 transition-all duration-300',
                activeFamily === fam
                  ? 'bg-primary text-primary-foreground border-transparent'
                  : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40',
              )}
            >
              {fam}
            </Button>
          ))}
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group cursor-pointer relative overflow-hidden bg-card border border-white/5 flex flex-col"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted/20 relative">
                <img
                  src={optimizeImage(item.image)}
                  alt={item.productName}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                  <Badge
                    variant="outline"
                    className="bg-black/80 text-primary border-primary/50 uppercase tracking-widest text-[10px] rounded-none px-3 py-1 backdrop-blur-md"
                  >
                    Linha {item.line}
                  </Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-serif text-white mb-2 group-hover:text-primary transition-colors">
                  {item.productName}
                </h3>
                {item.clientName && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-light mt-auto">
                    <MapPin className="w-3 h-3 text-primary/70 shrink-0" />
                    <span className="line-clamp-1">{item.clientName}</span>
                  </p>
                )}
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              Nenhum projeto encontrado para esta categoria.
            </div>
          )}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-300">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/50 hover:text-white z-20 transition-colors bg-black/20 p-2 rounded-full backdrop-blur-md"
            aria-label="Fechar"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-2 md:left-8 text-white/50 hover:text-white z-20 transition-colors bg-black/20 p-2 md:p-3 rounded-full backdrop-blur-md"
            aria-label="Imagem Anterior"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-2 md:right-8 text-white/50 hover:text-white z-20 transition-colors bg-black/20 p-2 md:p-3 rounded-full backdrop-blur-md"
            aria-label="Próxima Imagem"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <div
            className="w-full h-full max-w-7xl max-h-screen px-4 py-16 md:p-24 flex flex-col justify-center"
            onClick={closeLightbox}
          >
            <div
              className="relative flex-1 min-h-0 flex flex-col items-center justify-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-full max-w-full flex-shrink overflow-hidden shadow-2xl">
                <img
                  src={optimizeImage(filteredItems[lightboxIndex].image)}
                  alt={filteredItems[lightboxIndex].productName}
                  loading="lazy"
                  className="max-h-[70vh] object-contain mx-auto"
                />
              </div>

              <div className="text-center text-white shrink-0 max-w-2xl px-4">
                <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/50 uppercase tracking-widest text-[10px] rounded-none px-3 py-1"
                  >
                    Linha {filteredItems[lightboxIndex].line}
                  </Badge>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    {filteredItems[lightboxIndex].family}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif mb-2">
                  {filteredItems[lightboxIndex].productName}
                </h2>
                {filteredItems[lightboxIndex].clientName && (
                  <p className="text-base text-muted-foreground font-light flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {filteredItems[lightboxIndex].clientName}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
