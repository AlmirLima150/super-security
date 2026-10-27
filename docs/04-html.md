# 04 · HTML (`index.html`)

[← Design system](03-design-system.md) · [Sumário](README.md) · [Próximo: CSS →](05-css.md)

## Sumário
- [Estrutura geral](#estrutura-geral)
- [Mapa de seções](#mapa-de-seções)
- [Seção a seção](#seção-a-seção)
- [Ids usados pelo JavaScript e pelos links](#ids-usados-pelo-javascript-e-pelos-links)
- [Atributos de acessibilidade](#atributos-de-acessibilidade)
- [Convenções](#convenções)

## Estrutura geral

```
<html lang="pt-BR">
├── <head>  metadados, favicon, fontes, styles.css
└── <body>
    ├── a.skip-link                     atalho "Pular para o conteúdo"
    ├── div.utility-bar                 00
    ├── header.site-header#topo         01
    ├── div.mobile-menu#mobile-menu     01b (oculto por padrão)
    ├── main#conteudo
    │   ├── section.hero#inicio         02
    │   ├── section#sobre               03
    │   ├── section#servicos            04
    │   ├── section#diferenciais        05
    │   └── section.quote#contato       06
    ├── footer.site-footer              07
    ├── div.sticky-cta                  09 (só no celular)
    ├── a.fab                           08
    └── <script src="js/main.js" defer>
```

O início do arquivo tem um comentário com o **índice de seções**; cada seção
começa com um comentário `<!-- NN · Nome -->` igual ao nome do frame no Figma.

## Mapa de seções

| Nº | Seção | Elemento / id | Fundo | Conteúdo |
|----|-------|---------------|-------|----------|
| 00 | Barra institucional | `.utility-bar` | Navy | Autorização PF, coordenadas, plantão |
| 01 | Header | `header#topo` | Navy | Logo, menu, botão de orçamento, botão hambúrguer |
| 01b | Menu mobile | `#mobile-menu` | Navy | Lista numerada e botões de ação |
| 02 | Hero | `section#inicio` | Navy | Título, subtítulo, 2 botões, radar, 4 indicadores |
| 03 | Sobre Nós | `section#sobre` | Cinza claro | Texto institucional e 3 pilares |
| 04 | Serviços | `section#servicos` | Branco | Lista numerada dos 5 serviços |
| 05 | Diferenciais | `section#diferenciais` | Surface | 3 diferenciais |
| 06 | Orçamento | `section#contato` | Navy + cinza | Proposta, mapa, telefones e formulário |
| 07 | Footer | `footer.site-footer` | Navy | Marca, links, contato e créditos |
| 08 | FAB | `a.fab` | Verde | Atalho fixo para o WhatsApp |
| 09 | Barra fixa | `.sticky-cta` | Navy | Orçamento + ligar (celular) |

## Seção a seção

### 00 · Barra institucional
Dois `<p class="mono">`. No celular, o trecho `.hide-mobile` some e aparece `.show-mobile` ("· 24H").

### 01 · Header
- `.logo` — link para `#inicio` com símbolo, divisor e textos da marca.
- `nav.main-nav` — lista de 5 links; o link atual recebe `.is-active` (via JS).
- `.header-cta` — botão dourado pequeno.
- `.menu-toggle` — botão com 3 `<span>` (as linhas do hambúrguer); `aria-controls="mobile-menu"`.

### 01b · Menu mobile
`<div id="mobile-menu" hidden>`: cabeçalho com logo e botão `.menu-close`,
lista `<ol>` numerada 01–05 e rodapé com dois botões. Aberto/fechado por `main.js` §2.

### 02 · Hero
- `.hero__content` — `.eyebrow`, `<h1 class="h1">` (o trecho `<em>24 Horas</em>` fica em itálico dourado), `.hero__lead` e `.hero__actions`.
- `figure.radar-wrap` — radar de cobertura (detalhes em [07](07-mapa-e-radar.md)):
  - `.radar` (`role="img"` com `aria-label` descritivo)
  - `.radar__mask` — círculo com o mapa, varredura, anéis e pinos
  - `.radar__ring` — anel de 15 km com graduação
  - `.radar__cardinal--n/s/l/o` — pontos cardeais
  - `figcaption.map-legend` — legenda numerada (visível só no celular)
- `ul.stats` — 3 indicadores + selo da Polícia Federal.

### 03 · Sobre Nós
`.split` (título à esquerda, texto à direita) + `ul.columns-3.pillars` com 3 `li.pillar` (numeração romana I–III).

### 04 · Serviços
`.split--bottom` + `ol.services`. Cada item é um link `a.service` para `#contato` com:

| Elemento | Conteúdo |
|----------|----------|
| `data-servico` | Nome exato da opção do `<select id="servico">` |
| `.service__num` | 01–05 |
| `.service__title` | Ícone + nome do serviço |
| `.service__desc` | Descrição |
| `.service__arrow` | Seta |

### 05 · Diferenciais
Igual à estrutura dos pilares, com `li.highlight` e títulos `.title-serif.gold`.

### 06 · Orçamento
- `.quote__left` — texto, `figure.map-wrap` (mapa esquemático + legenda) e `.phones` (2 links `tel:`/`wa.me`).
- `.quote__right` — `form#form-orcamento` com `novalidate` (a validação é feita pelo JS):

| Campo | `id` / `name` | Tipo | Obrigatório |
|-------|---------------|------|-------------|
| Nome Completo | `nome` | `text` | sim |
| Telefone / WhatsApp | `telefone` | `tel` | sim |
| E-mail | `email` | `email` | sim |
| Segmento | `segmento` | `select` (4 opções) | sim |
| Serviço Principal | `servico` | `select` (5 opções) | sim |
| Detalhes | `detalhes` | `textarea` | não |

Cada campo fica dentro de `.field` com um `<span class="field__error" aria-live="polite">`.
Após o envio, a mensagem aparece em `.form__status` (`role="status"`).

### 07 · Footer
`.footer__cols` com `.footer__brand`, `.footer__lists` (navegação e serviços) e `address.footer__contact`; `.footer__bar` com créditos do grupo.

### 08 · FAB e 09 · Barra fixa
`a.fab` abre `wa.me` em nova aba. `.sticky-cta` só é exibida em telas ≤ 767px.

## Ids usados pelo JavaScript e pelos links

| Id | Usado por |
|----|-----------|
| `#inicio` `#sobre` `#servicos` `#diferenciais` `#contato` | Links do menu, `IntersectionObserver` (`main.js` §3) |
| `#mobile-menu` | `openMenu()` / `closeMenu()` (`main.js` §2) |
| `#form-orcamento` | Validação e envio (`main.js` §4) |
| `#telefone` | Máscara (`main.js` §4.2) |
| `#servico` | Pré-seleção (`main.js` §4.3) |
| `#conteudo` | Destino do `.skip-link` |

> Se renomear algum id, atualize também o `main.js` e os `href` do menu.

## Atributos de acessibilidade

| Atributo | Onde | Função |
|----------|------|--------|
| `lang="pt-BR"` | `<html>` | Pronúncia correta em leitores de tela |
| `aria-label` | logo, botões só com ícone, `<nav>`, radar, mapa | Nome acessível |
| `aria-expanded` / `aria-controls` | `.menu-toggle` | Estado do menu |
| `aria-labelledby` | cada `<section>` | Associa a seção ao seu título |
| `aria-live="polite"` | `.field__error`, `.form__status` | Anuncia erros e confirmação |
| `aria-invalid` | campos inválidos (via JS) | Indica erro ao leitor de tela |
| `alt=""` | ícones decorativos | Leitores de tela ignoram |
| `role="img"` | `.radar`, `.map` | Composição tratada como uma imagem com descrição |
| `autocomplete` | nome, telefone, e-mail | Preenchimento automático |

## Convenções

- Títulos em ordem: um `<h1>`, `<h2>` por seção, `<h3>` em itens.
- Listas reais (`ul`/`ol`) para menus, pilares, serviços e indicadores.
- Links externos com `target="_blank" rel="noopener"`.
- Nada de estilo inline, exceto posições calculadas do mapa e do radar.
