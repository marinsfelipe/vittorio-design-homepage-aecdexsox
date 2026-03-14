import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Ruler,
  Thermometer,
  Zap,
  CheckCircle2,
  PlusCircle,
  Share2,
  Snowflake,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const mockProductDetails = {
  id: 'v1',
  code: 'VD.EX.VTR.001.00',
  name: 'Vitrine Torre Cristal',
  category: 'Vitrines',
  description:
    'A quintessência da exposição de luxo. Desenvolvida com vidros extra-clear e estrutura robusta em aço inox escovado, esta vitrine maximiza a visibilidade dos seus produtos mantendo um rigoroso controle térmico e elegância incomparável.',
  dimensions: '60cm × 60cm × 180cm',
  specs: {
    refrigeracao: 'Ar Forçado Dinâmico',
    temperatura: '+2°C a +8°C',
    consumo: '0.45 kWh',
  },
  standardItems: [
    'Iluminação LED 4000K em todos os níveis',
    'Vidros duplos com gás argônio antivapor',
    'Prateleiras em vidro temperado 8mm',
    'Controlador digital touch-screen',
    'Estrutura integral em aço inox 304',
  ],
  optionalItems: [
    'Acabamento premium em PVD Gold ou Black',
    'Rodízios embutidos de alta resistência',
    'Fechadura magnética invisível',
    'Sistema de umidificação ativa',
  ],
  image: 'https://img.usecurling.com/p/1200/1600?q=luxury%20glass%20display%20cabinet&color=black',
}

export default function Produto() {
  const { id } = useParams()
  // In a real application, we would fetch the specific product data based on the ID.
  // Using the mock data for demonstration purposes.
  const product = { ...mockProductDetails, id: id || mockProductDetails.id }

  const handleWhatsAppShare = () => {
    const url = window.location.href
    const text = `Confira este produto incrível da Vittorio Design: ${product.name} - ${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const handleQuoteRequest = () => {
    const text = `Olá, gostaria de solicitar um orçamento para o produto: ${product.name} (Código: ${product.code}).`
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <div className="container">
        <Link
          to="/catalogo"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors uppercase tracking-widest opacity-0 animate-fade-in-up"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Hero Image Section */}
          <div
            className="lg:col-span-5 relative opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="sticky top-32">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted/20 border border-white/5 p-4 lg:p-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent z-10"></div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center shadow-2xl relative z-0"
                />
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div
            className="lg:col-span-7 space-y-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Badge
                  variant="outline"
                  className="text-primary border-primary/30 tracking-widest uppercase rounded-none px-3 py-1 bg-primary/5"
                >
                  {product.code}
                </Badge>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {product.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Technical Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 border border-white/5 flex items-start gap-4">
                <Ruler className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Dimensões (L×P×A)
                  </span>
                  <span className="text-lg text-white font-medium">{product.dimensions}</span>
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
                    <span className="text-sm text-white">{product.specs.refrigeracao}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Thermometer className="w-4 h-4" /> Temperatura
                    </span>
                    <span className="text-sm text-white">{product.specs.temperatura}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Consumo
                    </span>
                    <span className="text-sm text-white">{product.specs.consumo}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
              <div>
                <h3 className="text-lg font-serif text-white uppercase tracking-wider mb-6 border-b border-primary/20 pb-3">
                  Itens de Série
                </h3>
                <ul className="space-y-4">
                  {product.standardItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm font-light leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-serif text-white uppercase tracking-wider mb-6 border-b border-white/10 pb-3">
                  Opcionais Disponíveis
                </h3>
                <ul className="space-y-4">
                  {product.optionalItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <PlusCircle className="w-5 h-5 text-muted-foreground shrink-0" />
                      <span className="text-sm font-light leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button
                onClick={handleQuoteRequest}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 text-sm tracking-widest uppercase transition-all duration-300 active:scale-[0.98]"
              >
                Solicitar Orçamento
              </Button>
              <Button
                onClick={handleWhatsAppShare}
                variant="outline"
                className="flex-1 border-white/20 text-white bg-transparent hover:bg-white/5 rounded-none h-14 text-sm tracking-widest uppercase transition-all duration-300"
              >
                <Share2 className="w-4 h-4 mr-2" /> Compartilhar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
