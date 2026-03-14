import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'

const formSchema = z.object({
  numero_serie: z.string().min(3, 'Número de série é obrigatório.'),
  descricao: z.string().min(10, 'Descreva o problema com mais detalhes.'),
  contato_nome: z.string().min(2, 'Nome é obrigatório.'),
  contato_email: z.string().email('Email inválido.'),
  contato_telefone: z.string().min(10, 'Telefone inválido.'),
})

export function ServiceRequestForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numero_serie: '',
      descricao: '',
      contato_nome: '',
      contato_email: '',
      contato_telefone: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('chamados_assistencia').insert([values])
      if (error) throw error

      toast({
        title: 'Chamado aberto com sucesso!',
        description: 'Nossa equipe técnica entrará em contato em breve.',
      })
      form.reset()
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Erro ao abrir chamado',
        description: 'Ocorreu um erro ao processar sua solicitação. Tente novamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-card border border-white/5 p-6 md:p-8"
      >
        <h3 className="text-2xl font-serif text-white mb-6 border-b border-white/10 pb-4">
          Detalhes da Ocorrência
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="numero_serie"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">
                  Número de Série
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: VD-2023-1092"
                    className="bg-transparent border-white/10 text-white rounded-none h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contato_nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">
                  Nome do Solicitante
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu nome completo"
                    className="bg-transparent border-white/10 text-white rounded-none h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="contato_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">
                  Email Comercial
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-transparent border-white/10 text-white rounded-none h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contato_telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">
                  Telefone / WhatsApp
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="(11) 99999-9999"
                    className="bg-transparent border-white/10 text-white rounded-none h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">
                Descrição do Problema
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva detalhadamente os sintomas apresentados pelo equipamento..."
                  className="bg-transparent border-white/10 text-white rounded-none min-h-[120px] resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 text-sm tracking-widest uppercase transition-all duration-300"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-3 h-5 w-5 animate-spin" /> Registrando Chamado...
            </>
          ) : (
            'Solicitar Atendimento Técnico'
          )}
        </Button>
      </form>
    </Form>
  )
}
