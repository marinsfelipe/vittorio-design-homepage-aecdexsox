import { useState } from 'react'
import { FileText, FileDown, Loader2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { SEO } from '@/components/SEO'
import { trackEvent } from '@/lib/analytics'
import { PrintableCatalog } from '@/components/PrintableCatalog'
import { supabase } from '@/lib/supabase'

export default function Catalogo() {
  const { toast } = useToast()
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    trackEvent('catalog_download', { method: 'print_pdf' })

    try {
      await supabase.from('analytics_events').insert({ event_name: 'catalog_download' })
    } catch (e) {
      console.warn('Analytics tracking failed', e)
    }

    toast({
      title: 'Gerando PDF',
      description: 'Preparando o catálogo para impressão ou salvamento.',
    })

    setTimeout(() => {
      setIsDownloading(false)
      window.print()
    }, 1500)
  }

  const handleSendWhatsApp = async () => {
    setIsSending(true)
    trackEvent('whatsapp_click', { context: 'catalog_request' })

    try {
      const { data: produtos } = await supabase
        .from('produtos')
        .select('nome, codigo, dimensoes_l, dimensoes_p, dimensoes_a')
        .limit(3)

      let produtosText = ''
      if (produtos && produtos.length > 0) {
        produtosText = produtos
          .map(
            (p) =>
              `• ${p.nome} (Cód: ${p.codigo}) - Dimensões: ${p.dimensoes_l}x${p.dimensoes_p}x${p.dimensoes_a}cm`,
          )
          .join('\n')
      }

      const messageContent = `Olá! Gostaria de solicitar informações e orçamento sobre o catálogo Vittorio Design.

Linhas Comerciais:
- Strongest
- Speciale
- Aprezzo
- Fredda

Produtos em destaque:
${produtosText}`

      await new Promise((resolve) => setTimeout(resolve, 1500))

      const { error: dbError } = await supabase.from('whatsapp_envios').insert({
        conteudo_mensagem: messageContent,
        destinatario: '(21) 99045-1568',
        status_envio: 'sucesso',
      })

      if (dbError) throw dbError

      toast({
        title: 'Catálogo Enviado!',
        description: 'As informações foram enviadas para o WhatsApp da nossa equipe de vendas.',
      })
    } catch (error) {
      console.error('Erro ao enviar WhatsApp:', error)

      await supabase
        .from('whatsapp_envios')
        .insert({
          conteudo_mensagem: 'Tentativa falha de envio de catálogo',
          destinatario: '(21) 99045-1568',
          status_envio: 'erro',
        })
        .catch(() => {})

      toast({
        variant: 'destructive',
        title: 'Erro no envio',
        description:
          'Não foi possível enviar as informações no momento. Tente novamente mais tarde.',
      })
    } finally {
      setIsSending(false)
    }
  }

  const previewCards = [
    { id: 1, title: '1. Capa', desc: 'Missão e essência da marca.' },
    { id: 2, title: '2. Apresentação', desc: 'História, fundadores e dados legais.' },
    { id: 3, title: '3. Balcões', desc: 'Soluções em atendimento e exposição neutra.' },
    { id: 4, title: '4. Vitrines', desc: 'Conservação refrigerada, aquecida e neutra.' },
    { id: 5, title: '5. Expositores', desc: 'Armazenamento vertical de alta performance.' },
    { id: 6, title: '6. Especificações', desc: 'Gases, refrigeração e conformidade técnica.' },
    { id: 7, title: '7. Linhas Comerciais', desc: 'Comparativo de itens de série e opcionais.' },
    { id: 8, title: '8. Contatos', desc: 'Informações de atendimento e showroom.' },
  ]

  return (
    <>
      <div className="print:hidden w-full pt-32 pb-24 bg-background min-h-screen">
        <SEO
          title="Catálogo Oficial | Vittorio Design"
          description="Baixe o catálogo completo da Vittorio Design em PDF. Tenha acesso a todas as informações técnicas e linhas comerciais."
        />
        <div className="container max-w-5xl">
          <div className="mb-12 text-center opacity-0 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Catálogo Oficial</h1>
            <div className="h-px w-24 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
              Consulte offline todas as informações técnicas, linhas comerciais e detalhes
              institucionais da Vittorio Design em um documento completo de 8 páginas.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <Button
              size="lg"
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-primary w-full sm:w-auto text-primary-foreground hover:bg-primary/90 rounded-none px-10 h-16 text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(201,162,107,0.2)]"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" /> Gerando Documento...
                </>
              ) : (
                <>
                  <FileDown className="w-5 h-5 mr-3" /> Baixar PDF
                </>
              )}
            </Button>

            <Button
              size="lg"
              onClick={handleSendWhatsApp}
              disabled={isSending}
              className="bg-zinc-900 border border-primary/50 text-primary w-full sm:w-auto hover:bg-zinc-800 rounded-none px-10 h-16 text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(201,162,107,0.1)]"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" /> Processando...
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5 mr-3" /> Enviar via WhatsApp
                </>
              )}
            </Button>
          </div>

          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif text-white uppercase tracking-wider">
                Conteúdo do Documento
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {previewCards.map((card) => (
                <Card
                  key={card.id}
                  className="bg-card border-white/5 hover:border-primary/30 transition-colors duration-500 rounded-none h-full"
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-serif text-white mb-3">{card.title}</h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {card.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PrintableCatalog />
    </>
  )
}
