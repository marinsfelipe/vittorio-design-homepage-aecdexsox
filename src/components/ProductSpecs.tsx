import { Ruler, Thermometer, Zap, CheckCircle2, PlusCircle, Snowflake } from 'lucide-react'

interface ProductSpecsProps {
  product: any
  specs: any
  items: string[]
  options: string[]
}

export function ProductSpecs({ product, specs, items, options }: ProductSpecsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 border border-white/5 flex items-start gap-4">
          <Ruler className="w-6 h-6 text-primary shrink-0 mt-1" />
          <div>
            <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">
              Dimensões (L×P×A)
            </span>
            <span className="text-lg text-white font-medium">
              {product.dimensoes_l}cm × {product.dimensoes_p}cm × {product.dimensoes_a}cm
            </span>
          </div>
        </div>

        <div className="bg-card p-6 border border-white/5 space-y-4">
          <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-3">
            Especificações Técnicas
          </span>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Snowflake className="w-4 h-4" /> Refrigeração
              </span>
              <span className="text-sm text-white">{specs.refrigeracao || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Thermometer className="w-4 h-4" /> Temperatura
              </span>
              <span className="text-sm text-white">{specs.temperatura || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4" /> Consumo
              </span>
              <span className="text-sm text-white">{specs.consumo || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
        <div>
          <h3 className="text-lg font-serif text-white uppercase tracking-wider mb-6 border-b border-primary/20 pb-3">
            Itens de Série
          </h3>
          <ul className="space-y-4">
            {items.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-light leading-snug">{item}</span>
              </li>
            ))}
            {items.length === 0 && (
              <li className="text-sm text-muted-foreground font-light">Nenhum item informado.</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-serif text-white uppercase tracking-wider mb-6 border-b border-white/10 pb-3">
            Opcionais Disponíveis
          </h3>
          <ul className="space-y-4">
            {options.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <PlusCircle className="w-5 h-5 text-muted-foreground shrink-0" />
                <span className="text-sm font-light leading-snug">{item}</span>
              </li>
            ))}
            {options.length === 0 && (
              <li className="text-sm text-muted-foreground font-light">Nenhum item informado.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
