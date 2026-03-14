import { ShieldCheck } from 'lucide-react'
import { SEO } from '@/components/SEO'

export default function PoliticaPrivacidade() {
  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <SEO
        title="Política de Privacidade | Vittorio Design"
        description="Entenda como a Vittorio Design coleta, utiliza e protege os seus dados pessoais em total conformidade com a LGPD."
      />
      <div className="container max-w-4xl">
        <div className="mb-16 opacity-0 animate-fade-in-up">
          <ShieldCheck className="w-12 h-12 text-primary mb-6" strokeWidth={1.5} />
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Política de Privacidade
          </h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light">
            Nosso compromisso absoluto com a proteção, segurança e transparência no tratamento dos
            seus dados pessoais, em rigorosa conformidade com a legislação vigente.
          </p>
        </div>

        <div
          className="prose prose-invert prose-lg prose-p:font-light prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-white prose-headings:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-muted-foreground max-w-none opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <h2>1. Coleta de Dados</h2>
          <p>
            A Vittorio Design coleta informações pessoais de forma transparente e responsável. Os
            dados são obtidos durante a sua interação conosco através de:
          </p>
          <ul>
            <li>
              <strong className="text-white">Formulários e Cadastros:</strong> Coletamos dados como
              nome, e-mail, telefone, empresa e especificações de projeto quando você preenche
              nossos formulários de contato, solicitações de orçamento, abertura de chamados de
              assistência técnica ou finaliza uma compra.
            </li>
            <li>
              <strong className="text-white">Cookies e Navegação:</strong> Coletamos automaticamente
              dados de acesso e navegação, como endereço IP, tipo de dispositivo, páginas visitadas
              e métricas de interação, através do uso de cookies.
            </li>
          </ul>

          <h2>2. Uso dos Dados</h2>
          <p>
            As informações coletadas são estritamente utilizadas para propósitos comerciais,
            operacionais e de aprimoramento contínuo dos nossos serviços:
          </p>
          <ul>
            <li>
              Processamento seguro de pedidos de e-commerce e elaboração de orçamentos
              personalizados.
            </li>
            <li>
              Agendamento e execução de chamados de assistência técnica através da nossa rede
              credenciada.
            </li>
            <li>
              Comunicação transacional sobre o status de pedidos, faturamento e logística de
              entrega.
            </li>
            <li>
              Análise de performance digital para melhorar a usabilidade e o conteúdo do nosso site.
            </li>
          </ul>

          <h2>3. Seus Direitos (LGPD)</h2>
          <p>
            Em integral conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº
            13.709/2018), asseguramos a você o controle sobre as suas informações:
          </p>
          <ul>
            <li>
              <strong className="text-white">Acesso e Confirmação:</strong> Você pode solicitar a
              confirmação da existência de tratamento e obter acesso aos seus dados que possuímos.
            </li>
            <li>
              <strong className="text-white">Correção:</strong> Direito de exigir a retificação de
              dados que estejam incompletos, inexatos ou desatualizados em nosso sistema.
            </li>
            <li>
              <strong className="text-white">Exclusão e Revogação:</strong> Você pode solicitar a
              eliminação dos dados pessoais tratados com o seu consentimento, bem como revogar este
              consentimento a qualquer momento, respeitando-se as guardas de informações exigidas
              por lei (ex: obrigações fiscais e garantias).
            </li>
          </ul>

          <h2>4. Política de Cookies</h2>
          <p>
            Utilizamos ferramentas de rastreamento (cookies) para entregar uma experiência premium e
            personalizada:
          </p>
          <ul>
            <li>
              <strong className="text-white">Cookies Estritamente Necessários:</strong> Fundamentais
              para o funcionamento básico da plataforma, permitindo a navegação segura, autenticação
              e gerenciamento de itens no carrinho de compras.
            </li>
            <li>
              <strong className="text-white">Cookies Analíticos e de Desempenho:</strong> Utilizados
              de forma anônima para compreender como nossos visitantes interagem com o catálogo e as
              páginas de produtos, auxiliando na otimização estrutural do site.
            </li>
          </ul>

          <h2>5. Contato de Privacidade</h2>
          <p>
            Nossa equipe está à disposição para atender quaisquer requisições referentes aos seus
            dados. Para exercer seus direitos previstos na LGPD ou esclarecer dúvidas sobre nossas
            práticas de proteção, contate nosso Encarregado de Dados através do e-mail exclusivo:
          </p>
          <p className="mt-6 p-6 bg-card border border-white/10 text-center font-medium">
            <a href="mailto:contato@vittoriodesign.com.br" className="text-xl">
              contato@vittoriodesign.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
