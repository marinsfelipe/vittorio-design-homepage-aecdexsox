import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loader2, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CatalogoPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await pb.send('/backend/v1/public/products', { method: 'GET' })
        setProducts(res.items || [])
      } catch (error) {
        console.error('Error fetching products', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-24 animate-fade-in-up min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Catálogo</h1>
        <p className="text-muted-foreground font-light max-w-2xl mx-auto">
          Explore nossas linhas completas de design.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24">
          <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-serif text-white mb-2">Nenhum produto encontrado</h2>
          <p className="text-muted-foreground">Em breve teremos novidades.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-card border-white/5 rounded-none overflow-hidden group hover:border-primary/30 transition-colors duration-300 flex flex-col"
            >
              <div className="aspect-[4/5] bg-muted/20 relative overflow-hidden">
                <img
                  src={`https://img.usecurling.com/p/400/500?q=${encodeURIComponent(product.line || 'design furniture')}&color=black`}
                  alt={product.description || product.code}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                {product.line && (
                  <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm text-foreground rounded-none border-none uppercase tracking-widest text-[10px]">
                    {product.line}
                  </Badge>
                )}
              </div>
              <CardContent className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-lg font-serif text-white mb-2">{product.code}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 font-light">
                    {product.description || 'Produto exclusivo Vittorio Design.'}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-medium text-white">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      product.price || 0,
                    )}
                  </span>
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary hover:bg-primary/10 rounded-none h-9 px-4 text-xs tracking-widest uppercase transition-colors"
                    asChild
                  >
                    <Link to={`/catalogo/${product.id}`}>Detalhes</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
