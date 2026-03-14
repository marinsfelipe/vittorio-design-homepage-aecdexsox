import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowLeft, Loader2, ShoppingBag } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { getSessionId } from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

type CartItem = {
  id: string
  quantidade: number
  produtos: {
    id: string
    nome: string
    codigo: string
    preco: number
    imagem_url: string
    dimensoes_l: number
    dimensoes_p: number
    dimensoes_a: number
  }
}

export default function Carrinho() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    setLoading(true)
    try {
      const sessionId = getSessionId()
      const { data, error } = await supabase
        .from('carrinho')
        .select(`
          id,
          quantidade,
          produtos (
            id, nome, codigo, preco, imagem_url, dimensoes_l, dimensoes_p, dimensoes_a
          )
        `)
        .eq('sessao_id', sessionId)
        .order('criado_em', { ascending: true })

      if (error) throw error
      setItems((data as any).filter((item: any) => item.produtos !== null))
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível carregar seu carrinho.',
      })
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
  }

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setUpdatingId(id)
    try {
      const { error } = await supabase
        .from('carrinho')
        .update({ quantidade: newQuantity })
        .eq('id', id)
      if (error) throw error
      setItems(items.map((item) => (item.id === id ? { ...item, quantidade: newQuantity } : item)))
      toast({ title: 'Carrinho atualizado', description: 'A quantidade do item foi alterada.' })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível atualizar a quantidade.',
      })
    } finally {
      setUpdatingId(null)
    }
  }

  const removeItem = async (id: string) => {
    setUpdatingId(id)
    try {
      const { error } = await supabase.from('carrinho').delete().eq('id', id)
      if (error) throw error
      setItems(items.filter((item) => item.id !== id))
      toast({ title: 'Item removido', description: 'O produto foi removido do seu carrinho.' })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível remover o item.',
      })
    } finally {
      setUpdatingId(null)
    }
  }

  const subtotal = items.reduce(
    (acc, item) => acc + (item.produtos?.preco || 0) * item.quantidade,
    0,
  )
  const freight = 35.0
  const total = subtotal + freight

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <div className="container max-w-6xl">
        <div className="mb-12 opacity-0 animate-fade-in-up">
          <Link
            to="/loja"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Continuar Comprando
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Seu Carrinho</h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-40 w-full bg-white/5 rounded-none" />
              ))}
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-80 w-full bg-white/5 rounded-none" />
            </div>
          </div>
        ) : items.length === 0 ? (
          <div
            className="text-center py-24 bg-card border border-white/5 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-serif text-white mb-4">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-8 font-light">
              Explore nossa loja e adicione itens ao seu carrinho.
            </p>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 py-6 uppercase tracking-widest text-xs"
            >
              <Link to="/loja">Visitar a Loja</Link>
            </Button>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-6 p-6 bg-card border border-white/5 relative group"
                >
                  <div className="w-full sm:w-32 aspect-square bg-muted/20 shrink-0">
                    <img
                      src={
                        item.produtos.imagem_url ||
                        'https://img.usecurling.com/p/200/200?q=product&color=black'
                      }
                      alt={item.produtos.nome}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-serif text-white">{item.produtos.nome}</h3>
                        <p className="text-lg text-white font-serif">
                          {formatPrice(item.produtos.preco * item.quantidade)}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono mb-2 uppercase tracking-wider">
                        {item.produtos.codigo}
                      </p>
                      <p className="text-sm text-muted-foreground font-light mb-4">
                        Dimensões: {item.produtos.dimensoes_l}x{item.produtos.dimensoes_p}x
                        {item.produtos.dimensoes_a}cm
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                          disabled={updatingId === item.id || item.quantidade <= 1}
                          className="p-2 text-muted-foreground hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center text-sm text-white font-medium">
                          {updatingId === item.id ? (
                            <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                          ) : (
                            item.quantidade
                          )}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                          disabled={updatingId === item.id}
                          className="p-2 text-muted-foreground hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={updatingId === item.id}
                        className="text-sm text-muted-foreground hover:text-destructive flex items-center transition-colors uppercase tracking-widest"
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1 bg-card border border-white/5 p-8 sticky top-32">
              <h3 className="text-lg font-serif text-white uppercase tracking-wider mb-6 border-b border-primary/20 pb-4">
                Resumo do Pedido
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span className="font-light">Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span className="font-light">Frete Estimado</span>
                  <span className="text-white">{formatPrice(freight)}</span>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6 mb-8 flex justify-between items-end">
                <span className="text-white uppercase tracking-widest text-sm">Total</span>
                <span className="text-3xl font-serif text-primary">{formatPrice(total)}</span>
              </div>

              {items.length === 0 ? (
                <Button
                  disabled
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 text-sm tracking-widest uppercase transition-all duration-300"
                >
                  Finalizar Compra
                </Button>
              ) : (
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 text-sm tracking-widest uppercase transition-all duration-300"
                >
                  <Link to="/checkout">Finalizar Compra</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
