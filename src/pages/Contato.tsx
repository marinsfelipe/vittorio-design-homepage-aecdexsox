import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Instagram, Mail, MessageCircle, MapPin, Loader2 } from 'lucide-react'

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
  nome: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('Por favor, insira um email válido.'),
  telefone: z
    .string()
    .min(10, 'O telefone deve ter pelo menos 10 dígitos.')
    .regex(
      /^[0-9\s()+-]+$/,
      'Formato de telefone inválido. Use apenas números e caracteres ( ) + -',
    ),
  mensagem: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres.'),
})

export default function Contato() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      mensagem: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('contatos').insert([
        {
          nome: values.nome,
          email: values.email,
          telefone: values.telefone,
          mensagem: values.mensagem,
        },
      ])

      if (error) {
        throw new Error(error.message)
      }

      form.reset()
      toast({
        title: 'Mensagem enviada com sucesso!',
        description: 'Recebemos seu contato. Nossa equipe retornará em breve.',
      })
    } catch (err) {
      console.error('Erro ao enviar formulário:', err)
      toast({
        variant: 'destructive',
        title: 'Erro ao enviar',
        description: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const whatsappMessage = encodeURIComponent(
    'Olá Vittorio Design, gostaria de saber mais sobre seus produtos.',
  )

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <div className="container">
        <div className="max-w-2xl mb-16 opacity-0 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Fale Conosco</h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light">
            Estamos à disposição para discutir projetos exclusivos, parcerias comerciais e
            esclarecer dúvidas sobre nossas peças.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div
            className="lg:col-span-7 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <Form {...form}>
              <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-muted-foreground">Nome Completo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Seu nome"
                            className="bg-transparent border-input focus-visible:ring-primary focus-visible:border-primary text-white rounded-none h-12"
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
                      <FormItem className="space-y-2">
                        <FormLabel className="text-muted-foreground">Email Profissional</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="seu@email.com"
                            className="bg-transparent border-input focus-visible:ring-primary focus-visible:border-primary text-white rounded-none h-12"
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
                  name="telefone"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-muted-foreground">Telefone / WhatsApp</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="(11) 99999-9999"
                          className="bg-transparent border-input focus-visible:ring-primary focus-visible:border-primary text-white rounded-none h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mensagem"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-muted-foreground">Mensagem</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva seu projeto ou dúvida..."
                          className="bg-transparent border-input focus-visible:ring-primary focus-visible:border-primary text-white rounded-none min-h-[160px] resize-none"
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
                  className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-6 text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar Mensagem'
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div
            className="lg:col-span-5 space-y-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <a
              href={`https://wa.me/5511999999999?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-6 p-6 md:p-8 bg-card border border-white/5 hover:border-primary transition-colors group"
            >
              <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-white mb-1">WhatsApp</h3>
                <p className="text-sm text-muted-foreground mb-3 font-light">
                  Atendimento direto e personalizado.
                </p>
                <span className="text-primary text-sm tracking-widest uppercase flex items-center group-hover:translate-x-1 transition-transform">
                  Iniciar Conversa
                </span>
              </div>
            </a>

            <a
              href="mailto:contato@vittoriodesign.com"
              className="flex items-start gap-6 p-6 md:p-8 bg-card border border-white/5 hover:border-primary transition-colors group"
            >
              <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-white mb-1">Email</h3>
                <p className="text-sm text-muted-foreground mb-3 font-light">
                  Para projetos e especificações técnicas.
                </p>
                <span className="text-primary text-sm tracking-widest uppercase flex items-center group-hover:translate-x-1 transition-transform">
                  Enviar Email
                </span>
              </div>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-6 p-6 md:p-8 bg-card border border-white/5 hover:border-primary transition-colors group"
            >
              <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                <Instagram className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-white mb-1">Instagram</h3>
                <p className="text-sm text-muted-foreground mb-3 font-light">
                  Acompanhe nosso portfólio e inspirações.
                </p>
                <span className="text-primary text-sm tracking-widest uppercase flex items-center group-hover:translate-x-1 transition-transform">
                  Seguir @vittoriodesign
                </span>
              </div>
            </a>

            <div className="flex items-start gap-6 p-6 md:p-8 bg-card border border-white/5 group">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-white mb-1">Showroom</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  Av. Europa, 150
                  <br />
                  Jardim Europa
                  <br />
                  São Paulo, SP - 01449-000
                  <br />
                  <em className="text-xs text-primary mt-2 block">Visitas com hora marcada</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
