import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export function getSessionId() {
  let sessionId = localStorage.getItem('vittorio_session_id')
  if (!sessionId) {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      sessionId = crypto.randomUUID()
    } else {
      sessionId =
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }
    localStorage.setItem('vittorio_session_id', sessionId)
  }
  return sessionId
}

export function useCart() {
  const [isAdding, setIsAdding] = useState<string | null>(null)
  const { toast } = useToast()

  const addToCart = async (produtoId: string) => {
    setIsAdding(produtoId)
    try {
      const sessionId = getSessionId()

      const { data: existing } = await supabase
        .from('carrinho')
        .select('id, quantidade')
        .eq('sessao_id', sessionId)
        .eq('produto_id', produtoId)
        .single()

      if (existing) {
        const { error } = await supabase
          .from('carrinho')
          .update({ quantidade: existing.quantidade + 1 })
          .eq('id', existing.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from('carrinho').insert({
          sessao_id: sessionId,
          produto_id: produtoId,
          quantidade: 1,
        })

        if (error) throw error
      }

      toast({
        title: 'Adicionado ao carrinho',
        description: 'O produto foi adicionado ao seu carrinho com sucesso.',
      })
    } catch (err) {
      console.error(err)
      toast({
        variant: 'destructive',
        title: 'Erro ao adicionar',
        description: 'Não foi possível adicionar o produto ao carrinho.',
      })
    } finally {
      setIsAdding(null)
    }
  }

  return { addToCart, isAdding }
}
