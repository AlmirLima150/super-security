# Super Security — Landing Page

Projeto Integrador · Engenharia de Software — **Grupo 09** :

- Almir de Lima Felix dos Santos - 01878487 
- Breno Victor Florencio da Silva Marques - 01894104 
- Davi Lopes da Silva Marques - 01902324 
- Guilherme Anildo de Oliveira da Silva - 01878051
- Kauã Gabriel Ferreira Sobral - 01947077
- Saulo Guimarães de Souza Dantas - 01907485

Site institucional (one-page) da Super Security, empresa de segurança privada em Recife/PE.
O código foi gerado a partir do **Dev Mode do Figma** : cores, fontes, espaçamentos e medidas vêm das variáveis e estilos de texto do design system.

## Como abrir no VS Code

1. No VS Code: **File → Open Folder…** e escolha a pasta `super-security`.
2. Instale a extensão **Live Server** (Ritwick Dey).
3. Clique com o botão direito em `index.html` → **Open with Live Server**.
   O site abre no navegador e recarrega sozinho a cada alteração.

Para testar a versão de celular: no navegador, `F12` → ícone de celular (Toggle device toolbar) → largura 390px.

## Estrutura

```
super-security/
├── index.html          → estrutura das 8 seções (HTML semântico)
├── css/styles.css      → design tokens + layout responsivo (desktop 1440 · tablet · mobile 390)
├── js/main.js          → menu mobile, link ativo, máscara de telefone, validação e envio do formulário
└── assets/
    ├── img/            → símbolo da marca, favicon e mapa-base da RMR
    ├── icons/          → ícones de linha (24px)
    └── radar/          → camadas do radar de cobertura
```

## Figma

Link do Figma contendo o prototipo e todo o System Design do site: https://www.figma.com/design/YsVEajfnVygWz5KiBz4925/Super-Security---Landing-Page--Grupo-09-?node-id=0-1&t=cie2w3W4Mg8HkkQE-1

## Formulário

Ao enviar, o formulário valida os campos e abre o **WhatsApp comercial** com o resumo preenchido.
O envio do resumo por **e-mail** está pronto em `js/main.js` (função `enviarResumoPorEmail`, via FormSubmit),
mas vem desligado porque o e-mail é fictício. Para ligar:

1. Troque `EMAIL_COMERCIAL` por um e-mail real e `WHATSAPP` pelo número real (formato `55DDDNUMERO`).
2. Mude `ENVIAR_EMAIL` para `true`.
3. Envie o formulário uma vez e confirme o e-mail de ativação que o FormSubmit mandar.

> Telefones, e-mail e alvará são dados fictícios (placeholders) — substitua pelos oficiais.
> O ícone do WhatsApp é genérico; na versão final use o ícone oficial do brand kit do WhatsApp.
