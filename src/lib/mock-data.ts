export const fallbackProductDetails = {
  id: 'p1000000-0000-0000-0000-000000000002',
  codigo: 'VD.EX.VTR.001',
  nome: 'Vitrine Torre Cristal',
  familias: { nome: 'Vitrines' },
  dimensoes_l: 60,
  dimensoes_p: 60,
  dimensoes_a: 180,
  especificacoes_json: {
    refrigeracao: 'Ar Forçado Dinâmico',
    temperatura: '+2°C a +8°C',
    consumo: '0.45 kWh',
  },
  itens_serie_json: [
    'Iluminação LED 4000K em todos os níveis',
    'Vidros duplos com gás argônio antivapor',
    'Prateleiras em vidro temperado 8mm',
    'Controlador digital touch-screen',
    'Estrutura integral em aço inox 304',
  ],
  opcionais_json: [
    'Acabamento premium em PVD Gold ou Black',
    'Rodízios embutidos de alta resistência',
    'Fechadura magnética invisível',
    'Sistema de umidificação ativa',
  ],
  imagem_url:
    'https://img.usecurling.com/p/1200/1600?q=luxury%20glass%20display%20cabinet&color=black',
  preco: 12500,
  disponivel_ecommerce: true,
  produto_imagens: [
    {
      id: 'm1',
      imagem_url:
        'https://img.usecurling.com/p/1200/1600?q=luxury%20glass%20display%20cabinet&color=black',
      tipo_imagem: 'principal',
      ordem: 1,
    },
    {
      id: 'm2',
      imagem_url: 'https://img.usecurling.com/p/1200/1600?q=glass%20cabinet%20detail&color=black',
      tipo_imagem: 'galeria',
      ordem: 2,
    },
    {
      id: 'm3',
      imagem_url: 'https://img.usecurling.com/p/1200/1600?q=3d%20render%20showcase&color=black',
      tipo_imagem: 'render 3D',
      ordem: 3,
    },
    {
      id: 'm4',
      imagem_url: 'https://img.usecurling.com/p/1200/1600?q=bakery%20interior&color=black',
      tipo_imagem: 'ambiente',
      ordem: 4,
    },
  ],
}
