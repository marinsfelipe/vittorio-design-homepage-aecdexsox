import { Shield, Crown } from 'lucide-react'

export function PrintableCatalog() {
  const families = [
    {
      title: 'Família Balcões',
      desc: 'Soluções em atendimento e exposição neutra. Projetados através de padrões de modulação estrutural rígidos para garantir integridade e isolamento térmico perfeito.',
    },
    {
      title: 'Família Vitrines',
      desc: 'Desenvolvidas com sistema de vidros duplos antivapor, oferecendo flexibilidade de dimensionamento para adequação ao projeto arquitetônico.',
    },
    {
      title: 'Família Expositores',
      desc: 'Conservação vertical de alta performance para os mercados mais exigentes, unindo capacidade volumétrica a um design minimalista.',
    },
  ]

  const PageWrapper = ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div className="flex flex-col h-screen break-after-page pt-16 px-20 relative">
      {title && (
        <div className="absolute top-10 left-20 text-gray-400 text-xs uppercase tracking-widest">
          {title}
        </div>
      )}
      {children}
    </div>
  )

  return (
    <div
      className="hidden print:block w-full bg-white text-black font-sans"
      style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
    >
      <PageWrapper>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="relative mb-12">
            <Shield className="w-40 h-40 text-gray-100" strokeWidth={1} />
            <Crown className="w-16 h-16 text-[#C9A26B] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h1 className="text-6xl font-serif font-bold text-gray-900 mb-6 uppercase tracking-widest">
            Catálogo Oficial
          </h1>
          <div className="h-px w-32 bg-[#C9A26B] mb-12 mx-auto"></div>
          <p className="text-2xl italic text-gray-600 max-w-2xl leading-relaxed">
            "Criar ambientes funcionais e elegantes para aumento de vendas"
          </p>
        </div>
      </PageWrapper>

      <PageWrapper title="Apresentação Institucional">
        <h2 className="text-4xl font-serif text-gray-900 mb-4 uppercase tracking-widest">
          Nossa Essência
        </h2>
        <div className="h-px w-24 bg-[#C9A26B] mb-8"></div>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mb-10">
          Nossa trajetória é marcada pela busca incessante pela perfeição. Unimos a nobreza do aço
          inox a sistemas de alta eficiência para entregar soluções que elevam o valor percebido de
          cada item, transformando estabelecimentos em verdadeiras referências de mercado.
        </p>
        <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-widest text-[#C9A26B]">
          Missão, Visão e Valores
        </h3>
        <ul className="text-base text-gray-700 space-y-2 mb-8">
          <li>
            <strong>Missão:</strong> Criar ambientes funcionais e elegantes para aumento de vendas.
          </li>
          <li>
            <strong>Visão:</strong> Ser a principal referência nacional em design e funcionalidade
            para mobiliário comercial premium.
          </li>
          <li>
            <strong>Valores:</strong> Qualidade, Estética, Acabamento, Eficiência, Durabilidade.
          </li>
        </ul>
        <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-widest text-[#C9A26B]">
          Sócios Fundadores
        </h3>
        <ul className="text-lg text-gray-700 space-y-2 mb-auto">
          <li>• Felipe Marins de Sá Silva</li>
          <li>• Wellington dos Santos Lopes Moreira</li>
        </ul>
        <div className="border-t border-gray-200 pt-6 mt-10">
          <p className="text-sm text-gray-500 font-mono">CNPJ: 24.810.002/0001-04</p>
        </div>
      </PageWrapper>

      {families.map((fam, i) => (
        <PageWrapper key={fam.title} title={`Linha de Produtos • ${i + 1}`}>
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-5xl font-serif text-gray-900 mb-6 uppercase tracking-widest">
              {fam.title}
            </h2>
            <div className="h-px w-32 bg-[#C9A26B] mb-10"></div>
            <p className="text-2xl text-gray-700 leading-relaxed max-w-3xl">{fam.desc}</p>
          </div>
        </PageWrapper>
      ))}

      <PageWrapper title="Documentação Técnica">
        <h2 className="text-4xl font-serif text-gray-900 mb-4 uppercase tracking-widest">
          Especificações
        </h2>
        <div className="h-px w-24 bg-[#C9A26B] mb-10"></div>
        <div className="space-y-10 text-xl text-gray-700">
          <div>
            <strong className="block text-[#C9A26B] uppercase text-sm mb-2">Conformidade</strong>
            <p>Atendimento integral às normativas NBR 5410, ANVISA e NR-12.</p>
          </div>
          <div>
            <strong className="block text-[#C9A26B] uppercase text-sm mb-2">Refrigeração</strong>
            <p>
              Homologação para gases R290, R134A e R404A. Operação projetada para suportar até 42°C
              de temperatura ambiente com 65% UR.
            </p>
          </div>
          <div>
            <strong className="block text-[#C9A26B] uppercase text-sm mb-2">Hardware</strong>
            <p>Equipados com controladores Elitech (Linha Padrão) e Carel (Sistemas Avançados).</p>
          </div>
        </div>
      </PageWrapper>

      <PageWrapper title="Estrutura Comercial">
        <h2 className="text-4xl font-serif text-gray-900 mb-4 uppercase tracking-widest">
          Linhas & Itens
        </h2>
        <div className="h-px w-24 bg-[#C9A26B] mb-10"></div>
        <p className="text-xl text-gray-700 mb-10">
          Atuamos através de quatro vertentes estruturais:{' '}
          <strong>Strongest, Speciale, Aprezzo e Fredda</strong>.
        </p>
        <div className="flex gap-16">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-widest border-b pb-2">
              Itens de Série
            </h3>
            <ul className="text-lg text-gray-700 space-y-2 list-disc pl-5">
              <li>Iluminação LED 4000K integral</li>
              <li>Vidros duplos com gás argônio antivapor</li>
              <li>Controlador digital touch-screen</li>
              <li>Estrutura em aço inox 304</li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-widest border-b pb-2">
              Opcionais
            </h3>
            <ul className="text-lg text-gray-700 space-y-2 list-disc pl-5">
              <li>Acabamento premium em PVD Gold/Black</li>
              <li>Rodízios embutidos de alta resistência</li>
              <li>Sistema de umidificação ativa</li>
            </ul>
          </div>
        </div>
      </PageWrapper>

      <PageWrapper title="Atendimento">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <Shield className="w-16 h-16 text-gray-200 mb-6" />
          <h2 className="text-4xl font-serif text-gray-900 mb-4 uppercase tracking-widest">
            Contatos
          </h2>
          <div className="h-px w-24 bg-[#C9A26B] mb-10 mx-auto"></div>
          <p className="text-xl text-gray-700 mb-4">
            <strong>WhatsApp:</strong> +55 (21) 99045-1568
          </p>
          <p className="text-xl text-gray-700 mb-4">
            <strong>Email:</strong> contato@vittoriodesign.com
          </p>
          <p className="text-xl text-gray-700 mb-16">
            <strong>Showroom:</strong> Av. Europa, 150 - São Paulo, SP
          </p>
          <p className="text-sm text-gray-500 font-mono mt-auto pt-10 border-t w-full">
            © {new Date().getFullYear()} Vittorio Design. Todos os direitos reservados.
          </p>
        </div>
      </PageWrapper>
    </div>
  )
}
