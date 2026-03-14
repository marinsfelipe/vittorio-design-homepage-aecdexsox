CREATE TABLE IF NOT EXISTS admin_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT NOT NULL,
    access_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    action_performed TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    tipo TEXT,
    logo_url TEXT,
    foto_equipamento_url TEXT,
    depoimento TEXT,
    data_parceria TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orcamentos_customizados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    familia TEXT,
    linha TEXT,
    dimensoes TEXT,
    quantidade INT,
    opcionais JSONB,
    nome TEXT,
    email TEXT,
    observacoes TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_name TEXT NOT NULL,
    event_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE produtos ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;

CREATE OR REPLACE FUNCTION increment_product_view(product_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE produtos SET views_count = COALESCE(views_count, 0) + 1 WHERE id = product_id;
END;
$$ LANGUAGE plpgsql;

-- Seed mock data to populate dashboard
INSERT INTO pedidos (cliente_nome, cliente_email, cliente_telefone, itens_json, total, status_pagamento) VALUES
('João Silva', 'joao@exemplo.com', '1199999999', '[{"nome": "Balcão Premium Ouro", "quantidade": 1, "preco": 12500}]', 12500, 'paid'),
('Maria Oliveira', 'maria@exemplo.com', '1188888888', '[{"nome": "Expositor Central Prisma", "quantidade": 2, "preco": 8900}]', 17800, 'delivered'),
('Carlos Santos', 'carlos@exemplo.com', '1177777777', '[{"nome": "Vitrine Panorâmica", "quantidade": 1, "preco": 18500}]', 18500, 'pending'),
('Empório Gourmet', 'contato@emporio.com', '2199999888', '[{"nome": "Expositor de Vinhos", "quantidade": 1, "preco": 9500}]', 9500, 'shipped');

INSERT INTO contatos (nome, email, telefone, mensagem) VALUES
('Ana Clara', 'ana@empresa.com', '2199999999', 'Gostaria de saber mais sobre vitrines.'),
('Roberto Alves', 'roberto@loja.com', '2188888888', 'Vocês fazem sob medida?');

INSERT INTO orcamentos_customizados (familia, linha, dimensoes, quantidade, nome, email) VALUES
('Vitrines', 'Speciale', '1500mm', 1, 'Pedro Gomes', 'pedro@cafe.com'),
('Balcões', 'Strongest', '3 Portas', 2, 'Juliana Costa', 'juliana@padaria.com');

INSERT INTO chamados_assistencia (numero_serie, descricao, contato_nome, contato_email, contato_telefone) VALUES
('VD-2023-001', 'O equipamento não está atingindo a temperatura.', 'Supermercado Vida', 'gerencia@vida.com', '1133334444');

INSERT INTO analytics_events (event_name) VALUES
('catalog_download'), ('catalog_download'), ('catalog_download'), ('catalog_download'), ('catalog_download');

UPDATE produtos SET views_count = floor(random() * 100 + 10);
