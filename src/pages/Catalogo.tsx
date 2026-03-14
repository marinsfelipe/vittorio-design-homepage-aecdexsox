import { useState, useEffect, useMemo } from 'react'
import { ArrowRight, Expand, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
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
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

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
}

const fallbackFamilias: Familia[] = [
  { id: 'f1000000-0000-0000-0000-000000000001', nome: 'Balcões' },
  { id: 'f2000000-0000-0000-0000-000000000002', nome: 'Vitrines' },
  { id: 'f3000000-0000-0000-0000-000000000003', nome: 'Expositores' },
]

const fallbackProdutos: Produto[] = [
  {
    id: 'p1000000-0000-0000-0000-000000000001',
    nome: 'Balcão Premium Ouro',
    codigo: 'VD.EX.BAL.001',
    familia_id: 'f1000000-0000-0000-0000-000000000001',
    dimensoes_l: 120,
    dimensoes_p: 60,
    dimensoes_a: 90,
    imagem_url: 'https://img.usecurling.com/p/800/1000?q=luxury%20reception%20desk&color=black',
    familias: { id: 'f1000000-0000-0000-0000-000000000001', nome: 'Balcões' },
  },
  {
    id: 'p2000000-0000-0000-0000-000000000002',
    nome: 'Vitrine Torre Cristal',
    codigo: 'VD.EX.VTR.001',
    familia_id: 'f2000000-0000-0000-0000-000000000002',
    dimensoes_l: 60,
    dimensoes_p: 60,
    dimensoes_a: 180,
    imagem_url:
      'https://img.usecurling.com/p/1200/1600?q=luxury%20glass%20display%20cabinet&color=black',
    familias: { id: 'f2000000-0000-0000-0000-000000000002', nome: 'Vitrines' },
  },
  {
    id: 'p3000000-0000-0000-0000-000000000003',
    nome: 'Expositor Central Prisma',
    codigo: 'VD.EX.EXP.001',
    familia_id: 'f3000000-0000-0000-0000-000000000003',
    dimensoes_l: 100,
    dimensoes_p: 100,
    dimensoes_a: 120,
    imagem_url: 'https://img.usecurling.com/p/800/1000?q=retail%20display%20stand&color=black',
    familias: { id: 'f3000000-0000-0000-0000-000000000003', nome: 'Expositores' },
  },
]

export default function Catalogo() {
  const [familias, setFamilias] = useState<Familia[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('name-asc')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const [familiasRes, produtosRes] = await Promise.all([
          supabase.from('familias').select('*').order('nome'),
          supabase.from('produtos').select('*, familias(id, nome)'),
        ])

        if (familiasRes.error || produtosRes.error || !familiasRes.data?.length) {
          throw new Error('Fallback to mock')
        }

        setFamilias(familiasRes.data)
        setProdutos(produtosRes.data)
      } catch (err) {
        setFamilias(fallbackFamilias)
        setProdutos(fallbackProdutos)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const sortedAndFiltered = useMemo(() => {
    let result = [...produtos]
    if (selectedFamilyId !== 'All') {
      result = result.filter((p) => p.familia_id === selectedFamilyId)
    }

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
            {familias.map((fam) => (
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
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              {sortedAndFiltered.map((product) => (
                <Link key={product.id} to={`/produto/${product.id}`} className="group block h-full">
                  <Card className="h-full bg-card border-white/5 overflow-hidden group-hover:border-primary/50 transition-colors duration-500 rounded-none cursor-pointer flex flex-col">
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
                      <h3 className="text-xl font-serif text-white mb-3 group-hover:text-primary transition-colors">
                        {product.nome}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 font-light mt-auto">
                        <Expand className="w-4 h-4 text-primary/70" />
                        {product.dimensoes_l}cm x {product.dimensoes_p}cm x {product.dimensoes_a}cm
                      </p>

                      <div className="mt-6 flex items-center text-xs font-medium text-primary uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                        Ver Detalhes <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {sortedAndFiltered.length === 0 && (
              <div
                className="text-center py-20 text-muted-foreground opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.3s' }}
              >
                Nenhum produto encontrado para o filtro selecionado.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
