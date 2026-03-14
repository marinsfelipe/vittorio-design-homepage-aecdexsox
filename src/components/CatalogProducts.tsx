import { useState } from 'react'
import { products, categories, Product } from '@/lib/mock-data'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Camera, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CatalogProducts() {
  const [activeCategory, setActiveCategory] = useState<string>('Todos')

  const filteredProducts =
    activeCategory === 'Todos' ? products : products.filter((p) => p.category === activeCategory)

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        <Button
          variant={activeCategory === 'Todos' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('Todos')}
          className="rounded-full px-6 transition-all duration-300"
        >
          Todos
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? 'default' : 'outline'}
            onClick={() => setActiveCategory(cat)}
            className="rounded-full px-6 transition-all duration-300"
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [imageError, setImageError] = useState(false)

  return (
    <Card className="overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/60 bg-card">
      <div className="relative aspect-[4/3] bg-muted/30 overflow-hidden border-b border-border/40">
        {!imageError && product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-secondary/20">
            <Camera className="w-12 h-12 mb-3 opacity-40" />
            <span className="text-sm font-medium opacity-70">Imagem indisponível</span>
          </div>
        )}
        <Badge className="absolute top-4 right-4 bg-background/90 backdrop-blur-md text-foreground hover:bg-background shadow-sm border-border/50">
          {product.category}
        </Badge>
      </div>

      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-xl font-semibold leading-tight line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-2 text-sm text-muted-foreground/80 leading-relaxed">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-0 flex-grow">
        {product.features && product.features.length > 0 && (
          <ul className="text-sm text-muted-foreground space-y-2 mt-2">
            {product.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-4 border-t border-border/50 bg-muted/5 mt-auto flex justify-between items-center">
        <div className="flex flex-col">
          {product.dimensions && (
            <>
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/70 mb-0.5">
                Dimensões
              </span>
              <span className="text-xs font-medium text-foreground/80">{product.dimensions}</span>
            </>
          )}
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="group/btn text-primary hover:text-primary hover:bg-primary/10 -mr-2"
        >
          Ver detalhes
          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}
