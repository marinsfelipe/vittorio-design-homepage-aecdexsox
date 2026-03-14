import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Success() {
  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-[80vh] flex items-center justify-center">
      <div className="container max-w-lg text-center">
        <div className="mb-8 flex justify-center opacity-0 animate-fade-in-up">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(201,162,107,0.2)]">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h1
          className="text-4xl md:text-5xl font-serif text-white mb-6 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          Pedido Confirmado!
        </h1>

        <p
          className="text-lg text-muted-foreground mb-10 opacity-0 animate-fade-in-up font-light leading-relaxed"
          style={{ animationDelay: '0.2s' }}
        >
          Agradecemos a sua compra. Enviamos um email com o recibo e os detalhes da sua aquisição.
          Nossa equipe entrará em contato em breve para alinhar a entrega.
        </p>

        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 h-14 text-sm tracking-widest uppercase transition-all duration-300"
          >
            <Link to="/loja">
              Voltar para a Loja <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
