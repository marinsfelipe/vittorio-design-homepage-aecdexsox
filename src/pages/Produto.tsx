import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/lib/supabase'
import { SEO } from '@/components/SEO'
import { trackEvent } from '@/lib/analytics'
import { useCachedSupabase } from '@/hooks/useCachedSupabase'
import { ProductGallery } from '@/components/ProductGallery'
import { ProductSpecs } from '@/components/ProductSpecs'
import { ProductActions } from '@/components/ProductActions'
import { fallbackProductDetails } from '@/lib/mock-data'

export default function Produto() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)

  const { data: fetchedProduct, loading: isLoading } = useCachedSupabase(
    `produto-${id}`,
    async () => {
      if (!id) throw new Error('No ID provided')
      const { data, error } = await supabase
        .from('produtos')
        .select('*, familias(nome), produto_imagens(*)')
        .eq('id', id)
        .single()

      if (error || !data) throw error

      await supabase.rpc('increment_product_view', { product_id: id }).catch(() => {})
      return data
    },
    [id],
  )

  useEffect(() => {
    if (!isLoading) {
      if (fetchedProduct) {
        setProduct(fetchedProduct)
      } else {
        setProduct({ ...fallbackProductDetails, id: id || fallbackProductDetails.id })
      }
    }
  }, [fetchedProduct, isLoading, id])

  useEffect(() => {
    if (product && !isLoading) {
      trackEvent('product_view', {
        currency: 'BRL',
        value: product.preco || 0,
        items: [
          {
            item_id: product.id,
            item_name: product.nome,
            price: product.preco || 0,
            item_category: product.familias?.nome || '',
          },
        ],
      })
    }
  }, [product, isLoading])

  if (isLoading) {
    return (
      <div className="w-full pt-32 pb-24 bg-background min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="w-full pt-32 pb-24 bg-background min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif text-white mb-4">Produto não encontrado</h2>
        <Link to="/catalogo">
          <Button variant="outline" className="border-white/20 text-white">
            Voltar ao Catálogo
          </Button>
        </Link>
      </div>
    )
  }

  const specs = product.especificacoes_json || {}
  const items = Array.isArray(product.itens_serie_json) ? product.itens_serie_json : []
  const options = Array.isArray(product.opcionais_json) ? product.opcionais_json : []
  const productDescription = `Conheça ${product.nome}. Peça exclusiva da Vittorio Design desenvolvida com precisão e materiais nobres.`

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nome,
    image: product.imagem_url,
    description: productDescription,
    sku: product.codigo,
    offers: {
      '@type': 'Offer',
      url: window.location.href,
      priceCurrency: 'BRL',
      price: product.preco || 0,
      availability: product.disponivel_ecommerce
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  }

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <SEO
        title={`${product.nome} | Vittorio Design`}
        description={productDescription}
        image={product.imagem_url}
        structuredData={jsonLdData}
      />
      <div className="container">
        <Link
          to="/catalogo"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors uppercase tracking-widest opacity-0 animate-fade-in-up"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div
            className="lg:col-span-5 relative opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <ProductGallery
              nome={product.nome}
              imagemPrincipal={product.imagem_url}
              imagens={product.produto_imagens || []}
            />
          </div>

          <div
            className="lg:col-span-7 space-y-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Badge
                  variant="outline"
                  className="text-primary border-primary/30 tracking-widest uppercase rounded-none px-3 py-1 bg-primary/5"
                >
                  {product.codigo}
                </Badge>
                {product.familias && (
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {product.familias.nome}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
                {product.nome}
              </h1>

              {product.disponivel_ecommerce && product.preco != null && (
                <div className="mb-8">
                  <p className="text-3xl lg:text-4xl font-serif text-white">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      product.preco,
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 font-light">
                    Em até 12x sem juros no cartão de crédito
                  </p>
                </div>
              )}
            </div>

            <ProductSpecs product={product} specs={specs} items={items} options={options} />
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}
