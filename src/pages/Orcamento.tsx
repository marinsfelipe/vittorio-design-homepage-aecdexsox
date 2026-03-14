import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Box, Settings, User } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import { trackEvent } from '@/lib/analytics'

const quoteSchema = z.object({
  familia: z.enum(['Balcões', 'Vitrines', 'Expositores'], {
    required_error: 'Selecione uma família.',
  }),
  linha: z.enum(['Strongest', 'Speciale', 'Aprezzo', 'Fredda'], {
    required_error: 'Selecione uma linha.',
  }),
  dimensoes: z.string().min(1, 'Especifique as dimensões desejadas.'),
  quantidade: z.coerce.number().min(1, 'A quantidade mínima é 1.'),
  opcionais: z.array(z.string()).default([]),
  nome: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('Por favor, insira um email válido.'),
  observacoes: z.string().optional(),
})

const opcionaisList = [
  { id: 'Prateleira extra', label: 'Prateleira extra' },
  { id: 'Wi-Fi', label: 'Wi-Fi' },
  { id: 'Acabamento dourado', label: 'Acabamento dourado' },
  { id: 'Acabamento MDF', label: 'Acabamento MDF' },
  { id: 'Cor personalizada', label: 'Cor personalizada' },
  { id: 'Dreno reforçado', label: 'Dreno reforçado' },
]

export default function Orcamento() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      quantidade: 1,
      opcionais: [],
      nome: '',
      email: '',
      observacoes: '',
      dimensoes: '',
    },
  })

  const watchFamilia = form.watch('familia')

  useEffect(() => {
    form.setValue('dimensoes', '')
  }, [watchFamilia, form])

  const onSubmit = async (values: z.infer<typeof quoteSchema>) => {
    setIsSubmitting(true)
    try {
      const { error: dbError } = await supabase.from('orcamentos_customizados').insert([values])
      if (dbError) throw new Error('Falha ao salvar no banco de dados.')

      const { error: emailError } = await supabase.functions.invoke('send-quote-email', {
        body: values,
      })
      if (emailError) throw new Error('Falha no serviço de email automatizado.')

      trackEvent('generate_lead', { form_name: 'quote_advanced' })
      toast({
        title: 'Orçamento Solicitado!',
        description: 'Sua solicitação foi enviada com sucesso. Verifique seu email.',
      })
      form.reset()
    } catch (err: any) {
      console.error('Erro ao enviar formulário:', err)
      toast({
        variant: 'destructive',
        title: 'Erro ao processar',
        description: err.message || 'Tente novamente mais tarde.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <SEO
        title="Orçamento Personalizado | Vittorio Design"
        description="Configure seu equipamento Vittorio Design sob medida."
      />
      <div className="container max-w-4xl">
        <div className="mb-12 opacity-0 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Orçamento Personalizado
          </h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light">
            Especifique as configurações técnicas exatas para o seu ambiente e receba uma proposta
            exclusiva da nossa equipe comercial.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <Card className="bg-card border-white/5 rounded-none">
              <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                <CardTitle className="text-xl font-serif text-white flex items-center gap-3">
                  <Box className="w-5 h-5 text-primary" /> 1. Equipamento
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="familia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">
                          Família
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-transparent border-white/10 text-white rounded-none h-12">
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#111] border-white/10 text-white rounded-none">
                            <SelectItem value="Balcões">Balcões</SelectItem>
                            <SelectItem value="Vitrines">Vitrines</SelectItem>
                            <SelectItem value="Expositores">Expositores</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="linha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">
                          Linha Comercial
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-transparent border-white/10 text-white rounded-none h-12">
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#111] border-white/10 text-white rounded-none">
                            <SelectItem value="Strongest">Strongest</SelectItem>
                            <SelectItem value="Speciale">Speciale</SelectItem>
                            <SelectItem value="Aprezzo">Aprezzo</SelectItem>
                            <SelectItem value="Fredda">Fredda</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="dimensoes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">
                          Dimensões
                        </FormLabel>
                        {watchFamilia === 'Balcões' ? (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-transparent border-white/10 text-white rounded-none h-12">
                                <SelectValue placeholder="Capacidade..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#111] border-white/10 text-white rounded-none">
                              <SelectItem value="2 Portas">2 Portas</SelectItem>
                              <SelectItem value="3 Portas">3 Portas</SelectItem>
                              <SelectItem value="4 Portas">4 Portas</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : watchFamilia === 'Vitrines' ? (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-transparent border-white/10 text-white rounded-none h-12">
                                <SelectValue placeholder="Tamanho..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#111] border-white/10 text-white rounded-none">
                              <SelectItem value="700mm">700mm</SelectItem>
                              <SelectItem value="1000mm">1000mm</SelectItem>
                              <SelectItem value="1200mm">1200mm</SelectItem>
                              <SelectItem value="1500mm">1500mm</SelectItem>
                              <SelectItem value="2000mm">2000mm</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <FormControl>
                            <Input
                              placeholder="Ex: 1000x600x1200mm"
                              className="bg-transparent border-white/10 text-white rounded-none h-12"
                              {...field}
                              disabled={!watchFamilia}
                            />
                          </FormControl>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">
                          Quantidade
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            className="bg-transparent border-white/10 text-white rounded-none h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-white/5 rounded-none">
              <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                <CardTitle className="text-xl font-serif text-white flex items-center gap-3">
                  <Settings className="w-5 h-5 text-primary" /> 2. Opcionais & Upgrades
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <FormField
                  control={form.control}
                  name="opcionais"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {opcionaisList.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="opcionais"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-none border border-white/10 p-4 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-colors cursor-pointer">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(c) =>
                                      c
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(field.value?.filter((v) => v !== item.id))
                                    }
                                  />
                                </FormControl>
                                <FormLabel className="font-normal text-white cursor-pointer w-full text-sm">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="bg-card border-white/5 rounded-none">
              <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                <CardTitle className="text-xl font-serif text-white flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" /> 3. Seus Dados
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">
                          Nome Completo
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Seu nome"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">
                          Email Profissional
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
                </div>
                <FormField
                  control={form.control}
                  name="observacoes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase tracking-widest text-xs">
                        Observações Especiais
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detalhes adicionais, projeto arquitetônico ou restrições de entrega..."
                          className="bg-transparent border-white/10 text-white rounded-none min-h-[120px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-12 py-7 text-sm tracking-widest uppercase transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" /> Processando...
                  </>
                ) : (
                  'Solicitar Orçamento'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
