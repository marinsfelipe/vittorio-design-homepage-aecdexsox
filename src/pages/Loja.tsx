import { useState, useMemo, useEffect } from 'react'
import { ArrowRight, Expand, Loader2, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn, optimizeImage } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/hooks/useCart'
import { SEO } from '@/components/SEO'
import { trackEvent } from '@/lib/analytics'
import { useCachedSupabase } from '@/hooks/useCachedSupabase'

type Familia = { id: string; nome: string }

type Produto = {
  id: string
  nome: string
  codigo: string
  familia_id: string
  dimensoes_l: number
  dimensoes_p: number
  dimensoes_a: number
  imagem_url: string
  familias?: Familia
  preco?: number
  disponivel_ecommerce?: boolean
}

export default function Loja() {
  const navigate = useNavigate()
  const { addToCart, isAdding } = useCart()
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('name-asc')

  const { data: storeData, loading: isLoading } = useCachedSupabase('loja-data', async () => {
    const [familiasRes, produtosRes] = await Promise.all([
      supabase.from('familias').select('id, nome').order('nome'),
      supabase.from('produtos').select('*, familias(id, nome)').eq('disponivel_ecommerce', true),
    ])
    return {
      familias: (familiasRes.data || []) as Familia[],
      produtos: (produtosRes.data || []) as Produto[],
    }
  })

  const familias = storeData?.familias || []
  const produtos = storeData?.produtos || []

  const sortedAndFiltered = useMemo(() => {
    let result = [...produtos]
    if (selectedFamilyId !== 'All') result = result.filter((p) => p.familia_id === selectedFamilyId)
    result.sort((a, b) => {
      const volA = (a.dimensoes_l || 0) * (a.dimensoes_p || 0) * (a.dimensoes_a || 0)
      const volB = (b.dimensoes_l || 0) * (b.dimensoes_p || 0) * (b.dimensoes_a || 0)
      switch (sortBy) {
        case 'name-asc':
          return a.nome.localeCompare(b.nome)
        case 'name-desc':
          return b.nome.localeCompare(a.nome)
        case 'size-asc':
          return volA - volB
        case 'size-desc':
          return volB - volA
        default:
          return 0
      }
    })
    return result
  }, [produtos, selectedFamilyId, sortBy])

  useEffect(() => {
    if (!isLoading && sortedAndFiltered.length > 0) {
      trackEvent('view_item_list', {
        item_list_id: 'loja',
        item_list_name: 'Loja Online',
        items: sortedAndFiltered.map((p) => ({
          item_id: p.id,
          item_name: p.nome,
          price: p.preco || 0,
          item_category: p.familias?.nome || '',
        })),
      })
    }
  }, [isLoading, sortedAndFiltered])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
  }

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <SEO
        title="Loja Online | Vittorio Design"
        description="Adquira peças exclusivas diretamente pelo nosso e-commerce. Seleção especial com disponibilidade imediata e entrega para todo o Brasil."
      />
      <div className="container">
        <div className="mb-12 max-w-2xl opacity-0 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Loja Online</h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light">
            Adquira peças exclusivas diretamente pelo nosso e-commerce. Seleção especial com
            disponibilidade imediata e entrega para todo o Brasil.
          </p>
        </div>

        <div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedFamilyId === 'All' ? 'default' : 'outline'}
              onClick={() => setSelectedFamilyId('All')}
              className={cn(
                'rounded-none uppercase tracking-widest text-xs px-6 py-5 transition-all duration-300',
                selectedFamilyId === 'All'
                  ? 'bg-primary text-primary-foreground border-transparent'
                  : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40',
              )}
            >
              Todos
            </Button>
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-[42px] w-[120px] rounded-none bg-white/10" />
                ))
              : familias.map((fam) => (
                  <Button
                    key={fam.id}
                    variant={selectedFamilyId === fam.id ? 'default' : 'outline'}
                    onClick={() => setSelectedFamilyId(fam.id)}
                    className={cn(
                      'rounded-none uppercase tracking-widest text-xs px-6 py-5 transition-all duration-300',
                      selectedFamilyId === fam.id
                        ? 'bg-primary text-primary-foreground border-transparent'
                        : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40',
                    )}
                  >
                    {fam.nome}
                  </Button>
                ))}
          </div>
          <div className="w-full lg:w-72">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="rounded-none border-white/20 text-white bg-transparent h-12">
                <SelectValue placeholder="Ordenar por..." />
              </SelectTrigger>
              <SelectContent className="rounded-none bg-[#111] border-white/10 text-white">
                <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
                <SelectItem value="size-asc">Tamanho (Menor - Maior)</SelectItem>
                <SelectItem value="size-desc">Tamanho (Maior - Menor)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card
                key={i}
                className="h-full bg-card border-white/5 overflow-hidden rounded-none flex flex-col"
              >
                <Skeleton className="relative aspect-[4/5] bg-white/10 rounded-none" />
                <CardContent className="p-6 flex flex-col gap-3">
                  <Skeleton className="h-6 w-3/4 bg-white/10" />
                  <Skeleton className="h-4 w-1/2 bg-white/10" />
                  <Skeleton className="h-4 w-2/3 bg-white/10 mt-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            {sortedAndFiltered.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/produto/${product.id}`)}
                className="group block h-full cursor-pointer"
              >
                <Card className="h-full bg-card border-white/5 overflow-hidden group-hover:border-primary/50 transition-colors duration-500 rounded-none flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted/20">
                    <img
                      src={optimizeImage(
                        product.imagem_url ||
                          'https://img.usecurling.com/p/800/1000?q=product&color=black',
                      )}
                      alt={product.nome}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    {product.familias && (
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="outline"
                          className="bg-black/80 text-primary border-primary/50 uppercase tracking-widest text-[10px] rounded-none px-3 py-1 backdrop-blur-md"
                        >
                          {product.familias.nome}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6 relative flex-1 flex flex-col">
                    <h3 className="text-xl font-serif text-white mb-1 group-hover:text-primary transition-colors">
                      {product.nome}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono mb-3 uppercase tracking-wider">
                      {product.codigo}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 font-light mt-auto">
                      <Expand className="w-4 h-4 text-primary/70" />
                      {product.dimensoes_l}cm x {product.dimensoes_p}cm x {product.dimensoes_a}cm
                    </p>

                    {product.preco != null && (
                      <p className="text-xl text-white font-serif mt-4">
                        {formatPrice(product.preco)}
                      </p>
                    )}

                    <div className="mt-6 flex flex-col gap-4 relative z-10">
                      <div className="flex items-center text-xs font-medium text-primary uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                        Ver Detalhes <ArrowRight className="ml-2 h-4 w-4" />
                      </div>

                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          addToCart(product.id)
                        }}
                        disabled={isAdding === product.id}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none text-xs tracking-widest uppercase transition-all duration-300"
                      >
                        {isAdding === product.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" /> Adicionar ao Carrinho
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            {sortedAndFiltered.length === 0 && (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                Nenhum produto disponível no momento.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
