CREATE TABLE chamados_assistencia (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numero_serie TEXT NOT NULL,
    descricao TEXT NOT NULL,
    contato_nome TEXT NOT NULL,
    contato_email TEXT NOT NULL,
    contato_telefone TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
