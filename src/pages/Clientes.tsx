import { useState, useEffect, useMemo } from 'react'
import { Quote, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export type Cliente = {
  id: string
  nome: string
  tipo: string
  logo_url: string
  foto_equipamento_url: string
  depoimento: string
  data_parceria: string
}

const MOCK_CLIENTES: Cliente[] = [
  {
    id: '1',
    nome: 'Padaria Bella Vista',
    tipo: 'Padaria',
    logo_url: 'https://img.usecurling.com/i?q=bakery%20logo&shape=outline&color=white',
    foto_equipamento_url: 'https://img.usecurling.com/p/800/600?q=bakery%20showcase&color=black',
    depoimento:
      'Os expositores da Vittorio revolucionaram a forma como apresentamos nossos doces. O aumento nas vendas e o impacto visual foram imediatos, valorizando muito nosso ambiente.',
    data_parceria: new Date(Date.now() - 86400000 * 365).toISOString(),
  },
  {
    id: '2',
    nome: 'Empório Gourmet Prime',
    tipo: 'Supermercado',
    logo_url: 'https://img.usecurling.com/i?q=supermarket%20logo&shape=outline&color=white',
    foto_equipamento_url: 'https://img.usecurling.com/p/800/600?q=supermarket%20aisle&color=black',
    depoimento:
      'A robustez dos equipamentos Strongest superou nossas expectativas. Mesmo em operação contínua e de alto tráfego, a temperatura se mantém perfeitamente estável e o design continua impecável.',
    data_parceria: new Date(Date.now() - 86400000 * 500).toISOString(),
  },
  {
    id: '3',
    nome: 'Restaurante Doro',
    tipo: 'Restaurante',
    logo_url: 'https://img.usecurling.com/i?q=restaurant%20logo&shape=outline&color=white',
    foto_equipamento_url: 'https://img.usecurling.com/p/800/600?q=luxury%20kitchen&color=black',
    depoimento:
      'Buscávamos um design que conversasse com nossa arquitetura. A linha Speciale entregou exatamente o nível de sofisticação que precisávamos para o nosso salão principal.',
    data_parceria: new Date(Date.now() - 86400000 * 120).toISOString(),
  },
  {
    id: '4',
    nome: 'Gelateria Dolce Vita',
    tipo: 'Gelateria',
    logo_url: 'https://img.usecurling.com/i?q=ice%20cream%20logo&shape=outline&color=white',
    foto_equipamento_url: 'https://img.usecurling.com/p/800/600?q=gelateria&color=black',
    depoimento:
      'A precisão térmica das vitrines Fredda é incomparável. Nossos gelatos artesanais mantêm a textura perfeita o dia todo, sem cristais de gelo e com uma exposição maravilhosa.',
    data_parceria: new Date(Date.now() - 86400000 * 60).toISOString(),
  },
]

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('Todos')

  useEffect(() => {
    async function fetchClientes() {
      try {
        const { data, error } = await supabase
          .from('clientes')
          .select('*')
          .order('data_parceria', { ascending: false })

        if (error || !data || data.length === 0) throw new Error('Use fallback')
        setClientes(data)
      } catch (err) {
        setClientes(MOCK_CLIENTES)
      } finally {
        setLoading(false)
      }
    }
    fetchClientes()
  }, [])

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(clientes.map((c) => c.tipo)))
    return ['Todos', ...uniqueCategories.sort()]
  }, [clientes])

  const filteredClientes = useMemo(() => {
    if (activeCategory === 'Todos') return clientes
    return clientes.filter((c) => c.tipo === activeCategory)
  }, [clientes, activeCategory])

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <SEO
        title="Nossos Clientes | Vittorio Design"
        description="Conheça as empresas que confiam na excelência e no design dos equipamentos Vittorio Design para valorizar seus negócios."
      />
      <div className="container">
        <div className="mb-12 max-w-2xl opacity-0 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Marcas Parceiras</h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light">
            Descubra as histórias de sucesso e os estabelecimentos que confiam na excelência da
            Vittorio Design para elevar a apresentação de seus produtos.
          </p>
        </div>

        <div
          className="flex flex-wrap gap-3 mb-10 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'rounded-none uppercase tracking-widest text-xs px-6 py-5 transition-all duration-300',
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground border-transparent'
                  : 'border-white/20 text-white hover:bg-white/10 hover:border-white/40',
              )}
            >
              {cat}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card
                key={i}
                className="h-full bg-card border-white/5 rounded-none flex flex-col min-h-[400px]"
              >
                <Skeleton className="aspect-video w-full bg-white/10 rounded-none" />
                <CardContent className="p-6 flex-1 flex flex-col gap-4">
                  <div className="flex gap-4 items-center mb-2">
                    <Skeleton className="w-12 h-12 rounded-full bg-white/10" />
                    <Skeleton className="h-6 w-3/4 bg-white/10" />
                  </div>
                  <Skeleton className="h-4 w-full bg-white/10 mt-4" />
                  <Skeleton className="h-4 w-2/3 bg-white/10" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {filteredClientes.map((cliente) => (
              <Card
                key={cliente.id}
                className="h-full bg-card border-white/5 overflow-hidden hover:border-primary/50 transition-colors duration-500 rounded-none flex flex-col group"
              >
                <div className="relative aspect-video overflow-hidden bg-muted/20 shrink-0">
                  <img
                    src={cliente.foto_equipamento_url}
                    alt={`Equipamento na ${cliente.nome}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="outline"
                      className="bg-black/80 text-primary border-primary/50 uppercase tracking-widest text-[10px] rounded-none px-3 py-1 backdrop-blur-md"
                    >
                      {cliente.tipo}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 md:p-8 flex-1 flex flex-col relative z-10 bg-gradient-to-b from-card to-card/95">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-14 h-14 rounded-full border border-white/10 bg-black/40 flex items-center justify-center p-2.5 overflow-hidden shrink-0 shadow-lg">
                      <img
                        src={cliente.logo_url}
                        alt={`Logo ${cliente.nome}`}
                        className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <h3 className="text-xl font-serif text-white group-hover:text-primary transition-colors line-clamp-2">
                      {cliente.nome}
                    </h3>
                  </div>

                  {cliente.depoimento && (
                    <div className="relative flex-1 flex flex-col mt-2">
                      <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2 -z-10" />
                      <p className="text-muted-foreground font-light leading-relaxed text-sm italic z-10 pl-4 border-l border-primary/20">
                        "{cliente.depoimento}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {filteredClientes.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground">
                Nenhum parceiro encontrado nesta categoria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
