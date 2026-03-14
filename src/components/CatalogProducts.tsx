import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Camera, Image as ImageIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { optimizeImage } from '@/lib/utils'
import { fallbackProductDetails } from '@/lib/mock-data'

interface Product {
  id: string
  nome: string
  codigo: string
  produto_imagens: {
    imagem_url: string
    tipo_imagem: string
  }[]
}

export function CatalogProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('produtos')
          .select(`
            id,
            nome,
            codigo,
            produto_imagens (
              imagem_url,
              tipo_imagem
            )
          `)
          .limit(12)

        if (error) throw error

        if (!data || data.length === 0) {
          throw new Error('Nenhum produto encontrado')
        }

        setProducts(data)
      } catch (err) {
        console.warn('Utilizando dados simulados para o catálogo:', err)
        setProducts([
          {
            id: '1',
            nome: 'Vitrine Torre Cristal',
            codigo: 'VD.EX.VTR.001',
            produto_imagens: fallbackProductDetails.produto_imagens,
          },
          {
            id: '2',
            nome: 'Balcão Neutro Classic',
            codigo: 'VD.EX.BAL.002',
            produto_imagens: [],
          },
          {
            id: '3',
            nome: 'Expositor Vertical Fredda',
            codigo: 'VD.EX.EXP.003',
            produto_imagens: [
              {
                imagem_url: 'https://img.usecurling.com/p/1200/1600?q=black%20fridge&color=black',
                tipo_imagem: 'principal',
              },
            ],
          },
          {
            id: '4',
            nome: 'Vitrine Aquecida Speciale',
            codigo: 'VD.EX.AQC.004',
            produto_imagens: [
              {
                imagem_url: 'https://img.usecurling.com/p/1200/1600?q=bakery%20display&color=black',
                tipo_imagem: 'principal',
              },
            ],
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="mt-20">
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
          <ImageIcon className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-serif text-white uppercase tracking-wider">
            Catálogo de Produtos
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-80 w-full bg-white/5 rounded-none" />
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) return null

  return (
    <div className="mt-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
        <ImageIcon className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-serif text-white uppercase tracking-wider">
          Catálogo de Produtos
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const principalImage = product.produto_imagens?.find(
            (img) => img.tipo_imagem === 'principal',
          )

          let imageUrl = principalImage?.imagem_url

          if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = supabase.storage.from('Imagens Vittorio Design').getPublicUrl(imageUrl)
              .data.publicUrl
          }

          return (
            <Card
              key={product.id}
              className="bg-zinc-950 border-white/5 hover:border-primary/50 transition-colors duration-500 rounded-none overflow-hidden group"
            >
              <div className="aspect-[4/5] bg-zinc-900 relative overflow-hidden">
                {imageUrl ? (
                  <img
                    src={optimizeImage(imageUrl)}
                    alt={product.nome}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 bg-zinc-900/50">
                    <Camera className="w-10 h-10 mb-2 opacity-20" />
                    <span className="text-xs uppercase tracking-widest opacity-50">Sem Imagem</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <CardContent className="p-5 border-t border-white/5 relative z-10 bg-zinc-950">
                <h3 className="text-base font-serif text-white mb-1 line-clamp-1">
                  {product.nome}
                </h3>
                <p className="text-xs text-primary font-mono tracking-wider">{product.codigo}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
