import { Instagram, Mail, MessageCircle, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function Contato() {
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
          {/* Contact Form */}
          <div
            className="lg:col-span-7 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-muted-foreground">
                    Nome Completo
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome"
                    className="bg-transparent border-input focus-visible:ring-primary focus-visible:border-primary text-white rounded-none h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-muted-foreground">
                    Email Profissional
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-transparent border-input focus-visible:ring-primary focus-visible:border-primary text-white rounded-none h-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assunto" className="text-muted-foreground">
                  Assunto
                </Label>
                <Input
                  id="assunto"
                  placeholder="Motivo do contato"
                  className="bg-transparent border-input focus-visible:ring-primary focus-visible:border-primary text-white rounded-none h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mensagem" className="text-muted-foreground">
                  Mensagem
                </Label>
                <Textarea
                  id="mensagem"
                  placeholder="Descreva seu projeto ou dúvida..."
                  className="bg-transparent border-input focus-visible:ring-primary focus-visible:border-primary text-white rounded-none min-h-[160px] resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 py-6 text-sm tracking-widest uppercase transition-all duration-300"
              >
                Enviar Mensagem
              </Button>
            </form>
          </div>

          {/* Contact Info Cards */}
          <div
            className="lg:col-span-5 space-y-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <a
              href="https://wa.me/5511999999999"
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
