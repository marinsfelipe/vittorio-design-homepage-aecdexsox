CREATE TABLE whatsapp_envios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data_envio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    conteudo_mensagem TEXT NOT NULL,
    destinatario TEXT NOT NULL,
    status_envio TEXT NOT NULL
);
