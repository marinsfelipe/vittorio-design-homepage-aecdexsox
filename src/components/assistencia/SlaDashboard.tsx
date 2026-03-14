import { Clock, AlertTriangle, Activity, Settings2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function SlaDashboard() {
  const slas = [
    {
      time: '24h',
      level: 'Urgente',
      desc: 'Parada total do equipamento ou risco sanitário iminente.',
      icon: AlertTriangle,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
    },
    {
      time: '48h',
      level: 'Médio',
      desc: 'Falha parcial, equipamento operando fora do padrão.',
      icon: Activity,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
    {
      time: '72h',
      level: 'Padrão',
      desc: 'Ajustes estéticos, dúvidas operacionais ou troca de acessórios.',
      icon: Settings2,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {slas.map((sla, i) => {
        const Icon = sla.icon
        return (
          <Card
            key={i}
            className="bg-card border-white/5 rounded-none flex flex-col h-full hover:border-primary/30 transition-colors"
          >
            <CardContent className="p-8 flex flex-col items-center text-center flex-1">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${sla.bg}`}
              >
                <Icon className={`w-8 h-8 ${sla.color}`} />
              </div>
              <h3 className="text-3xl font-serif text-white mb-2">{sla.time}</h3>
              <span className="text-sm uppercase tracking-widest text-primary mb-4 block font-medium">
                {sla.level}
              </span>
              <p className="text-muted-foreground font-light leading-relaxed">{sla.desc}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
