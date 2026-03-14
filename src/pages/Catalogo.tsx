import { useState, useEffect, useMemo } from 'react'
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
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { useCart } from '@/hooks/useCart'

type Familia = {
  id: string
  nome: string
}

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

export default function Catalogo() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { addToCart, isAdding } = useCart()
  const [familias, setFamilias] = useState<Familia[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('name-asc')
  const [isLoading, setIsLoading] = useState(true)
  const [requestingId, setRequestingId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const [familiasRes, produtosRes] = await Promise.all([
          supabase.from('familias').select('id, nome').order('nome'),
          supabase.from('produtos').select('*, familias(id, nome)'),
        ])
        if (familiasRes.data) setFamilias(familiasRes.data)
        if (produtosRes.data) setProdutos(produtosRes.data)
      } catch (err) {
        console.error('Error fetching catalog data:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

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

  const handleQuoteRequest = async (e: React.MouseEvent, product: Produto) => {
    e.preventDefault()
    e.stopPropagation()
    const l = product.dimensoes_l || 0
    const p = product.dimensoes_p || 0
    const a = product.dimensoes_a || 0
    const dimensoesStr = `${l}x${p}x${a}mm`
    setRequestingId(product.id)
    try {
      const { error } = await supabase.functions.invoke('request-quote', {
        body: {
          product: { nome: product.nome, codigo: product.codigo, dimensoes: dimensoesStr },
          target_phone: '+5521990451568',
          message: `Olá! Gostaria de um orçamento para o produto: ${product.nome} (Código: ${product.codigo}). Dimensões: ${dimensoesStr}.`,
        },
      })
      if (error) throw error
      toast({
        title: 'Solicitação enviada!',
        description: 'Sua solicitação de orçamento foi enviada com sucesso.',
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Erro ao enviar',
        description: 'Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.',
      })
    } finally {
      setRequestingId(null)
    }
  }

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <div className="container">
        <div className="mb-12 max-w-2xl opacity-0 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Nosso Catálogo</h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light">
            Explore nossa coleção de peças exclusivas. Balcões, Vitrines e Expositores desenvolvidos
            com a precisão do inox e detalhes em ouro para transformar seu ambiente.
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
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent'
                  : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40',
              )}
            >
              Todos os Produtos
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
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent'
                        : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40',
                    )}
                  >
                    {fam.nome}
                  </Button>
                ))}
          </div>
          <div className="w-full lg:w-72">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="rounded-none border-white/20 text-white bg-transparent focus:ring-primary focus:ring-offset-0 h-12">
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
                      src={
                        product.imagem_url ||
                        'https://img.usecurling.com/p/800/1000?q=product&color=black'
                      }
                      alt={product.nome}
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

                    {product.disponivel_ecommerce && product.preco != null && (
                      <p className="text-xl text-white font-serif mt-4">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(product.preco)}
                      </p>
                    )}

                    <div className="mt-6 flex flex-col gap-4 relative z-10">
                      <div className="flex items-center text-xs font-medium text-primary uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                        Ver Detalhes <ArrowRight className="ml-2 h-4 w-4" />
                      </div>

                      {product.disponivel_ecommerce ? (
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
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Adicionar ao Carrinho
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => handleQuoteRequest(e, product)}
                          disabled={requestingId === product.id}
                          className="w-full bg-transparent border border-white/10 text-white hover:bg-primary hover:border-primary hover:text-primary-foreground rounded-none text-xs tracking-widest uppercase transition-all duration-300"
                        >
                          {requestingId === product.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            'Solicitar Orçamento'
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
            {sortedAndFiltered.length === 0 && (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                Nenhum produto encontrado.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
