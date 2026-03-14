import { useState } from 'react'
import { Search, Package, Calendar, DollarSign, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/hooks/use-toast'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

export default function Rastreio() {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [orders, setOrders] = useState<any[]>([])
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setLoading(true)
    setHasSearched(false)
    setOrders([])

    try {
      const q = searchTerm.trim()
      const [byEmail, byPhone] = await Promise.all([
        supabase.from('pedidos').select('*').eq('cliente_email', q),
        supabase.from('pedidos').select('*').eq('cliente_telefone', q),
      ])

      if (byEmail.error) throw byEmail.error
      if (byPhone.error) throw byPhone.error

      const allData = [...(byEmail.data || []), ...(byPhone.data || [])]
      const uniqueOrders = Array.from(new Map(allData.map((o) => [o.id, o])).values()).sort(
        (a, b) => new Date(b.criado_em).getTime() - new Date(a.criado_em).getTime(),
      )

      setOrders(uniqueOrders)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro na busca',
        description: 'Não foi possível buscar seus pedidos no momento.',
      })
    } finally {
      setLoading(false)
      setHasSearched(true)
    }
  }

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p)

  const statusMap: Record<string, string> = {
    pending: 'Aguardando Pagamento',
    paid: 'Processando',
    shipped: 'Enviado',
    delivered: 'Entregue',
  }

  const statusColorMap: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-500',
    paid: 'bg-blue-500/10 text-blue-500',
    shipped: 'bg-indigo-500/10 text-indigo-500',
    delivered: 'bg-green-500/10 text-green-500',
  }

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <div className="container max-w-4xl">
        <div className="mb-12 text-center opacity-0 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Rastrear Pedido</h1>
          <div className="h-px w-24 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground font-light">
            Acompanhe o status da sua compra utilizando seu e-mail ou telefone cadastrado.
          </p>
        </div>

        <Card
          className="bg-card border-white/5 p-6 md:p-8 mb-12 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="E-mail ou Telefone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-white/10 text-white rounded-none h-14 focus-visible:ring-primary focus-visible:border-primary text-base"
            />
            <Button
              type="submit"
              disabled={loading || !searchTerm.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 px-8 tracking-widest uppercase transition-all duration-300"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" /> Rastrear Pedido
                </>
              )}
            </Button>
          </form>
        </Card>

        {loading && (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-64 w-full bg-white/5 rounded-none" />
            ))}
          </div>
        )}

        {!loading && hasSearched && orders.length === 0 && (
          <div className="text-center py-20 bg-card border border-white/5 opacity-0 animate-fade-in-up">
            <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-6" />
            <h3 className="text-2xl font-serif text-white mb-3">
              Nenhum pedido encontrado com os dados informados.
            </h3>
            <p className="text-muted-foreground font-light max-w-md mx-auto">
              Verifique se o e-mail ou telefone foram digitados corretamente. Caso precise de ajuda,
              entre em contato com nosso suporte.
            </p>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div
            className="space-y-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {orders.map((order) => (
              <Card
                key={order.id}
                className="bg-card border-white/5 overflow-hidden rounded-none hover:border-white/10 transition-colors"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/5">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                        Pedido
                      </span>
                      <span className="text-xl font-serif text-white">
                        #{order.id.split('-')[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 md:gap-10">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                          Data
                        </span>
                        <span className="text-sm text-white flex items-center gap-2 font-light">
                          <Calendar className="w-4 h-4 text-primary/70" />
                          {format(new Date(order.criado_em), "dd 'de' MMMM, yyyy", {
                            locale: ptBR,
                          })}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                          Total
                        </span>
                        <span className="text-base text-white font-serif flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-primary/70" />
                          {formatPrice(order.total)}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          'uppercase tracking-widest text-[10px] rounded-none px-4 py-2 border-transparent',
                          statusColorMap[order.status_pagamento] || 'bg-white/10 text-white',
                        )}
                      >
                        {statusMap[order.status_pagamento] || order.status_pagamento}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground mb-5 block">
                      Itens do Pedido
                    </span>
                    <div className="space-y-4">
                      {order.itens_json.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 bg-muted/5 border border-white/5"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-black/40 shrink-0 flex items-center justify-center border border-white/5">
                              <span className="text-sm text-primary font-serif">
                                {item.quantidade}x
                              </span>
                            </div>
                            <div>
                              <span className="text-base font-serif text-white block mb-1">
                                {item.nome}
                              </span>
                              {item.codigo && (
                                <span className="text-xs text-muted-foreground uppercase font-mono tracking-wider">
                                  {item.codigo}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-base font-serif text-white">
                            {formatPrice(
                              (item.preco_unitario || item.preco || 0) * item.quantidade,
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
