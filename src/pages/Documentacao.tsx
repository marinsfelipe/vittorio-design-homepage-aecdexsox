import { SEO } from '@/components/SEO'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Thermometer, Ruler, Cpu, Wrench, CheckCircle2, Zap } from 'lucide-react'

export default function Documentacao() {
  const compliance = [
    {
      title: 'NBR 5410',
      desc: 'Conformidade rigorosa nas instalações elétricas de baixa tensão, garantindo máxima segurança operacional e eficiência energética.',
    },
    {
      title: 'ANVISA',
      desc: 'Atendimento integral aos padrões de vigilância sanitária. Materiais atóxicos adequados para contato direto e indireto com alimentos.',
    },
    {
      title: 'NR-12',
      desc: 'Adequação completa às normas de segurança no trabalho em máquinas e equipamentos, prevenindo riscos na operação diária.',
    },
  ]

  const temps = [
    { family: 'Balcões', range: '+2°C a +8°C', desc: 'Refrigeração padrão' },
    { family: 'Vitrines', range: '+2°C a +8°C', desc: 'Refrigeração precisa' },
    { family: 'Expositores', range: '+2°C a +8°C', desc: 'Conservação vertical' },
  ]

  const postsales = [
    {
      title: 'Garantia de Fábrica',
      desc: '12 meses de garantia integral contra defeitos de fabricação em todas as linhas de produto.',
    },
    {
      title: 'SLA de Assistência',
      desc: 'Níveis de resposta técnica rigorosos: 24h, 48h ou 72h, ajustados conforme a localidade e severidade do chamado.',
    },
    {
      title: 'Teste FAT (Factory Acceptance Test)',
      desc: 'Inspeção e teste final rigoroso validando qualidade, performance de refrigeração e acabamento estético antes do embarque.',
    },
  ]

  return (
    <div className="w-full pt-32 pb-24 bg-background min-h-screen">
      <SEO
        title="Documentação Técnica | Vittorio Design"
        description="Consulte nossas normas de conformidade, padrões de refrigeração, diretrizes dimensionais e protocolos de garantia."
      />
      <div className="container max-w-5xl">
        <div className="mb-12 opacity-0 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Documentação Técnica</h1>
          <div className="h-px w-24 bg-primary mb-6"></div>
          <p className="text-lg text-muted-foreground font-light max-w-2xl">
            Especificações, normativas de conformidade e diretrizes técnicas detalhadas aplicáveis a
            todos os equipamentos Vittorio Design.
          </p>
        </div>

        <Tabs
          defaultValue="compliance"
          className="w-full opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <TabsList className="flex flex-wrap h-auto bg-transparent border-b border-white/10 p-0 mb-8 w-full justify-start gap-2">
            <TabsTrigger
              value="compliance"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-transparent data-[state=inactive]:border-white/10 data-[state=inactive]:text-muted-foreground rounded-none px-6 py-3 uppercase tracking-widest text-xs transition-all"
            >
              Conformidade
            </TabsTrigger>
            <TabsTrigger
              value="refrigeration"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-transparent data-[state=inactive]:border-white/10 data-[state=inactive]:text-muted-foreground rounded-none px-6 py-3 uppercase tracking-widest text-xs transition-all"
            >
              Refrigeração
            </TabsTrigger>
            <TabsTrigger
              value="dimensions"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-transparent data-[state=inactive]:border-white/10 data-[state=inactive]:text-muted-foreground rounded-none px-6 py-3 uppercase tracking-widest text-xs transition-all"
            >
              Dimensões
            </TabsTrigger>
            <TabsTrigger
              value="controllers"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-transparent data-[state=inactive]:border-white/10 data-[state=inactive]:text-muted-foreground rounded-none px-6 py-3 uppercase tracking-widest text-xs transition-all"
            >
              Hardware
            </TabsTrigger>
            <TabsTrigger
              value="postsales"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-transparent data-[state=inactive]:border-white/10 data-[state=inactive]:text-muted-foreground rounded-none px-6 py-3 uppercase tracking-widest text-xs transition-all"
            >
              Pós-Venda
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compliance" className="animate-fade-in mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {compliance.map((item) => (
                <Card
                  key={item.title}
                  className="bg-card border-white/5 rounded-none flex flex-col h-full hover:border-primary/30 transition-colors"
                >
                  <CardContent className="p-8 flex flex-col items-start flex-1">
                    <ShieldCheck className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />
                    <h3 className="text-xl font-serif text-white mb-4 uppercase tracking-widest">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="refrigeration" className="space-y-6 animate-fade-in mt-0">
            <Card className="bg-card border-white/5 rounded-none">
              <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Thermometer className="text-primary w-6 h-6" />
                    <h3 className="text-xl font-serif text-white uppercase tracking-wider">
                      Gases Homologados
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      'R290 (Ecológico, alta eficiência)',
                      'R134A (Padrão comercial leve)',
                      'R404A (Sistemas de alto desempenho)',
                    ].map((g) => (
                      <li
                        key={g}
                        className="flex items-center gap-3 text-muted-foreground font-light"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> {g}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="text-primary w-6 h-6" />
                    <h3 className="text-xl font-serif text-white uppercase tracking-wider">
                      Condições de Projeto
                    </h3>
                  </div>
                  <div className="p-6 bg-background border border-white/5 flex flex-col justify-center h-[calc(100%-3rem)]">
                    <p className="text-4xl font-serif text-white mb-2">42°C</p>
                    <p className="text-sm text-primary uppercase tracking-widest mb-1">
                      Temperatura Ambiente Max
                    </p>
                    <p className="text-sm text-muted-foreground font-light mt-4 pt-4 border-t border-white/10">
                      Umidade Relativa Suportada: <b>65% UR</b>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {temps.map((t) => (
                <Card
                  key={t.family}
                  className="bg-card border-white/5 rounded-none p-6 text-center"
                >
                  <h4 className="text-sm font-medium text-white uppercase tracking-widest mb-2">
                    {t.family}
                  </h4>
                  <p className="text-2xl font-serif text-primary mb-2">{t.range}</p>
                  <p className="text-xs text-muted-foreground font-light">{t.desc}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dimensions" className="animate-fade-in mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card border-white/5 rounded-none">
                <CardContent className="p-8">
                  <Ruler className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif text-white mb-4">Balcões</h3>
                  <p className="text-muted-foreground font-light mb-8 leading-relaxed">
                    Projetados através de padrões de modulação estrutural rígidos para garantir
                    integridade e isolamento térmico perfeito.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Padrão 2 Portas', 'Padrão 3 Portas', 'Padrão 4 Portas'].map((p) => (
                      <Badge
                        key={p}
                        variant="outline"
                        className="border-primary/30 text-primary bg-primary/5 uppercase tracking-widest text-[10px] rounded-none px-4 py-2"
                      >
                        {p}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-white/5 rounded-none">
                <CardContent className="p-8">
                  <Ruler className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />
                  <h3 className="text-2xl font-serif text-white mb-4">Vitrines</h3>
                  <p className="text-muted-foreground font-light mb-8 leading-relaxed">
                    Desenvolvidas com sistema de vidros duplos antivapor, oferecendo flexibilidade
                    de dimensionamento para adequação ao projeto arquitetônico.
                  </p>
                  <div className="inline-flex items-center justify-center p-4 bg-background border border-white/5">
                    <span className="text-lg font-serif text-white">
                      700mm{' '}
                      <span className="text-muted-foreground mx-2 font-sans font-light">até</span>{' '}
                      2000mm
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="controllers" className="animate-fade-in mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card border-white/5 rounded-none h-full hover:border-primary/30 transition-colors">
                <CardContent className="p-8">
                  <Cpu className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />
                  <Badge
                    variant="outline"
                    className="mb-4 border-white/20 text-white rounded-none px-3 uppercase text-[10px] tracking-widest"
                  >
                    Controlador Padrão
                  </Badge>
                  <h3 className="text-2xl font-serif text-white mb-4">Elitech</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    Interface digital touchscreen de alta durabilidade. Oferece precisão
                    termostática milimétrica, controle de degelo inteligente e confiabilidade
                    extrema para a maioria das aplicações comerciais.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-white/5 rounded-none h-full hover:border-primary/30 transition-colors">
                <CardContent className="p-8">
                  <Cpu className="w-10 h-10 text-primary mb-6" strokeWidth={1.5} />
                  <Badge
                    variant="outline"
                    className="mb-4 border-primary/30 text-primary bg-primary/5 rounded-none px-3 uppercase text-[10px] tracking-widest"
                  >
                    Sistemas Avançados
                  </Badge>
                  <h3 className="text-2xl font-serif text-white mb-4">Carel</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    Componente premium especificamente homologado e especificado para nossos
                    equipamentos operando com circuito de gás R290, maximizando a eficiência
                    energética do compressor.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="postsales" className="animate-fade-in mt-0">
            <div className="grid grid-cols-1 gap-6">
              {postsales.map((item) => (
                <Card
                  key={item.title}
                  className="bg-card border-white/5 rounded-none flex flex-col md:flex-row items-start md:items-center overflow-hidden"
                >
                  <div className="p-6 md:p-8 bg-muted/10 border-b md:border-b-0 md:border-r border-white/5 shrink-0 h-full flex items-center justify-center min-w-[200px]">
                    <Wrench className="w-12 h-12 text-primary opacity-80" strokeWidth={1} />
                  </div>
                  <CardContent className="p-6 md:p-8 flex-1 w-full m-0">
                    <h3 className="text-xl font-serif text-white mb-3 uppercase tracking-widest">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
