import { SEO } from '@/components/SEO'
import { SlaDashboard } from '@/components/assistencia/SlaDashboard'
import { PartnerMap } from '@/components/assistencia/PartnerMap'
import { DocCenter } from '@/components/assistencia/DocCenter'
import { ServiceRequestForm } from '@/components/assistencia/ServiceRequestForm'

export default function AssistenciaTecnica() {
  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <SEO
        title="Assistência Técnica | Vittorio Design"
        description="Portal de atendimento técnico, rede de parceiros credenciados, manuais e abertura de chamados."
      />

      <div className="container">
        <div className="mb-16 max-w-3xl opacity-0 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
            Assistência <span className="italic text-primary">Técnica</span>
          </h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            Suporte especializado, documentação técnica completa e nossa rede de parceiros
            credenciados prontos para garantir a máxima performance e durabilidade do seu
            equipamento Vittorio Design.
          </p>
        </div>

        <section className="mb-24 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="mb-8 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-serif text-white mb-2">
              Acordos de Nível de Serviço (SLA)
            </h2>
            <p className="text-muted-foreground font-light text-sm">
              Tempo estimado de resposta baseado na criticidade da ocorrência reportada.
            </p>
          </div>
          <SlaDashboard />
        </section>

        <section className="mb-24 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="mb-8 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-serif text-white mb-2">Rede de Parceiros Credenciados</h2>
            <p className="text-muted-foreground font-light text-sm">
              Técnicos e empresas homologadas pela fábrica para atuar em todo o território nacional.
            </p>
          </div>
          <PartnerMap />
        </section>

        <section className="mb-24 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
                Abertura de Chamado
              </h2>
              <div className="h-px w-16 bg-primary mb-6"></div>
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                Utilize o formulário para reportar anomalias ou agendar uma revisão preventiva no
                seu equipamento. O preenchimento correto do número de série é essencial para
                identificarmos o lote de fabricação e as peças exatas para o seu atendimento.
              </p>
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-none relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <h4 className="text-primary text-sm uppercase tracking-widest mb-3 font-medium">
                  Onde encontrar o N° de Série?
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  Localize a etiqueta de identificação metálica, geralmente fixada na parte inferior
                  traseira ou na lateral do equipamento, próximo ao painel do controlador digital.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ServiceRequestForm />
            </div>
          </div>
        </section>

        <section className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="mb-8 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-serif text-white mb-2">Central de Documentação</h2>
            <p className="text-muted-foreground font-light text-sm">
              Acesse e faça o download de guias de instalação, manuais de conservação e termos
              legais.
            </p>
          </div>
          <DocCenter />
        </section>
      </div>
    </div>
  )
}
