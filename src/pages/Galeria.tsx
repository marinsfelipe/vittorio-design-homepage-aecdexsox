import { useState, useEffect, useCallback, useMemo } from 'react'
import { ZoomIn, X, ChevronLeft, ChevronRight, Expand, Loader2 } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { cn, optimizeImage } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { useCachedSupabase } from '@/hooks/useCachedSupabase'

type GalleryItem = {
  id: string
  image: string
  productName: string
  code: string
  line: string
  family: string
  dimensions: string
}

const MOCK_GALLERY: GalleryItem[] = [
  {
    id: '1',
    image: 'https://img.usecurling.com/p/1200/800?q=luxury%20bakery&color=black',
    productName: 'Vitrine Torre Quente',
    code: 'VTQ-100',
    family: 'Vitrines',
    line: 'Speciale',
    dimensions: '100x60x120cm',
  },
  {
    id: '2',
    image: 'https://img.usecurling.com/p/1200/800?q=butcher%20shop&color=black',
    productName: 'Balcão Frigorífico',
    code: 'BF-200',
    family: 'Balcões',
    line: 'Strongest',
    dimensions: '200x80x110cm',
  },
  {
    id: '3',
    image: 'https://img.usecurling.com/p/1200/800?q=supermarket&color=black',
    productName: 'Expositor Vertical Aberto',
    code: 'EV-150',
    family: 'Expositores',
    line: 'Aprezzo',
    dimensions: '150x70x200cm',
  },
  {
    id: '4',
    image: 'https://img.usecurling.com/p/1200/800?q=industrial%20kitchen&color=black',
    productName: 'Fogão Industrial',
    code: 'FI-400',
    family: 'Fogões',
    line: 'Strongest',
    dimensions: '120x90x90cm',
  },
  {
    id: '5',
    image: 'https://img.usecurling.com/p/1200/800?q=gelateria&color=black',
    productName: 'Vitrine de Gelato',
    code: 'VG-120',
    family: 'Vitrines',
    line: 'Fredda',
    dimensions: '120x110x130cm',
  },
  {
    id: '6',
    image: 'https://img.usecurling.com/p/1200/800?q=wine%20cellar&color=black',
    productName: 'Expositor de Vinhos',
    code: 'EX-VIN',
    family: 'Expositores',
    line: 'Speciale',
    dimensions: '80x60x220cm',
  },
]

export default function Galeria() {
  const [activeFamily, setActiveFamily] = useState('Todos')
  const [activeLine, setActiveLine] = useState('Todas')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const { data: cachedItems, loading } = useCachedSupabase('galeria-imagens', async () => {
    const { data, error } = await supabase.from('produto_imagens').select(`
      id, url,
      produtos (nome, codigo, linha_comercial, dimensoes_l, dimensoes_p, dimensoes_a, familias (nome))
    `)
    if (error || !data || data.length === 0) throw new Error('Fallback')
    return data
      .filter((d: any) => d.produtos)
      .map((d: any) => ({
        id: d.id,
        image: d.url,
        productName: d.produtos.nome || 'Produto',
        code: d.produtos.codigo || 'N/A',
        line: d.produtos.linha_comercial || 'Speciale',
        family: d.produtos.familias?.nome || 'Outros',
        dimensions: `${d.produtos.dimensoes_l || 0}x${d.produtos.dimensoes_p || 0}x${d.produtos.dimensoes_a || 0}cm`,
      })) as GalleryItem[]
  })

  const items = cachedItems || (!loading ? MOCK_GALLERY : [])
  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          (activeFamily === 'Todos' || item.family === activeFamily) &&
          (activeLine === 'Todas' || item.line === activeLine),
      ),
    [items, activeFamily, activeLine],
  )

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
  }, [lightboxIndex, filteredItems.length])
  const prevImage = useCallback(() => {
    if (lightboxIndex !== null)
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length)
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
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [lightboxIndex])

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <SEO
        title="Galeria | Vittorio Design"
        description="Explore nosso portfólio completo de Balcões, Vitrines, Expositores e Fogões."
      />
      <div className="container">
        <div className="mb-12 max-w-2xl opacity-0 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Portfólio de Projetos</h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light">
            Explore nossa galeria completa organizada por famílias e linhas comerciais exclusivas.
          </p>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex flex-wrap gap-3">
            {['Todos', 'Balcões', 'Vitrines', 'Expositores', 'Fogões'].map((fam) => (
              <Button
                key={fam}
                variant={activeFamily === fam ? 'default' : 'outline'}
                onClick={() => setActiveFamily(fam)}
                className={cn(
                  'rounded-none uppercase tracking-widest text-xs px-6 py-5 transition-all',
                  activeFamily === fam
                    ? 'bg-primary text-primary-foreground border-transparent'
                    : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40',
                )}
              >
                {fam}
              </Button>
            ))}
          </div>
          <div className="w-full md:w-64">
            <Select value={activeLine} onValueChange={setActiveLine}>
              <SelectTrigger className="bg-transparent border-white/20 text-white rounded-none h-12">
                <SelectValue placeholder="Linha Comercial" />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-white/10 text-white rounded-none">
                <SelectItem value="Todas">Todas as Linhas</SelectItem>
                <SelectItem value="Strongest">Strongest</SelectItem>
                <SelectItem value="Speciale">Speciale</SelectItem>
                <SelectItem value="Aprezzo">Aprezzo</SelectItem>
                <SelectItem value="Fredda">Fredda</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[400px] w-full bg-white/5 rounded-none" />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0 animate-fade-in-up"
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
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-lg font-serif text-white group-hover:text-primary transition-colors line-clamp-1">
                      {item.productName}
                    </h3>
                    <Badge
                      variant="outline"
                      className="border-primary/50 text-primary bg-primary/5 uppercase tracking-widest text-[10px] rounded-none px-2 py-1 shrink-0"
                    >
                      {item.line}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mb-4 uppercase tracking-wider">
                    {item.code}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-light mt-auto">
                    <Expand className="w-3.5 h-3.5 text-primary/70 shrink-0" /> {item.dimensions}
                  </p>
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground">
                Nenhuma imagem encontrada com os filtros selecionados.
              </div>
            )}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-300">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/50 hover:text-white z-20 transition-colors bg-black/20 p-2 rounded-full backdrop-blur-md"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 text-white/50 hover:text-white z-20 transition-colors bg-black/20 p-3 rounded-full backdrop-blur-md"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 text-white/50 hover:text-white z-20 transition-colors bg-black/20 p-3 rounded-full backdrop-blur-md"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="w-full h-full max-w-7xl px-4 py-20 flex flex-col justify-center"
            onClick={closeLightbox}
          >
            <div
              className="relative flex-1 min-h-0 flex flex-col items-center justify-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={optimizeImage(filteredItems[lightboxIndex].image)}
                alt={filteredItems[lightboxIndex].productName}
                className="max-h-[70vh] object-contain mx-auto shadow-2xl"
              />
              <div className="text-center text-white max-w-2xl px-4">
                <div className="flex justify-center gap-3 mb-3">
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/50 uppercase tracking-widest text-[10px] rounded-none"
                  >
                    {filteredItems[lightboxIndex].line}
                  </Badge>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    {filteredItems[lightboxIndex].family}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif mb-2">
                  {filteredItems[lightboxIndex].productName}
                </h2>
                <p className="text-muted-foreground font-mono text-sm">
                  {filteredItems[lightboxIndex].code} • {filteredItems[lightboxIndex].dimensions}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
