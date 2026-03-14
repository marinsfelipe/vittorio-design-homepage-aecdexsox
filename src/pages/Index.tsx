import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Index() {
  const featuredItems = [
    {
      id: 1,
      name: 'Mesa de Jantar Áurea',
      category: 'Mesas',
      img: 'https://img.usecurling.com/p/600/600?q=luxury%20dining%20table&color=black',
    },
    {
      id: 2,
      name: 'Poltrona Nero',
      category: 'Assentos',
      img: 'https://img.usecurling.com/p/600/600?q=luxury%20armchair&color=black',
    },
    {
      id: 3,
      name: 'Luminária Eclipse',
      category: 'Iluminação',
      img: 'https://img.usecurling.com/p/600/600?q=modern%20chandelier&color=black',
    },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://img.usecurling.com/p/1920/1080?q=luxury%20minimalist%20interior&color=black"
            alt="Vittorio Design Interior"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background"></div>
        </div>

        <div className="container relative z-10 text-center px-4 pt-20">
          <div className="max-w-3xl mx-auto opacity-0 animate-fade-in-up">
            <span className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-6 block">
              Exclusividade & Elegância
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
              Design que <br />
              <span className="italic text-primary/90">Transforma</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Peças autorais criadas com maestria. A perfeita harmonia entre o rigor do inox e a
              sofisticação contemporânea.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none px-8 py-6 text-sm tracking-widest uppercase transition-all duration-300 active:scale-95"
            >
              <Link to="/catalogo">
                Explorar Catálogo <ArrowRight className="ml-3 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 bg-background relative">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 border border-primary/20 translate-x-4 translate-y-4 -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <img
                src="https://img.usecurling.com/p/800/1000?q=stainless%20steel%20texture&color=black"
                alt="Detalhe de Material"
                className="w-full aspect-[4/5] object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Nossa Essência</h2>
              <div className="h-px w-24 bg-primary mb-8"></div>
              <div className="space-y-6 text-muted-foreground font-light leading-relaxed text-lg">
                <p>
                  A Vittorio Design nasceu da paixão por formas puras e materiais nobres. Cada peça
                  é um manifesto de luxo silencioso, projetada para transcender tendências e
                  estabelecer-se como atemporal.
                </p>
                <p>
                  Nossos artesãos dominam a arte de moldar o inox, combinando precisão industrial
                  com acabamento manual minucioso, resultando em móveis que são verdadeiras
                  esculturas habitáveis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Preview */}
      <section className="py-24 bg-card border-t border-white/5">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-primary tracking-[0.2em] uppercase text-xs mb-3 block">
                Preview
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-white">Coleção Destaque</h2>
            </div>
            <Link
              to="/catalogo"
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center group"
            >
              Ver Coleção Completa{' '}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Link key={item.id} to="/catalogo" className="group block relative overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 border-b-4 border-transparent group-hover:border-primary">
                  <span className="text-primary text-xs tracking-widest uppercase mb-2 block transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-serif text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                    {item.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
