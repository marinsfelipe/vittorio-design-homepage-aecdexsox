import { MapPin } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function PartnerMap() {
  const partners = [
    { id: 1, region: 'São Paulo (SP)', name: 'TechRefrig Premium SP', x: '50%', y: '60%' },
    { id: 2, region: 'Rio de Janeiro (RJ)', name: 'Carioca Frio Serviços', x: '65%', y: '50%' },
    { id: 3, region: 'Minas Gerais (MG)', name: 'Minas Clima Refrigeração', x: '55%', y: '40%' },
    { id: 4, region: 'Paraná (PR)', name: 'Sul Refrigeração Especializada', x: '40%', y: '75%' },
    { id: 5, region: 'Brasília (DF)', name: 'Capital Frio', x: '58%', y: '30%' },
    { id: 6, region: 'Bahia (BA)', name: 'Nordeste Climatização', x: '70%', y: '25%' },
  ]

  return (
    <div className="bg-card border border-white/5 p-6 rounded-none relative">
      <div className="aspect-[16/9] md:aspect-[21/9] bg-muted/20 relative overflow-hidden border border-white/5">
        <img
          src="https://img.usecurling.com/p/1200/600?q=abstract%20topographic%20map&color=black"
          alt="Mapa de Parceiros"
          loading="lazy"
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />

        <TooltipProvider>
          {partners.map((partner) => (
            <Tooltip key={partner.id} delayDuration={100}>
              <TooltipTrigger asChild>
                <div
                  className="absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center cursor-pointer group"
                  style={{ left: partner.x, top: partner.y }}
                >
                  <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping group-hover:bg-primary/50" />
                  <MapPin className="w-5 h-5 text-primary relative z-10 group-hover:scale-125 transition-transform" />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-card border border-white/10 text-white rounded-none p-4 shadow-xl z-50"
              >
                <p className="font-serif text-lg mb-1">{partner.region}</p>
                <p className="text-sm text-primary uppercase tracking-widest">{partner.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      <div className="mt-8 flex flex-wrap gap-4 md:gap-6 justify-center">
        {partners.map((p) => (
          <div
            key={p.id}
            className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2 bg-white/5 px-3 py-1.5 border border-white/10"
          >
            <MapPin className="w-3.5 h-3.5 text-primary" /> {p.region}
          </div>
        ))}
      </div>
    </div>
  )
}
