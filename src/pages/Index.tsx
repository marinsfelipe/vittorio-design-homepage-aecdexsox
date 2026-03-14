import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ShoppingBag, Wrench, Shield } from 'lucide-react'
import logoPrimary from '../assets/logo-png-ade0b.png'

export default function Index() {
  const features = [
    {
      title: 'Design Premium',
      desc: 'Acabamento impecável em inox e vidro para destacar seus produtos com máxima elegância.',
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: 'Alta Performance',
      desc: 'Sistemas de refrigeração otimizados para eficiência energética e durabilidade extrema.',
      icon: <Wrench className="h-6 w-6" />,
    },
    {
      title: 'Projetos Sob Medida',
      desc: 'Adequação perfeita ao layout e identidade visual exclusiva do seu negócio.',
      icon: <ShoppingBag className="h-6 w-6" />,
    },
  ]

  return (
    <div className="flex flex-col w-full bg-[#050505]">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 via-zinc-950/80 to-zinc-950 z-10" />
        <img
          src="https://img.usecurling.com/p/1920/1080?q=luxury%20bakery%20interior&color=black"
          alt="Vittorio Interior Premium"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />

        <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center pt-24">
          <div className="mb-14 relative group">
            <div className="absolute inset-0 bg-[#D4AF37]/10 blur-3xl rounded-full transition-all duration-700 group-hover:bg-[#D4AF37]/20" />
            <img
              src={logoPrimary}
              alt="Vittorio Logo"
              className="h-44 md:h-60 relative z-10 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000"
            />
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-8 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 leading-tight">
            Criar ambientes{' '}
            <span className="text-[#D4AF37] font-semibold italic">funcionais e elegantes</span> para
            aumento de vendas.
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl mb-14 max-w-2xl font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 leading-relaxed">
            A Vittorio projeta e executa soluções de alto padrão em refrigeração e exposição para o
            varejo, unindo estética premium (Inox & Vidro) e funcionalidade estratégica.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Button
              asChild
              size="lg"
              className="bg-[#D4AF37] hover:bg-[#B8860B] text-zinc-950 font-bold uppercase tracking-[0.15em] rounded-none h-14 px-10 border border-[#D4AF37] transition-all"
            >
              <Link to="/orcamento">
                Solicitar Orçamento <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-100 hover:text-zinc-950 uppercase tracking-[0.15em] rounded-none h-14 px-10 bg-zinc-950/50 backdrop-blur-sm transition-all font-medium"
            >
              <Link to="/catalogo">Explorar Linha Inox</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-32 bg-[#080808] border-t border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4">
              A Diferença Vittorio
            </h2>
            <h3 className="text-3xl md:text-5xl text-zinc-100 font-light tracking-tight">
              Excelência em cada detalhe
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-zinc-950 border border-zinc-900 p-10 hover:border-[#D4AF37]/40 transition-all duration-500 group relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 group-hover:-translate-y-2 group-hover:translate-x-2">
                  <div className="scale-[3]">{feature.icon}</div>
                </div>
                <div className="text-[#D4AF37] mb-8 bg-zinc-900/50 w-16 h-16 flex items-center justify-center rounded-sm border border-zinc-800 group-hover:bg-[#D4AF37]/10 transition-colors">
                  {feature.icon}
                </div>
                <h4 className="text-xl text-zinc-100 font-medium mb-4 tracking-wide">
                  {feature.title}
                </h4>
                <p className="text-zinc-500 leading-relaxed font-light text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Highlight */}
      <section className="py-32 bg-zinc-950">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 border border-[#D4AF37]/20 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
              <img
                src="https://img.usecurling.com/p/800/600?q=stainless%20steel%20luxury%20kitchen&color=black"
                alt="Linha Inox Vittorio"
                className="relative z-10 w-full h-[600px] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4">
                Linha Premium Inox
              </h2>
              <h3 className="text-4xl md:text-5xl text-zinc-100 font-light mb-8 tracking-tight">
                Sofisticação que Vende
              </h3>
              <p className="text-zinc-400 mb-10 leading-relaxed font-light text-lg">
                Nossos equipamentos são projetados não apenas para conservar, mas para valorizar
                seus produtos. A combinação da textura industrial do Inox com iluminação cênica
                transforma seu estabelecimento em um ambiente de alto valor percebido.
              </p>
              <ul className="space-y-6 mb-12">
                {[
                  'Estrutura 100% Inox Escovado de Alta Pureza',
                  'Sistemas de Vidros Curvos Duplos Anti-embaçantes',
                  'Controle Digital Preciso de Temperatura',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-zinc-300 group">
                    <div className="bg-zinc-900 rounded-full p-1 border border-zinc-800 group-hover:border-[#D4AF37] transition-colors">
                      <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" />
                    </div>
                    <span className="font-light tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-zinc-950 uppercase tracking-[0.15em] rounded-none px-10 h-14 font-medium transition-all"
              >
                <Link to="/catalogo">Ver Especificações</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
