CREATE TABLE familias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    descricao TEXT
);

CREATE TABLE produtos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    codigo TEXT NOT NULL,
    familia_id UUID REFERENCES familias(id),
    dimensoes_l NUMERIC,
    dimensoes_p NUMERIC,
    dimensoes_a NUMERIC,
    especificacoes_json JSONB,
    itens_serie_json JSONB,
    opcionais_json JSONB,
    imagem_url TEXT,
    preco NUMERIC(10, 2),
    disponivel_ecommerce BOOLEAN DEFAULT FALSE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE contatos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT,
    mensagem TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE carrinho (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sessao_id TEXT NOT NULL,
    produto_id UUID REFERENCES produtos(id) NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 1,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(sessao_id, produto_id)
);

-- Seed Data
INSERT INTO familias (id, nome, descricao) VALUES
('f1000000-0000-0000-0000-000000000001', 'Balcões', 'Balcões premium para atendimento'),
('f2000000-0000-0000-0000-000000000002', 'Vitrines', 'Vitrines expositoras de luxo'),
('f3000000-0000-0000-0000-000000000003', 'Expositores', 'Expositores centrais e de parede');

INSERT INTO produtos (id, nome, codigo, familia_id, dimensoes_l, dimensoes_p, dimensoes_a, especificacoes_json, itens_serie_json, opcionais_json, imagem_url, preco, disponivel_ecommerce) VALUES
('p1000000-0000-0000-0000-000000000001', 'Balcão Premium Ouro', 'VD.EX.BAL.001', 'f1000000-0000-0000-0000-000000000001', 120, 60, 90, '{"refrigeracao": "Não aplicável", "temperatura": "Ambiente", "consumo": "N/A"}', '["Estrutura integral em aço inox 304", "Acabamento escovado premium"]', '["Iluminação LED embutida", "Gavetas com corrediças ocultas"]', 'https://img.usecurling.com/p/800/1000?q=luxury%20reception%20desk&color=black', 12500.00, true),
('p2000000-0000-0000-0000-000000000002', 'Vitrine Torre Cristal', 'VD.EX.VTR.001', 'f2000000-0000-0000-0000-000000000002', 60, 60, 180, '{"refrigeracao": "Ar Forçado Dinâmico", "temperatura": "+2°C a +8°C", "consumo": "0.45 kWh"}', '["Iluminação LED 4000K em todos os níveis", "Vidros duplos com gás argônio antivapor", "Prateleiras em vidro temperado 8mm", "Controlador digital touch-screen", "Estrutura integral em aço inox 304"]', '["Acabamento premium em PVD Gold ou Black", "Rodízios embutidos de alta resistência", "Fechadura magnética invisível", "Sistema de umidificação ativa"]', 'https://img.usecurling.com/p/1200/1600?q=luxury%20glass%20display%20cabinet&color=black', NULL, false),
('p3000000-0000-0000-0000-000000000003', 'Expositor Central Prisma', 'VD.EX.EXP.001', 'f3000000-0000-0000-0000-000000000003', 100, 100, 120, '{"refrigeracao": "Não aplicável", "temperatura": "Ambiente", "consumo": "0.15 kWh (Iluminação)"}', '["Estrutura em Inox Escovado", "Cúpula em vidro extra-clear 10mm", "Iluminação LED perimetral"]', '["Base revestida em couro", "Acabamento PVD Rose Gold"]', 'https://img.usecurling.com/p/800/1000?q=retail%20display%20stand&color=black', 8900.00, true),
('p4000000-0000-0000-0000-000000000004', 'Balcão Curvo Elegance', 'VD.EX.BAL.002', 'f1000000-0000-0000-0000-000000000001', 180, 70, 90, '{"refrigeracao": "Refrigeração Estática Opcional", "temperatura": "+4°C a +10°C", "consumo": "0.30 kWh"}', '["Design curvo ergonômico", "Tampo em mármore sintético", "Estrutura Inox 304"]', '["Módulo refrigerado integrado", "Acabamento em ripas de madeira"]', 'https://img.usecurling.com/p/800/1000?q=curved%20reception%20counter&color=black', NULL, false),
('p5000000-0000-0000-0000-000000000005', 'Vitrine Panorâmica', 'VD.EX.VTR.002', 'f2000000-0000-0000-0000-000000000002', 120, 40, 180, '{"refrigeracao": "Ar Forçado", "temperatura": "+0°C a +5°C", "consumo": "0.60 kWh"}', '["Visão 360 graus", "Portas deslizantes em vidro", "3 níveis de prateleiras ajustáveis"]', '["Cortina noturna", "Prateleiras espelhadas"]', 'https://img.usecurling.com/p/800/1000?q=large%20display%20case&color=black', 18500.00, true),
('p6000000-0000-0000-0000-000000000006', 'Expositor Parede Slim', 'VD.EX.EXP.002', 'f3000000-0000-0000-0000-000000000003', 120, 30, 200, '{"refrigeracao": "Não aplicável", "temperatura": "Ambiente", "consumo": "N/A"}', '["Perfil ultra-fino", "Fixação invisível", "Prateleiras em vidro 6mm"]', '["Fitas de LED RGBW", "Fundo em espelho bronze"]', 'https://img.usecurling.com/p/800/1000?q=wall%20shelving%20display&color=black', 4200.00, true);
