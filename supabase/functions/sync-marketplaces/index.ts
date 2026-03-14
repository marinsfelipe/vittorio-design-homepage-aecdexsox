import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Fetch products that are enabled for marketplace synchronization
    const { data: products, error: fetchError } = await supabaseClient
      .from('produtos')
      .select('id, codigo, nome')
      .eq('marketplace_ativo', true)

    if (fetchError) {
      throw new Error(`Failed to fetch products: ${fetchError.message}`)
    }

    if (!products || products.length === 0) {
      return new Response(JSON.stringify({ message: 'No products flagged for sync' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const marketplaces = ['Mercado Livre', 'OLX']
    const results = []

    for (const product of products) {
      for (const marketplace of marketplaces) {
        // Mock external marketplace sync response
        // In a real scenario, this would be an API call to the respective marketplace
        const isSuccess = Math.random() > 0.15 // 85% success rate for simulation
        const status = isSuccess ? 'Success' : 'Failed'
        const prefix = marketplace === 'Mercado Livre' ? 'ML' : 'OLX'
        const skuExterno = isSuccess
          ? `${prefix}-${product.codigo}-${Date.now().toString().slice(-4)}`
          : null
        const ultimaAtualizacao = new Date().toISOString()

        const { error: upsertError } = await supabaseClient.from('marketplace_sync').upsert(
          {
            produto_id: product.id,
            marketplace: marketplace,
            sku_externo: skuExterno,
            status_sincronizacao: status,
            ultima_atualizacao: ultimaAtualizacao,
          },
          { onConflict: 'produto_id, marketplace' },
        )

        if (upsertError) {
          console.error(
            `Failed to update sync status for ${product.id} on ${marketplace}:`,
            upsertError,
          )
          results.push({
            produto_id: product.id,
            marketplace,
            status: 'Failed',
            error: upsertError.message,
          })
        } else {
          results.push({
            produto_id: product.id,
            marketplace,
            status,
            sku_externo: skuExterno,
            ultima_atualizacao: ultimaAtualizacao,
          })
        }
      }
    }

    return new Response(JSON.stringify({ success: true, synced_items: results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
