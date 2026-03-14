import { useState, useEffect, useMemo } from 'react'
import { HelpCircle, Loader2 } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { supabase } from '@/lib/supabase'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

type FAQItem = {
  id: string
  pergunta: string
  resposta: string
  categoria: string
}

const FALLBACK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    categoria: 'Linhas Comerciais',
    pergunta: 'Quais são as diferenças entre as linhas comerciais?',
    resposta:
      'Nossas linhas atendem diferentes demandas do mercado:<br/><br/><b>Strongest:</b> Foco em extrema robustez e durabilidade para operações de alto volume.<br/><b>Speciale:</b> Design premium e soluções personalizadas para ambientes sofisticados.<br/><b>Aprezzo:</b> Excelente custo-benefício mantendo a excelência construtiva da marca.<br/><b>Fredda:</b> Especializada em tecnologias de baixa temperatura e conservação de gelatos.',
  },
  {
    id: 'faq-2',
    categoria: 'Prazos e Logística',
    pergunta: 'Quais são os prazos de orçamento, fabricação e entrega?',
    resposta:
      'Nosso cronograma padrão de atendimento é estruturado em:<br/><br/>• <b>Orçamento:</b> Emissão em até 2 dias úteis.<br/>• <b>Fabricação:</b> Conclusão em 30 dias após a aprovação final do projeto e sinal financeiro.<br/>• <b>Entrega:</b> Prazo estimado de 35 dias totais, podendo variar de acordo com a complexidade logística do local de destino.',
  },
  {
    id: 'faq-3',
    categoria: 'Garantia e Suporte',
    pergunta: 'Como funciona a garantia e assistência técnica?',
    resposta:
      'Todos os nossos equipamentos acompanham <b>12 meses de Garantia</b> de fábrica contra defeitos de fabricação.<br/><br/>Dispomos de uma rede de <b>Assistência Técnica</b> altamente capacitada que atua sob os rigorosos níveis de SLA de atendimento:<br/>• Resposta em 24h, 48h ou 72h (dependendo da localidade e criticidade do evento).',
  },
  {
    id: 'faq-4',
    categoria: 'Especificações Técnicas',
    pergunta: 'Quais gases refrigerantes são utilizados nos equipamentos?',
    resposta:
      'Empregamos circuitos frigoríficos otimizados utilizando os seguintes fluidos homologados:<br/>• <b>R290:</b> Gás natural ecológico de alta eficiência energética, ideal para sustentabilidade.<br/>• <b>R134A:</b> Utilizado como padrão em aplicações de refrigeração comercial leve.<br/>• <b>R404A:</b> Fluido consagrado para sistemas que exigem alto desempenho de congelamento.',
  },
  {
    id: 'faq-5',
    categoria: 'Especificações Técnicas',
    pergunta: 'Como funciona o processo de instalação?',
    resposta:
      'Para garantir a máxima performance, oferecemos duas vertentes de implantação:<br/><br/>1. <b>Instalação Premium:</b> Realizada in-loco por nossos técnicos diretos, contemplando o comissionamento completo.<br/>2. <b>Instalação de Catálogo:</b> Fornecimento de diretrizes rigorosas, esquemas técnicos e manuais para ser executada por equipe de engenharia/manutenção homologada pelo próprio cliente.',
  },
  {
    id: 'faq-6',
    categoria: 'Serviços Adicionais',
    pergunta: 'A Vittorio oferece opcionais, customizações e financiamento?',
    resposta:
      'Absolutamente. A flexibilidade é um de nossos pilares.<br/><br/>• <b>Opcionais Disponíveis:</b> Adição de prateleiras, diferentes espectros de iluminação LED e upgrades de controladoras.<br/>• <b>Customizações:</b> Adaptação dimensional e acabamentos (como Inox PVD, cores exclusivas) para alinhar-se perfeitamente ao seu projeto de arquitetura.<br/>• <b>Financiamento:</b> Estruturamos planos de pagamento flexíveis e auxiliamos em processos de linhas de crédito como cartão BNDES para viabilizar sua modernização.',
  },
]

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const { data, error } = await supabase.from('faq').select('*')
        if (error || !data || data.length === 0) {
          setFaqs(FALLBACK_FAQS)
        } else {
          setFaqs(data as FAQItem[])
        }
      } catch (err) {
        setFaqs(FALLBACK_FAQS)
      } finally {
        setLoading(false)
      }
    }
    fetchFaqs()
  }, [])

  const groupedFaqs = useMemo(() => {
    return faqs.reduce(
      (acc, faq) => {
        if (!acc[faq.categoria]) acc[faq.categoria] = []
        acc[faq.categoria].push(faq)
        return acc
      },
      {} as Record<string, FAQItem[]>,
    )
  }, [faqs])

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <SEO
        title="FAQ - Dúvidas Frequentes | Vittorio Design"
        description="Encontre respostas para as dúvidas mais comuns sobre as linhas comerciais, garantias, prazos logísticos e especificações técnicas da Vittorio Design."
      />
      <div className="container max-w-4xl">
        <div className="mb-12 opacity-0 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full border border-primary/20">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-white">Dúvidas Frequentes</h1>
          </div>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            Consulte informações detalhadas sobre nossas linhas comerciais, processos de fabricação,
            logística, especificações técnicas e suporte especializado.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div
            className="space-y-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {Object.entries(groupedFaqs).map(([categoria, items]) => (
              <section key={categoria} className="space-y-6">
                <h2 className="text-2xl font-serif text-white border-b border-white/10 pb-4">
                  {categoria}
                </h2>
                <Accordion type="multiple" className="space-y-4">
                  {items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="bg-card border border-white/5 px-6 data-[state=open]:border-primary/30 transition-colors"
                    >
                      <AccordionTrigger className="text-left text-white hover:text-primary hover:no-underline font-serif text-lg py-6">
                        {item.pergunta}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-6 text-base">
                        <div dangerouslySetInnerHTML={{ __html: item.resposta }} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
