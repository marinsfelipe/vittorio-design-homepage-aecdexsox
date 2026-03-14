import { FileText } from 'lucide-react'
import { SEO } from '@/components/SEO'

export default function TermosServico() {
  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <SEO
        title="Termos de Serviço | Vittorio Design"
        description="Termos e condições de uso do site, regras para operações de e-commerce, garantias e responsabilidades legais."
      />
      <div className="container max-w-4xl">
        <div className="mb-16 opacity-0 animate-fade-in-up">
          <FileText className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Termos de Serviço</h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light">
            Acordo legal que define as regras para a utilização de nossas plataformas, diretrizes de
            compra, cobertura de garantias e os compromissos mútuos estabelecidos.
          </p>
        </div>

        <div
          className="prose prose-invert prose-lg prose-p:font-light prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-white prose-headings:font-medium prose-a:text-primary max-w-none opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <h2>1. Termos de Compra e E-commerce</h2>
          <p>
            Ao realizar uma aquisição de produtos Vittorio Design, seja através da nossa plataforma
            de e-commerce ou canal de vendas corporativas diretas, você declara ciência e
            concordância com as seguintes condições comerciais:
          </p>
          <ul>
            <li>
              <strong className="text-white">Processamento de Pagamento:</strong> Disponibilizamos
              pagamentos em ambiente blindado via cartão de crédito (com opção de parcelamento),
              boleto bancário corporativo ou transferência eletrônica (PIX). A liberação da ordem de
              produção ou expedição ocorre exclusivamente após a compensação financeira integral.
            </li>
            <li>
              <strong className="text-white">Prazos e Entregas:</strong> O cronograma oficial de
              logística inicia-se no primeiro dia útil subsequente à aprovação do pagamento. O prazo
              estimado para itens em estoque (pronta-entrega) é exibido no checkout. Projetos sob
              medida ou com customizações seguem o prazo de fabricação estipulado na proposta
              comercial assinada (tipicamente entre 30 e 45 dias).
            </li>
            <li>
              <strong className="text-white">Frete e Despacho:</strong> Os custos logísticos são
              calculados dinamicamente baseados nas dimensões volumétricas do equipamento e no CEP
              de destino. A Vittorio Design compromete-se a utilizar transportadoras homologadas
              para garantir a integridade do equipamento até a doca ou porta do estabelecimento
              informado.
            </li>
          </ul>

          <h2>2. Política de Garantia</h2>
          <p>
            O nome Vittorio Design é sinônimo de precisão de engenharia e confiabilidade. Garantimos
            nossos equipamentos através das seguintes premissas:
          </p>
          <ul>
            <li>
              <strong className="text-white">Cobertura Padrão:</strong> Oferecemos 12 (doze) meses
              de garantia de fábrica contra anomalias estruturais, falhas no circuito frigorífico ou
              defeitos de montagem para todos os equipamentos das linhas comerciais (Strongest,
              Speciale, Aprezzo e Fredda).
            </li>
            <li>
              <strong className="text-white">Condições de Exclusão:</strong> A garantia será
              invalidada caso sejam constatados: danos mecânicos decorrentes de transporte
              inadequado efetuado pelo cliente; falhas motivadas por oscilações severas não
              estabilizadas na rede elétrica local; limpeza com agentes químicos corrosivos
              incompatíveis com aço inox; ou intervenções técnicas e modificações realizadas por mão
              de obra não credenciada pela fábrica.
            </li>
            <li>
              <strong className="text-white">Acionamento e SLA:</strong> Todo suporte em garantia
              deve ser solicitado exclusivamente através do nosso portal de Assistência Técnica,
              mediante a apresentação do número de série do equipamento e da respectiva nota fiscal.
            </li>
          </ul>

          <h2>3. Responsabilidades da Empresa</h2>
          <p>
            A Vittorio Design compromete-se a projetar, fabricar e entregar equipamentos que atendam
            ou superem as diretrizes técnicas informadas no nosso Catálogo Oficial. Garantimos total
            sigilo em relação aos desenhos arquitetônicos e projetos proprietários fornecidos pelos
            nossos clientes. Além disso, asseguramos a disponibilidade contínua da nossa rede de
            suporte técnico especializada.
          </p>

          <h2>4. Responsabilidades do Usuário</h2>
          <p>
            Para assegurar a máxima performance do investimento e manter a integridade operacional,
            compete ao cliente/usuário:
          </p>
          <ul>
            <li>Fornecer dados cadastrais, fiscais e logísticos absolutamente precisos.</li>
            <li>
              Assegurar previamente que a infraestrutura do local de instalação (carga elétrica,
              dimensões de portas de acesso e capacidade de exaustão) esteja integralmente
              compatível com o equipamento adquirido.
            </li>
            <li>
              Operar o equipamento dentro dos parâmetros de carga, respeitando as linhas de limite
              de refrigeração estipuladas, e realizar as manutenções preventivas (como limpeza do
              condensador) descritas no Manual de Instruções.
            </li>
          </ul>

          <h2>5. Modificações dos Termos</h2>
          <p>
            A Vittorio Design reserva-se o direito de atualizar ou modificar as presentes condições
            a qualquer momento, visando o aprimoramento de suas operações ou adaptações legais. As
            atualizações entram em vigor imediatamente após sua publicação nesta página.
          </p>
        </div>
      </div>
    </div>
  )
}
