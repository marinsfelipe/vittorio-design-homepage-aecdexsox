import { useState, useEffect } from 'react'
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
  Loader2,
  ShoppingCart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { useCart } from '@/hooks/useCart'
import { SEO } from '@/components/SEO'
import { trackEvent } from '@/lib/analytics'

const fallbackProductDetails = {
  id: 'p1000000-0000-0000-0000-000000000002',
  codigo: 'VD.EX.VTR.001',
  nome: 'Vitrine Torre Cristal',
  familias: { nome: 'Vitrines' },
  dimensoes_l: 60,
  dimensoes_p: 60,
  dimensoes_a: 180,
  especificacoes_json: {
    refrigeracao: 'Ar Forçado Dinâmico',
    temperatura: '+2°C a +8°C',
    consumo: '0.45 kWh',
  },
  itens_serie_json: [
    'Iluminação LED 4000K em todos os níveis',
    'Vidros duplos com gás argônio antivapor',
    'Prateleiras em vidro temperado 8mm',
    'Controlador digital touch-screen',
    'Estrutura integral em aço inox 304',
  ],
  opcionais_json: [
    'Acabamento premium em PVD Gold ou Black',
    'Rodízios embutidos de alta resistência',
    'Fechadura magnética invisível',
    'Sistema de umidificação ativa',
  ],
  imagem_url:
    'https://img.usecurling.com/p/1200/1600?q=luxury%20glass%20display%20cabinet&color=black',
  preco: 12500,
  disponivel_ecommerce: true,
}

export default function Produto() {
  const { id } = useParams()
  const { toast } = useToast()
  const { addToCart, isAdding } = useCart()
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRequesting, setIsRequesting] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from('produtos')
          .select('*, familias(nome)')
          .eq('id', id)
          .single()

        if (error || !data) throw new Error('Fallback')
        setProduct(data)

        await supabase.rpc('increment_product_view', { product_id: id }).catch(() => {})
      } catch (err) {
        setProduct({ ...fallbackProductDetails, id: id || fallbackProductDetails.id })
      } finally {
        setIsLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  useEffect(() => {
    if (product && !isLoading) {
      trackEvent('view_item', {
        currency: 'BRL',
        value: product.preco || 0,
        items: [
          {
            item_id: product.id,
            item_name: product.nome,
            price: product.preco || 0,
            item_category: product.familias?.nome || '',
          },
        ],
      })
    }
  }, [product, isLoading])

  if (isLoading) {
    return (
      <div className="w-full pt-32 pb-24 bg-background min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="w-full pt-32 pb-24 bg-background min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif text-white mb-4">Produto não encontrado</h2>
        <Link to="/catalogo">
          <Button variant="outline" className="border-white/20 text-white">
            Voltar ao Catálogo
          </Button>
        </Link>
      </div>
    )
  }

  const handleWhatsAppShare = () => {
    trackEvent('whatsapp_click', {
      context: 'product_page',
      product_id: product.id,
      product_name: product.nome,
    })
    const url = window.location.href
    const text = `Confira este produto incrível da Vittorio Design: ${product.nome} - ${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const handleQuoteRequest = async () => {
    const l = product.dimensoes_l || 0
    const p = product.dimensoes_p || 0
    const a = product.dimensoes_a || 0
    const dimensoesStr = `${l}x${p}x${a}mm`

    setIsRequesting(true)
    try {
      const { error } = await supabase.functions.invoke('request-quote', {
        body: {
          product: {
            nome: product.nome,
            codigo: product.codigo,
            dimensoes: dimensoesStr,
          },
          target_phone: '+5521990451568',
          message: `Olá! Gostaria de um orçamento para o produto: ${product.nome} (Código: ${product.codigo}). Dimensões: ${dimensoesStr}.`,
        },
      })

      if (error) throw error

      trackEvent('generate_lead', { form_name: 'quote_request', product_id: product.id })
      toast({
        title: 'Solicitação enviada!',
        description: 'Sua solicitação de orçamento foi enviada com sucesso.',
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Erro ao enviar',
        description: 'Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.',
      })
    } finally {
      setIsRequesting(false)
    }
  }

  const specs = product.especificacoes_json || {}
  const items = Array.isArray(product.itens_serie_json) ? product.itens_serie_json : []
  const options = Array.isArray(product.opcionais_json) ? product.opcionais_json : []
  const productDescription = `Conheça ${product.nome}. Peça exclusiva da Vittorio Design desenvolvida com precisão e materiais nobres.`

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <SEO
        title={`${product.nome} | Vittorio Design`}
        description={productDescription}
        image={product.imagem_url}
      />
      <div className="container">
        <Link
          to="/catalogo"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors uppercase tracking-widest opacity-0 animate-fade-in-up"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div
            className="lg:col-span-5 relative opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="sticky top-32">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted/20 border border-white/5 p-4 lg:p-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent z-10"></div>
                <img
                  src={
                    product.imagem_url ||
                    'https://img.usecurling.com/p/1200/1600?q=product&color=black'
                  }
                  alt={product.nome}
                  loading="lazy"
                  className="w-full h-full object-cover object-center shadow-2xl relative z-0"
                />
              </div>
            </div>
          </div>

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
                  {product.codigo}
                </Badge>
                {product.familias && (
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {product.familias.nome}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
                {product.nome}
              </h1>

              {product.disponivel_ecommerce && product.preco != null && (
                <div className="mb-8">
                  <p className="text-3xl lg:text-4xl font-serif text-white">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(product.preco)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 font-light">
                    Em até 12x sem juros no cartão de crédito
                  </p>
                </div>
              )}
            </div>

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
                    <li className="text-sm text-muted-foreground font-light">
                      Nenhum item informado.
                    </li>
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
                    <li className="text-sm text-muted-foreground font-light">
                      Nenhum item informado.
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              {product.disponivel_ecommerce ? (
                <Button
                  onClick={() => addToCart(product.id)}
                  disabled={isAdding === product.id}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 text-sm tracking-widest uppercase transition-all duration-300 active:scale-[0.98]"
                >
                  {isAdding === product.id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Adicionar ao Carrinho
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleQuoteRequest}
                  disabled={isRequesting}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 text-sm tracking-widest uppercase transition-all duration-300 active:scale-[0.98]"
                >
                  {isRequesting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Solicitar Orçamento'
                  )}
                </Button>
              )}
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
