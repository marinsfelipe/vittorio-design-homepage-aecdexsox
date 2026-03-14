import imgVitrine from '../assets/2e24c779-080b-4564-a911-0596e00c900e.jpg-61c78.jpeg'
import imgBalcao from '../assets/6-gavetas.jpg-8e018.jpeg'
import imgVitrineAmpla from '../assets/143b3642-e342-4dfc-ad5d-d375a442ec51.jpg-8004e.jpeg'

export interface Product {
  id: string
  name: string
  description: string
  category: string
  imageUrl: string
  features: string[]
  dimensions?: string
  price?: number
}

export const categories = ['Vitrines', 'Balcões Refrigerados', 'Adegas', 'Expositores Verticais']

export const products: Product[] = [
  {
    id: '1',
    name: 'Vitrine Expositora Premium',
    description:
      'Vitrine refrigerada de alta qualidade para exposição de doces e sobremesas, com design sofisticado e controle preciso de temperatura.',
    category: 'Vitrines',
    imageUrl: imgVitrine,
    features: [
      'Vidro anti-embaçante',
      'Iluminação LED integrada',
      'Controle de temperatura digital',
    ],
    dimensions: '1000 x 700 x 1300 mm',
    price: 8500,
  },
  {
    id: '2',
    name: 'Balcão Refrigerado 6 Gavetas',
    description:
      'Equipamento robusto em aço inox ideal para armazenamento eficiente e organização impecável em cozinhas profissionais.',
    category: 'Balcões Refrigerados',
    imageUrl: imgBalcao,
    features: ['6 gavetas espaçosas', 'Aço Inox 304 escovado', 'Isolamento térmico reforçado'],
    dimensions: '2000 x 700 x 900 mm',
    price: 12000,
  },
  {
    id: '3',
    name: 'Vitrine Dupla Ampla',
    description:
      'Vitrine de ampla visibilidade com múltiplas prateleiras de vidro, projetada perfeitamente para padarias e confeitarias de alto fluxo.',
    category: 'Vitrines',
    imageUrl: imgVitrineAmpla,
    features: ['Amplo espaço interno', 'Prateleiras de vidro temperado', 'Sistema frost free'],
    dimensions: '1500 x 700 x 1300 mm',
    price: 10500,
  },
  {
    id: '4',
    name: 'Adega Climatizada 150',
    description:
      'Adega profissional de alto padrão com duas zonas de temperatura independentes para preservar diferentes tipos de vinho.',
    category: 'Adegas',
    imageUrl: 'https://img.usecurling.com/p/600/600?q=wine%20fridge',
    features: [
      'Dual Zone de refrigeração',
      'Porta com vidro proteção UV',
      'Prateleiras deslizantes em madeira',
    ],
    dimensions: '600 x 600 x 1800 mm',
    price: 6800,
  },
  {
    id: '5',
    name: 'Expositor Vertical Bebidas',
    description:
      'Expositor vertical com porta de vidro anti-embaçante, perfeitamente dimensionado para autoatendimento rápido de bebidas geladas.',
    category: 'Expositores Verticais',
    imageUrl: 'https://img.usecurling.com/p/600/600?q=beverage%20cooler',
    features: [
      'Iluminação interna contínua',
      'Degelo automático programado',
      'Pés niveladores robustos',
    ],
    dimensions: '700 x 700 x 2000 mm',
    price: 5200,
  },
  {
    id: '6',
    name: 'Balcão de Atendimento Neutro',
    description:
      'Balcão elegante para atendimento direto ao cliente e exposição sofisticada de produtos em temperatura ambiente.',
    category: 'Vitrines',
    imageUrl: 'https://img.usecurling.com/p/600/600?q=display%20counter',
    features: [
      'Acabamento premium',
      'Design modular adaptável',
      'Superfícies de fácil higienização',
    ],
    dimensions: '1200 x 700 x 1100 mm',
    price: 3400,
  },
]
