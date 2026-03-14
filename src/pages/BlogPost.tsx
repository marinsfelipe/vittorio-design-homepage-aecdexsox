import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  ArrowLeft,
  Clock,
  User,
  Facebook,
  Linkedin,
  MessageCircle,
  Share2,
  Loader2,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { SEO } from '@/components/SEO'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trackEvent } from '@/lib/analytics'
import type { Article } from './Blog'

const MOCK_ARTICLE: Article = {
  id: 'fallback',
  titulo: 'A Evolução dos Expositores Refrigerados em Supermercados Premium',
  conteudo: `
    <p>Os supermercados de alto padrão estão transformando suas seções de frios e laticínios para oferecer experiências de compra imersivas e visualmente deslumbrantes. O antigo modelo de longos corredores de prateleiras brancas cedeu espaço a verdadeiras butiques gastronômicas.</p>
    <h2>O Impacto do Design na Percepção de Valor</h2>
    <p>A iluminação direcionada, o uso de aços inoxidáveis com acabamentos especiais e a integração de materiais nobres como a madeira e o vidro temperado criam uma atmosfera que valoriza o produto exposto. Segundo estudos de neuromarketing, a apresentação influencia diretamente a percepção de frescor e qualidade.</p>
    <ul>
      <li>Maior retenção do cliente no setor</li>
      <li>Aumento na conversão de itens premium</li>
      <li>Redução de desperdício térmico com engenharia de ponta</li>
    </ul>
    <h2>Sustentabilidade e Performance</h2>
    <p>Além da estética, a nova geração de expositores foca intensamente na eficiência energética, utilizando compressores inverter e gases refrigerantes ecológicos de baixo impacto ambiental, unindo o belo ao sustentável.</p>
  `,
  autor: 'Felipe Marins',
  data_publicacao: new Date().toISOString(),
  categoria: 'Comercial',
  tempo_leitura: '5',
  imagem_url: 'https://img.usecurling.com/p/1200/800?q=luxury%20supermarket&color=black',
}

export default function BlogPost() {
  const { id } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticle() {
      if (!id) return
      try {
        const { data, error } = await supabase.from('artigos').select('*').eq('id', id).single()

        if (error || !data) throw new Error('Not found')
        setArticle(data)
      } catch (err) {
        setArticle({ ...MOCK_ARTICLE, id: id || 'fallback' })
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [id])

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!article) return null

  const shareUrl = window.location.href
  const encodedTitle = encodeURIComponent(article.titulo)

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedTitle} - ${shareUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
  ]

  const handleShare = (network: string, url: string) => {
    trackEvent('share', { method: network, content_type: 'article', item_id: article.id })
    window.open(url, '_blank', 'width=600,height=400')
  }

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen selection:bg-primary selection:text-primary-foreground">
      <SEO
        title={`${article.titulo} | Blog Vittorio Design`}
        description={article.titulo}
        image={article.imagem_url}
      />

      <article className="container max-w-4xl">
        <div className="mb-10 opacity-0 animate-fade-in-up">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o Blog
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <Badge
              variant="outline"
              className="border-primary/30 text-primary bg-primary/5 uppercase tracking-widest rounded-none px-3 py-1"
            >
              {article.categoria}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-muted-foreground font-light">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" /> {article.tempo_leitura} min de leitura
              </span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-8 leading-tight">
            {article.titulo}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center overflow-hidden border border-white/10">
                <User className="w-6 h-6 text-primary/80" />
              </div>
              <div>
                <p className="text-white font-medium">{article.autor}</p>
                <p className="text-sm text-muted-foreground font-light">
                  {format(new Date(article.data_publicacao), "dd 'de' MMMM, yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-muted-foreground mr-2 flex items-center gap-2">
                <Share2 className="w-3.5 h-3.5" /> Compartilhar
              </span>
              {shareLinks.map((link) => {
                const Icon = link.icon
                return (
                  <button
                    key={link.name}
                    onClick={() => handleShare(link.name, link.url)}
                    className="p-2.5 rounded-full border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card"
                    aria-label={`Compartilhar no ${link.name}`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div
          className="mb-12 aspect-[21/9] overflow-hidden bg-muted/20 border border-white/5 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <img
            src={
              article.imagem_url || 'https://img.usecurling.com/p/1200/600?q=abstract&color=black'
            }
            alt={article.titulo}
            className="w-full h-full object-cover grayscale-[0.2]"
          />
        </div>

        <div
          className="prose prose-invert prose-lg md:prose-xl prose-p:font-light prose-p:leading-relaxed prose-headings:font-serif prose-a:text-primary prose-strong:text-white max-w-none opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
          dangerouslySetInnerHTML={{ __html: article.conteudo }}
        />

        <div
          className="mt-16 pt-8 border-t border-white/5 md:hidden flex flex-col items-center gap-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Share2 className="w-3.5 h-3.5" /> Compartilhar Artigo
          </span>
          <div className="flex gap-4">
            {shareLinks.map((link) => {
              const Icon = link.icon
              return (
                <button
                  key={link.name}
                  onClick={() => handleShare(link.name, link.url)}
                  className="p-3 rounded-full border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all bg-card"
                >
                  <Icon className="w-5 h-5" />
                </button>
              )
            })}
          </div>
        </div>

        <div
          className="mt-20 text-center opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <h3 className="text-2xl font-serif text-white mb-6">
            Procurando soluções exclusivas para seu negócio?
          </h3>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-6 text-sm tracking-widest uppercase transition-all duration-300"
          >
            <Link to="/orcamento">Solicitar Orçamento</Link>
          </Button>
        </div>
      </article>
    </div>
  )
}
