import { Shield, Crown, Target, Eye, Diamond, CheckCircle2 } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Card, CardContent } from '@/components/ui/card'

export default function Sobre() {
  const values = ['Qualidade', 'Estética', 'Acabamento', 'Eficiência', 'Durabilidade']
  const founders = [
    {
      name: 'Felipe Marins de Sá Silva',
      role: 'Sócio Fundador',
      img: 'https://img.usecurling.com/ppl/medium?gender=male&seed=15',
    },
    {
      name: 'Wellington dos Santos Lopes Moreira',
      role: 'Sócio Fundador',
      img: 'https://img.usecurling.com/ppl/medium?gender=male&seed=22',
    },
  ]

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <SEO
        title="A Vittorio | Sobre Nós"
        description="Conheça a Vittorio Design. Mais que equipamentos, criamos máquinas de venda com design premium e tecnologia."
      />

      <div className="container">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24 opacity-0 animate-fade-in-up">
          <div className="relative inline-flex items-center justify-center mb-8">
            <Shield className="w-24 h-24 md:w-32 md:h-32 text-white/5 absolute" strokeWidth={1} />
            <Crown className="w-10 h-10 md:w-14 md:h-14 text-primary relative z-10 mb-2" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-8">
            Vittorio, mais que equipamentos... <br />
            <span className="italic text-primary">Máquinas de venda</span>
          </h1>
          <div className="h-px w-24 bg-primary mx-auto"></div>
        </div>

        {/* Competitive Edge / History */}
        <div
          className="mb-24 bg-card border border-white/5 p-8 md:p-12 lg:p-16 text-center opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className="text-2xl md:text-4xl font-serif text-white mb-6 uppercase tracking-widest">
            Produto bonito <span className="text-primary">+</span> robusto e tecnológico
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-3xl mx-auto leading-relaxed">
            Nossa trajetória é marcada pela busca incessante pela perfeição. Unimos a nobreza do aço
            inox a sistemas de alta eficiência para entregar soluções que não apenas preservam e
            expõem, mas elevam o valor percebido de cada item, transformando estabelecimentos em
            verdadeiras referências de mercado.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <Card className="bg-card border-white/5 rounded-none flex flex-col h-full hover:border-primary/30 transition-colors">
            <CardContent className="p-8 flex flex-col items-center text-center flex-1">
              <Target className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-serif text-white mb-4 uppercase tracking-widest">
                Missão
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Criar ambientes funcionais e elegantes para aumento de vendas.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/5 rounded-none flex flex-col h-full hover:border-primary/30 transition-colors">
            <CardContent className="p-8 flex flex-col items-center text-center flex-1">
              <Eye className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-serif text-white mb-4 uppercase tracking-widest">
                Visão
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Ser a principal referência nacional em design e funcionalidade para mobiliário
                comercial premium, expandindo nossa presença nos mercados mais exigentes.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/5 rounded-none flex flex-col h-full hover:border-primary/30 transition-colors">
            <CardContent className="p-8 flex flex-col items-center text-center flex-1">
              <Diamond className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-serif text-white mb-4 uppercase tracking-widest">
                Valores
              </h3>
              <ul className="text-muted-foreground font-light space-y-2 text-left w-full max-w-[160px] mx-auto">
                {values.map((value, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {value}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Founders */}
        <div className="mb-24 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="text-center mb-12">
            <span className="text-primary tracking-[0.2em] uppercase text-xs mb-3 block">
              Liderança
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Nossos Fundadores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {founders.map((founder, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-48 h-48 mb-6 overflow-hidden rounded-full bg-muted border-2 border-white/10 group-hover:border-primary/50 transition-colors duration-500">
                  <img
                    src={founder.img}
                    alt={founder.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-serif text-white mb-2">{founder.name}</h3>
                <p className="text-sm text-primary uppercase tracking-widest">{founder.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Info Footer specific to About page */}
        <div
          className="border-t border-white/10 pt-12 text-center opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-light">
            Vittorio Design Equipamentos Comerciais
          </p>
          <p className="text-xs text-muted-foreground mt-2 font-mono">CNPJ: 24.810.002/0001-04</p>
        </div>
      </div>
    </div>
  )
}
