import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Clock, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export type Article = {
  id: string
  titulo: string
  conteudo: string
  autor: string
  data_publicacao: string
  categoria: string
  tempo_leitura: string | number
  imagem_url: string
}

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    titulo: 'A Evolução dos Expositores Refrigerados em Supermercados Premium',
    conteudo:
      'Os supermercados de alto padrão estão transformando suas seções de frios e laticínios...',
    autor: 'Felipe Marins',
    data_publicacao: new Date(Date.now() - 86400000 * 5).toISOString(),
    categoria: 'Comercial',
    tempo_leitura: '5',
    imagem_url: 'https://img.usecurling.com/p/800/600?q=supermarket&color=black',
  },
  {
    id: '2',
    titulo: 'Manutenção Preventiva: Prolongando a Vida Útil do seu Equipamento',
    conteudo:
      'Equipamentos de refrigeração comercial exigem cuidados específicos para operar com eficiência máxima. Aprenda as melhores práticas para manter sua vitrine sempre impecável.',
    autor: 'Equipe Técnica',
    data_publicacao: new Date(Date.now() - 86400000 * 15).toISOString(),
    categoria: 'Técnico',
    tempo_leitura: '7',
    imagem_url: 'https://img.usecurling.com/p/800/600?q=maintenance&color=black',
  },
  {
    id: '3',
    titulo: 'Design Minimalista na Gastronomia: A Força do Inox Escovado',
    conteudo:
      'A tendência do luxo silencioso chegou às cozinhas profissionais e áreas de atendimento. O inox escovado combina durabilidade com uma estética limpa e sofisticada.',
    autor: 'Wellington Moreira',
    data_publicacao: new Date(Date.now() - 86400000 * 25).toISOString(),
    categoria: 'Tendências',
    tempo_leitura: '4',
    imagem_url: 'https://img.usecurling.com/p/800/600?q=minimalist%20kitchen&color=black',
  },
]

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('Todos')

  const categories = ['Todos', 'Técnico', 'Comercial', 'Tendências']

  useEffect(() => {
    async function fetchArticles() {
      try {
        const { data, error } = await supabase
          .from('artigos')
          .select('*')
          .order('data_publicacao', { ascending: false })

        if (error || !data || data.length === 0) throw new Error('Use fallback')
        setArticles(data)
      } catch (err) {
        setArticles(MOCK_ARTICLES)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'Todos') return articles
    return articles.filter((a) => a.categoria === activeCategory)
  }, [articles, activeCategory])

  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent || ''
  }

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <SEO
        title="Blog & Insights | Vittorio Design"
        description="Acompanhe novidades, tendências de design e dicas técnicas sobre refrigeração comercial premium."
      />
      <div className="container">
        <div className="mb-12 max-w-2xl opacity-0 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Blog & Insights</h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light">
            Especialistas em design e engenharia compartilham conhecimentos sobre o mercado de food
            service, inovações e cases de sucesso.
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
              <Card key={i} className="h-[450px] bg-card border-white/5 rounded-none flex flex-col">
                <Skeleton className="h-[200px] w-full bg-white/10 rounded-none" />
                <CardContent className="p-6 flex-1 flex flex-col gap-4">
                  <Skeleton className="h-6 w-3/4 bg-white/10" />
                  <Skeleton className="h-4 w-full bg-white/10" />
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
            {filteredArticles.map((article) => (
              <Link key={article.id} to={`/blog/${article.id}`} className="group h-full block">
                <Card className="h-full bg-card border-white/5 overflow-hidden group-hover:border-primary/50 transition-colors duration-500 rounded-none flex flex-col relative">
                  <div className="relative aspect-video overflow-hidden bg-muted/20 shrink-0">
                    <img
                      src={
                        article.imagem_url ||
                        'https://img.usecurling.com/p/800/600?q=article&color=black'
                      }
                      alt={article.titulo}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="outline"
                        className="bg-black/80 text-primary border-primary/50 uppercase tracking-widest text-[10px] rounded-none px-3 py-1 backdrop-blur-md"
                      >
                        {article.categoria}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-light">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" /> {article.tempo_leitura} min
                      </span>
                      <span>•</span>
                      <span>
                        {format(new Date(article.data_publicacao), "dd 'de' MMM, yyyy", {
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.titulo}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light line-clamp-3 mb-6 flex-1">
                      {stripHtml(article.conteudo)}
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
                      <div className="p-1.5 bg-white/5 rounded-full text-primary shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-white font-medium">{article.autor}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {filteredArticles.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground">
                Nenhum artigo encontrado nesta categoria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
