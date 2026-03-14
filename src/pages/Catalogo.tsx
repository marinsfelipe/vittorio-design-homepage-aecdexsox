import { useState, useMemo } from 'react'
import { ArrowRight, Expand } from 'lucide-react'
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

type Family = 'Balcões' | 'Vitrines' | 'Expositores'

type Product = {
  id: string
  name: string
  family: Family
  dimensions: string
  sizeScore: number
  img: string
}

const products: Product[] = [
  {
    id: 'b1',
    name: 'Balcão Premium Ouro',
    family: 'Balcões',
    dimensions: '120cm x 60cm x 90cm',
    sizeScore: 648000,
    img: 'https://img.usecurling.com/p/800/1000?q=luxury%20reception%20desk&color=black',
  },
  {
    id: 'b2',
    name: 'Balcão Executivo Inox',
    family: 'Balcões',
    dimensions: '150cm x 60cm x 90cm',
    sizeScore: 810000,
    img: 'https://img.usecurling.com/p/800/1000?q=modern%20counter&color=black',
  },
  {
    id: 'b3',
    name: 'Balcão Minimalista',
    family: 'Balcões',
    dimensions: '100cm x 50cm x 90cm',
    sizeScore: 450000,
    img: 'https://img.usecurling.com/p/800/1000?q=minimalist%20desk&color=black',
  },
  {
    id: 'b4',
    name: 'Balcão Curvo Elegance',
    family: 'Balcões',
    dimensions: '180cm x 70cm x 90cm',
    sizeScore: 1134000,
    img: 'https://img.usecurling.com/p/800/1000?q=curved%20reception%20counter&color=black',
  },
  {
    id: 'v1',
    name: 'Vitrine Torre Cristal',
    family: 'Vitrines',
    dimensions: '60cm x 60cm x 180cm',
    sizeScore: 648000,
    img: 'https://img.usecurling.com/p/800/1000?q=glass%20display%20cabinet&color=black',
  },
  {
    id: 'v2',
    name: 'Vitrine Panorâmica',
    family: 'Vitrines',
    dimensions: '120cm x 40cm x 180cm',
    sizeScore: 864000,
    img: 'https://img.usecurling.com/p/800/1000?q=large%20display%20case&color=black',
  },
  {
    id: 'v3',
    name: 'Vitrine Suspensa',
    family: 'Vitrines',
    dimensions: '80cm x 30cm x 60cm',
    sizeScore: 144000,
    img: 'https://img.usecurling.com/p/800/1000?q=wall%20mounted%20display%20cabinet&color=black',
  },
  {
    id: 'v4',
    name: 'Vitrine Iluminada Led',
    family: 'Vitrines',
    dimensions: '100cm x 40cm x 200cm',
    sizeScore: 800000,
    img: 'https://img.usecurling.com/p/800/1000?q=illuminated%20glass%20showcase&color=black',
  },
  {
    id: 'e1',
    name: 'Expositor Central Prisma',
    family: 'Expositores',
    dimensions: '100cm x 100cm x 120cm',
    sizeScore: 1200000,
    img: 'https://img.usecurling.com/p/800/1000?q=retail%20display%20stand&color=black',
  },
  {
    id: 'e2',
    name: 'Expositor Parede Slim',
    family: 'Expositores',
    dimensions: '120cm x 30cm x 200cm',
    sizeScore: 720000,
    img: 'https://img.usecurling.com/p/800/1000?q=wall%20shelving%20display&color=black',
  },
  {
    id: 'e3',
    name: 'Expositor Ilha',
    family: 'Expositores',
    dimensions: '150cm x 80cm x 100cm',
    sizeScore: 1200000,
    img: 'https://img.usecurling.com/p/800/1000?q=island%20display%20table&color=black',
  },
  {
    id: 'e4',
    name: 'Expositor Modular',
    family: 'Expositores',
    dimensions: '90cm x 40cm x 180cm',
    sizeScore: 648000,
    img: 'https://img.usecurling.com/p/800/1000?q=modular%20display%20rack&color=black',
  },
]

export default function Catalogo() {
  const [selectedFamily, setSelectedFamily] = useState<Family | 'All'>('All')
  const [sortBy, setSortBy] = useState<string>('name-asc')

  const sortedAndFiltered = useMemo(() => {
    let result = [...products]
    if (selectedFamily !== 'All') {
      result = result.filter((p) => p.family === selectedFamily)
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'size-asc':
          return a.sizeScore - b.sizeScore
        case 'size-desc':
          return b.sizeScore - a.sizeScore
        default:
          return 0
      }
    })

    return result
  }, [selectedFamily, sortBy])

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <div className="container">
        {/* Header */}
        <div className="mb-12 max-w-2xl opacity-0 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Nosso Catálogo</h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light">
            Explore nossa coleção de peças exclusivas. Balcões, Vitrines e Expositores desenvolvidos
            com a precisão do inox e detalhes em ouro para transformar seu ambiente.
          </p>
        </div>

        {/* Filters and Sorting */}
        <div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex flex-wrap gap-3">
            {['All', 'Balcões', 'Vitrines', 'Expositores'].map((fam) => (
              <Button
                key={fam}
                variant={selectedFamily === fam ? 'default' : 'outline'}
                onClick={() => setSelectedFamily(fam as Family | 'All')}
                className={cn(
                  'rounded-none uppercase tracking-widest text-xs px-6 py-5 transition-all duration-300',
                  selectedFamily === fam
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent'
                    : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40',
                )}
              >
                {fam === 'All' ? 'Todos os Produtos' : fam}
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

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          {sortedAndFiltered.map((product) => (
            <Link key={product.id} to={`/produto/${product.id}`} className="group block h-full">
              <Card className="h-full bg-card border-white/5 overflow-hidden group-hover:border-primary/50 transition-colors duration-500 rounded-none cursor-pointer flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted/20">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="outline"
                      className="bg-black/80 text-primary border-primary/50 uppercase tracking-widest text-[10px] rounded-none px-3 py-1 backdrop-blur-md"
                    >
                      {product.family}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 relative flex-1 flex flex-col">
                  <h3 className="text-xl font-serif text-white mb-3 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 font-light mt-auto">
                    <Expand className="w-4 h-4 text-primary/70" />
                    {product.dimensions}
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
      </div>
    </div>
  )
}
