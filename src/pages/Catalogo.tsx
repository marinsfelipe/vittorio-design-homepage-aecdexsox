import { ArrowRight } from 'lucide-react'

export default function Catalogo() {
  const products = [
    {
      id: 1,
      name: 'Mesa de Centro Áurea',
      category: 'Mesas',
      material: 'Inox Escovado & Vidro Tonalizado',
      img: 'https://img.usecurling.com/p/800/800?q=luxury%20coffee%20table&color=black',
    },
    {
      id: 2,
      name: 'Poltrona Nero',
      category: 'Assentos',
      material: 'Aço Carbono & Couro Natural',
      img: 'https://img.usecurling.com/p/800/1000?q=luxury%20armchair&color=black',
    },
    {
      id: 3,
      name: 'Aparador Vértice',
      category: 'Armazenamento',
      material: 'Inox Polido & Mármore Nero',
      img: 'https://img.usecurling.com/p/800/800?q=luxury%20sideboard&color=black',
    },
    {
      id: 4,
      name: 'Luminária Eclipse',
      category: 'Iluminação',
      material: 'Latão Envelhecido & Inox',
      img: 'https://img.usecurling.com/p/800/1200?q=modern%20pendant%20light&color=black',
    },
    {
      id: 5,
      name: 'Mesa de Jantar Domus',
      category: 'Mesas',
      material: 'Inox Escovado & Madeira Maciça',
      img: 'https://img.usecurling.com/p/800/800?q=luxury%20dining%20table&color=black',
    },
    {
      id: 6,
      name: 'Cadeira Ligna',
      category: 'Assentos',
      material: 'Estrutura em Inox Metálico',
      img: 'https://img.usecurling.com/p/800/800?q=modern%20dining%20chair&color=black',
    },
    {
      id: 7,
      name: 'Estante Prisma',
      category: 'Armazenamento',
      material: 'Aço Pintura Epóxi Preta',
      img: 'https://img.usecurling.com/p/800/1000?q=luxury%20bookshelf&color=black',
    },
    {
      id: 8,
      name: 'Mesa Lateral Orbis',
      category: 'Mesas',
      material: 'Inox Polido Ouro',
      img: 'https://img.usecurling.com/p/800/800?q=small%20side%20table&color=black',
    },
  ]

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <div className="container">
        {/* Header */}
        <div className="mb-16 md:mb-24 max-w-2xl opacity-0 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Nosso Catálogo</h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light">
            Explore nossa coleção de peças exclusivas. Cada item é concebido com a precisão do
            design contemporâneo e a solidez de materiais impecáveis.
          </p>
        </div>

        {/* Grid */}
        <div
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden bg-card rounded-sm"
            >
              <div className="relative overflow-hidden w-full">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8 border-b-4 border-transparent group-hover:border-primary">
                  <span className="text-primary text-xs tracking-[0.2em] uppercase mb-2 block transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                    {product.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                    {product.material}
                  </p>

                  <div className="flex items-center text-sm font-medium text-primary transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-200 uppercase tracking-widest">
                    Saiba Mais <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
