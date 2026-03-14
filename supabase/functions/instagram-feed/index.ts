import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const accessToken = Deno.env.get('INSTAGRAM_ACCESS_TOKEN')

    if (!accessToken) {
      const queries = [
        'luxury%20living%20room',
        'modern%20sofa',
        'minimalist%20chair',
        'elegant%20chandelier',
        'contemporary%20table',
        'stainless%20steel%20furniture',
        'luxury%20bedroom',
        'architectural%20interior',
      ]

      const mockData = queries.map((query, i) => ({
        id: String(i + 1),
        media_url: `https://img.usecurling.com/p/600/600?q=${query}&color=black`,
        permalink: 'https://instagram.com/VittorioDesignOficial',
      }))

      return new Response(JSON.stringify({ data: mockData }), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=86400',
        },
      })
    }

    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`
    const response = await fetch(url)
    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
