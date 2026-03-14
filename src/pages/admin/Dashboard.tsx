import { useState, useEffect, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { FileText, MessageCircle, Download, Users, Wrench, TrendingUp, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type DashboardData = {
  quotes: any[]
  contactsCount: number
  downloadsCount: number
  customersCount: number
  ticketsCount: number
  ordersByStatus: any[]
  topProducts: any[]
}

export default function AdminDashboard() {
  const { session } = useOutletContext<{ session: any }>()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [quoteFilter, setQuoteFilter] = useState<'month' | 'year' | 'all'>('month')

  useEffect(() => {
    if (session?.user?.email) {
      supabase
        .from('admin_logs')
        .insert({
          user_email: session.user.email,
          action_performed: 'Acesso ao Dashboard',
        })
        .then()
    }

    async function fetchDashboardData() {
      try {
        const [
          { data: quotesData },
          { count: contactsCount },
          { count: downloadsCount },
          { count: customersCount },
          { count: ticketsCount },
          { data: ordersData },
          { data: topProductsData },
        ] = await Promise.all([
          supabase.from('orcamentos_customizados').select('criado_em'),
          supabase.from('contatos').select('*', { count: 'exact', head: true }),
          supabase
            .from('analytics_events')
            .select('*', { count: 'exact', head: true })
            .eq('event_name', 'catalog_download'),
          supabase.from('clientes').select('*', { count: 'exact', head: true }),
          supabase.from('chamados_assistencia').select('*', { count: 'exact', head: true }),
          supabase.from('pedidos').select('status_pagamento, total'),
          supabase
            .from('produtos')
            .select('nome, codigo, views_count')
            .order('views_count', { ascending: false })
            .limit(5),
        ])

        const orderStats = (ordersData || []).reduce((acc: any, order) => {
          const status = order.status_pagamento || 'pending'
          if (!acc[status]) acc[status] = 0
          acc[status] += order.total || 0
          return acc
        }, {})

        const chartData = [
          { status: 'Pendente', value: orderStats['pending'] || 0, fill: 'hsl(var(--muted))' },
          { status: 'Pago', value: orderStats['paid'] || 0, fill: 'hsl(var(--primary))' },
          { status: 'Enviado', value: orderStats['shipped'] || 0, fill: '#3b82f6' },
          { status: 'Entregue', value: orderStats['delivered'] || 0, fill: '#22c55e' },
        ]

        setData({
          quotes: quotesData || [],
          contactsCount: contactsCount || 0,
          downloadsCount: downloadsCount || 0,
          customersCount: customersCount || 0,
          ticketsCount: ticketsCount || 0,
          ordersByStatus: chartData,
          topProducts: topProductsData || [],
        })
      } catch (error) {
        console.error('Error fetching dashboard data', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [session])

  const filteredQuotesCount = useMemo(() => {
    if (!data) return 0
    const now = new Date()
    return data.quotes.filter((q) => {
      if (!q.criado_em) return false
      const qDate = new Date(q.criado_em)
      if (quoteFilter === 'month') {
        return qDate.getMonth() === now.getMonth() && qDate.getFullYear() === now.getFullYear()
      } else if (quoteFilter === 'year') {
        return qDate.getFullYear() === now.getFullYear()
      }
      return true
    }).length
  }, [data, quoteFilter])

  if (loading || !data) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const formatPrice = (v: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      compactDisplay: 'short',
      notation: 'compact',
    }).format(v)

  return (
    <div className="container py-12 space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-serif text-white mb-2">Visão Executiva</h1>
        <p className="text-muted-foreground font-light text-sm">
          Métricas consolidadas de engajamento e vendas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-white/5 rounded-none transition-colors">
          <CardHeader className="flex flex-col space-y-4 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Orçamentos
              </CardTitle>
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <ToggleGroup
              type="single"
              value={quoteFilter}
              onValueChange={(v) => v && setQuoteFilter(v as any)}
              className="justify-start gap-2"
            >
              <ToggleGroupItem
                value="month"
                className="h-6 px-2 text-[10px] uppercase tracking-wider rounded-none data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                Mês
              </ToggleGroupItem>
              <ToggleGroupItem
                value="year"
                className="h-6 px-2 text-[10px] uppercase tracking-wider rounded-none data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                Ano
              </ToggleGroupItem>
              <ToggleGroupItem
                value="all"
                className="h-6 px-2 text-[10px] uppercase tracking-wider rounded-none data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                Tudo
              </ToggleGroupItem>
            </ToggleGroup>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-serif text-white">{filteredQuotesCount}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              Solicitações{' '}
              {quoteFilter === 'month'
                ? 'neste mês'
                : quoteFilter === 'year'
                  ? 'neste ano'
                  : 'no total'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5 rounded-none hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              Contatos
            </CardTitle>
            <MessageCircle className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif text-white">{data.contactsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Formulários preenchidos</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5 rounded-none hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              Downloads
            </CardTitle>
            <Download className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif text-white">{data.downloadsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Catálogos baixados</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5 rounded-none hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              Operacional
            </CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div>
                <div className="text-2xl font-serif text-white">{data.customersCount}</div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                  Clientes
                </p>
              </div>
              <div className="w-px bg-white/10 my-1"></div>
              <div>
                <div className="text-2xl font-serif text-white flex items-center gap-2">
                  {data.ticketsCount}
                  {data.ticketsCount > 0 && <Wrench className="w-4 h-4 text-yellow-500" />}
                </div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                  Chamados
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card border-white/5 rounded-none">
          <CardHeader className="border-b border-white/5 bg-white/[0.02] pb-4">
            <CardTitle className="text-lg font-serif text-white">
              Receita por Status (E-commerce)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <ChartContainer
              config={{
                value: { label: 'Receita', color: 'hsl(var(--primary))' },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.ordersByStatus}
                  margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} stroke="hsl(var(--border)/0.5)" />
                  <XAxis
                    dataKey="status"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#888' }}
                  />
                  <YAxis
                    tickFormatter={formatPrice}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#888' }}
                  />
                  <ChartTooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5 rounded-none">
          <CardHeader className="border-b border-white/5 bg-white/[0.02] pb-4">
            <CardTitle className="text-lg font-serif text-white">
              Produtos Mais Visualizados
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-xs uppercase tracking-widest text-muted-foreground">
                    Produto
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-widest text-muted-foreground text-right">
                    Visualizações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topProducts.map((prod) => (
                  <TableRow
                    key={prod.codigo}
                    className="border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="py-4">
                      <div className="font-serif text-white mb-1">{prod.nome}</div>
                      <div className="text-xs font-mono text-muted-foreground uppercase">
                        {prod.codigo}
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20 rounded-none"
                      >
                        {prod.views_count || 0}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {data.topProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-8 text-muted-foreground">
                      Nenhum dado disponível.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
