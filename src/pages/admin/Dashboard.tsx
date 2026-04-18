import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, Star, Rss, Activity, Loader2 } from 'lucide-react'
import pb from '@/lib/pocketbase/client'
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

type DashboardData = {
  productsCount: number
  promotionsCount: number
  postsCount: number
  apiRequestsCount: number
  recentLogs: any[]
}

const formatToSaoPaulo = (dateStr: string) => {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(new Date(dateStr))
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!pb.authStore.isValid) {
      navigate('/admin/login')
      return
    }

    async function fetchDashboardData() {
      try {
        const [productsRes, promotionsRes, postsRes, requestsRes, logsList] = await Promise.all([
          pb.collection('products').getList(1, 1, { filter: 'is_deleted = false' }),
          pb
            .collection('promotions')
            .getList(1, 1, { filter: 'is_deleted = false && is_active = true' }),
          pb
            .collection('posts')
            .getList(1, 1, { filter: 'is_deleted = false && is_published = true' }),
          pb.collection('api_request_log').getList(1, 1),
          pb.collection('audit_log').getList(1, 5, { sort: '-created' }),
        ])

        setData({
          productsCount: productsRes.totalItems,
          promotionsCount: promotionsRes.totalItems,
          postsCount: postsRes.totalItems,
          apiRequestsCount: requestsRes.totalItems,
          recentLogs: logsList.items,
        })
      } catch (error) {
        console.error('Error fetching dashboard data', error)
        if ((error as any).status === 401) {
          pb.authStore.clear()
          navigate('/admin/login')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [navigate])

  if (loading || !data) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  // Placeholder chart data since order logic is abstracted
  const chartData = [
    { label: 'Jan', value: 120 },
    { label: 'Fev', value: 210 },
    { label: 'Mar', value: 180 },
    { label: 'Abr', value: 340 },
    { label: 'Mai', value: 280 },
  ]

  return (
    <div className="container py-12 space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-serif text-white mb-2">Painel de Controle</h1>
        <p className="text-muted-foreground font-light text-sm">
          Visão geral da infraestrutura e conteúdo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-white/5 rounded-none transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              Produtos Ativos
            </CardTitle>
            <Package className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif text-white">{data.productsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">No catálogo atual</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5 rounded-none hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              Promoções
            </CardTitle>
            <Star className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif text-white">{data.promotionsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Campanhas ativas</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5 rounded-none hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              Blog Posts
            </CardTitle>
            <Rss className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif text-white">{data.postsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Artigos publicados</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5 rounded-none hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
              API Traffic
            </CardTitle>
            <Activity className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif text-white">{data.apiRequestsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Requisições processadas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card border-white/5 rounded-none">
          <CardHeader className="border-b border-white/5 bg-white/[0.02] pb-4">
            <CardTitle className="text-lg font-serif text-white">Atividade Estimada</CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <ChartContainer
              config={{
                value: { label: 'Acessos', color: 'hsl(var(--primary))' },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="hsl(var(--border)/0.5)" />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#888' }}
                  />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#888' }} />
                  <ChartTooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-white/5 rounded-none">
          <CardHeader className="border-b border-white/5 bg-white/[0.02] pb-4">
            <CardTitle className="text-lg font-serif text-white">
              Log de Auditoria Recente
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-xs uppercase tracking-widest text-muted-foreground">
                    Ação
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-widest text-muted-foreground">
                    Entidade
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-widest text-muted-foreground text-right">
                    Data (SP)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentLogs.map((log) => (
                  <TableRow
                    key={log.id}
                    className="border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="py-4">
                      <Badge
                        variant="outline"
                        className={`rounded-none ${log.action === 'DELETE' ? 'text-red-400 border-red-400/20 bg-red-400/10' : 'text-primary border-primary/20 bg-primary/10'}`}
                      >
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 font-mono text-xs text-muted-foreground">
                      {log.entity_type}
                    </TableCell>
                    <TableCell className="text-right py-4 text-xs text-muted-foreground">
                      {formatToSaoPaulo(log.created)}
                    </TableCell>
                  </TableRow>
                ))}
                {data.recentLogs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                      Nenhum registro encontrado.
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
