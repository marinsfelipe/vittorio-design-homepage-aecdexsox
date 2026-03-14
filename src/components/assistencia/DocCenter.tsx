import { FileDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function DocCenter() {
  const docs = [
    {
      title: 'Manual de Manutenção',
      desc: 'Instruções completas para conservação, limpeza adequada e boas práticas para prolongar a vida útil do seu equipamento.',
    },
    {
      title: 'Termo de Aceite de Garantia',
      desc: 'Documentação legal com diretrizes e termos de cobertura dos componentes durante o período de garantia de fábrica.',
    },
    {
      title: 'Checklist de Instalação',
      desc: 'Guia passo a passo para preparação do ambiente, validação elétrica e orientações de primeiro uso (Start-up).',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {docs.map((doc, i) => (
        <Card
          key={i}
          className="bg-card border-white/5 rounded-none flex flex-col h-full hover:border-primary/30 transition-colors group cursor-pointer"
        >
          <CardContent className="p-8 flex flex-col items-start flex-1">
            <div className="p-3 bg-primary/10 rounded-full mb-6 text-primary group-hover:scale-110 transition-transform">
              <FileDown className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif text-white mb-3">{doc.title}</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8 flex-1">
              {doc.desc}
            </p>
            <span className="text-primary text-xs tracking-widest uppercase flex items-center mt-auto font-medium">
              Download PDF <FileDown className="w-4 h-4 ml-2" />
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
