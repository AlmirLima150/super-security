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
├── docs/               → documentação técnica
└── assets/
    ├── img/            → símbolo da marca, favicon e mapa-base da RMR
    ├── icons/          → ícones de linha (24px)
    └── radar/          → camadas do radar de cobertura
```

## Documentação

A documentação técnica completa está em [`docs/`](docs/README.md):

| # | Documento | Conteúdo |
|---|-----------|----------|
| 01 | [Visão geral](docs/01-visao-geral.md) | Objetivo, escopo, equipe e requisitos |
| 02 | [Arquitetura](docs/02-arquitetura.md) | Estrutura, tecnologias e decisões técnicas |
| 03 | [Design system](docs/03-design-system.md) | Cores, tipografia, grid e componentes |
| 04 | [HTML](docs/04-html.md) | Seções, ids e acessibilidade da marcação |
| 05 | [CSS](docs/05-css.md) | Organização, breakpoints e catálogo de classes |
| 06 | [JavaScript](docs/06-javascript.md) | Referência das funções e fluxo do formulário |
| 07 | [Mapa e radar](docs/07-mapa-e-radar.md) | Projeção geográfica e posição dos pinos |
| 08 | [Acessibilidade](docs/08-acessibilidade.md) | Critérios WCAG 2.1 AA e contraste |
| 09 | [Guia de manutenção](docs/09-guia-de-manutencao.md) | Como alterar contatos, serviços, cores e publicar |
| 10 | [Testes](docs/10-testes.md) | Plano de testes e casos de teste |

Cada arquivo de código (`index.html`, `css/styles.css`, `js/main.js`) começa com um
índice em comentário, com a mesma numeração usada na documentação.

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
