import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function FeaturedPreview() {
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
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 border-b-4 border-transparent group-hover:border-primary">
                <span className="text-primary text-xs tracking-widest uppercase mb-2 block transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  {item.category}
                </span>
                <h3 className="text-xl font-serif text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                  {item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
