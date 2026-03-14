import { useState } from 'react'
import { Share2, Loader2, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import { trackEvent } from '@/lib/analytics'

interface ProductActionsProps {
  product: any
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addToCart, isAdding } = useCart()
  const { toast } = useToast()
  const [isRequesting, setIsRequesting] = useState(false)

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

      trackEvent('quote_request', { form_name: 'quote_request', product_id: product.id })
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

  return (
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
          {isRequesting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Solicitar Orçamento'}
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
  )
}
