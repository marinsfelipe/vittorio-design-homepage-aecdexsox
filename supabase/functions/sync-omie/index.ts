import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const OMIE_APP_KEY = Deno.env.get('OMIE_APP_KEY') ?? 'placeholder-omie-key'
const OMIE_APP_SECRET = Deno.env.get('OMIE_APP_SECRET') ?? 'placeholder-omie-secret'

serve(async (req: Request) => {
  try {
    const payload = await req.json()

    // Process only changes from the produtos table
    if (payload.table !== 'produtos') {
      return new Response(JSON.stringify({ message: 'Ignored: Not a product update' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const product = payload.record

    // Determine commercial line logic based on product name
    let linha = 'Aprezzo'
    const nameLower = product.nome?.toLowerCase() || ''

    if (
      nameLower.includes('premium') ||
      nameLower.includes('ouro') ||
      nameLower.includes('elegance')
    ) {
      linha = 'Speciale'
    } else if (
      nameLower.includes('cristal') ||
      nameLower.includes('torre') ||
      nameLower.includes('panorâmica')
    ) {
      linha = 'Strongest'
    } else if (nameLower.includes('slim') || nameLower.includes('prisma')) {
      linha = 'Fredda'
    }

    // Parse technical specifications
    const especificacoes =
      typeof product.especificacoes_json === 'string'
        ? JSON.parse(product.especificacoes_json)
        : product.especificacoes_json || {}

    // Build characteristics array for Omie
    const characteristics = []
    if (especificacoes.refrigeracao) {
      characteristics.push({ nome: 'Refrigeração', valor: especificacoes.refrigeracao })
    }
    if (especificacoes.temperatura) {
      characteristics.push({ nome: 'Temperatura', valor: especificacoes.temperatura })
    }

    // Include specific NBR Compliance and Materials required by documentation context
    characteristics.push({ nome: 'Conformidade NBR', valor: 'NBR 5410, ANVISA, NR-12' })
    characteristics.push({ nome: 'Condições de Projeto', valor: '42°C / 65% UR' })

    // Determine availability indicator (0 = immediate, otherwise lead time in days)
    const availabilityLeadTime = product.disponivel_ecommerce ? 0 : 15

    const omiePayload = {
      call: payload.type === 'INSERT' ? 'IncluirProduto' : 'AlterarProduto',
      app_key: OMIE_APP_KEY,
      app_secret: OMIE_APP_SECRET,
      param: [
        {
          codigo_produto_integracao: product.id,
          codigo_produto: product.codigo,
          descricao: product.nome,
          valor_unitario: product.preco || 0,
          peso_liq: 0,
          peso_bruto: 0,
          largura: product.dimensoes_l || 0,
          profundidade: product.dimensoes_p || 0,
          altura: product.dimensoes_a || 0,
          familia: linha, // Commercial Line mapping: Strongest/Speciale/Aprezzo/Fredda
          caracteristicas: characteristics,
          obs_internas: `Dimensões: ${product.dimensoes_l}x${product.dimensoes_p}x${product.dimensoes_a}.`,
          dias_preparacao: availabilityLeadTime,
        },
      ],
    }

    // Call Omie API for Vendas e Faturamento/Produtos module
    const response = await fetch('https://app.omie.com.br/api/v1/geral/produtos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(omiePayload),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Omie API error: ${JSON.stringify(data)}`)
    }

    return new Response(JSON.stringify({ success: true, omieResponse: data }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Omie Sync Error:', errorMessage)

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
