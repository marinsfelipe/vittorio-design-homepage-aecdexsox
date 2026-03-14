import { useState } from 'react'
import { FileText, FileDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { SEO } from '@/components/SEO'
import { trackEvent } from '@/lib/analytics'
import { PrintableCatalog } from '@/components/PrintableCatalog'

export default function Catalogo() {
  const { toast } = useToast()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)
    trackEvent('download_catalog', { method: 'print_pdf' })

    toast({
      title: 'Gerando PDF',
      description: 'Preparando o catálogo para impressão ou salvamento.',
    })

    setTimeout(() => {
      setIsDownloading(false)
      window.print()
    }, 1500)
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
            className="flex justify-center mb-16 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <Button
              size="lg"
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 h-16 text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(201,162,107,0.2)]"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" /> Gerando Documento...
                </>
              ) : (
                <>
                  <FileDown className="w-5 h-5 mr-3" /> Baixar Catálogo em PDF
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
