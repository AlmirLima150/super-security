# 05 · CSS (`css/styles.css`)

[← HTML](04-html.md) · [Sumário](README.md) · [Próximo: JavaScript →](06-javascript.md)

## Sumário
- [Organização do arquivo](#organização-do-arquivo)
- [Convenção de nomes](#convenção-de-nomes)
- [Breakpoints](#breakpoints)
- [O que muda em cada breakpoint](#o-que-muda-em-cada-breakpoint)
- [Técnicas usadas](#técnicas-usadas)
- [Catálogo de classes](#catálogo-de-classes)

## Organização do arquivo

O arquivo começa com um **índice** em comentário. Cada bloco é marcado com
`/* ---------- N. Nome */`, então dá para pular direto com `Ctrl+F` buscando o número.

| Seção | Conteúdo |
|-------|----------|
| **1. Design tokens** | Variáveis em `:root` (cores, fontes, medidas) |
| **2. Base** | Reset (`box-sizing`, margens), elementos HTML, foco, `.skip-link`, `.container` |
| **3. Estilos de texto** | `.h1` `.h2` `.h3` `.title-serif` `.body-lg` `.caption` `.eyebrow` `.mono` + utilitários de cor |
| **4. Componentes** | `.btn` e variantes, `.logo` |
| **5. Seções** | 5.0 a 5.12, uma por parte da página |
| **6. Responsivo** | 6.1 notebook · 6.2 tablet · 6.3 celular · 6.4 movimento reduzido |

## Convenção de nomes

BEM simplificado:

```
.bloco              → componente      .service
.bloco__elemento    → parte dele      .service__title
.bloco--variante    → variação        .btn--primary
.is-estado          → estado via JS   .is-active
.has-estado         → estado via JS   .has-error
```

Utilitários pequenos: `.gold`, `.navy`, `.light`, `.on-dark`, `.muted`,
`.text-secondary` (cores) e `.hide-mobile` / `.show-mobile` (visibilidade).

## Breakpoints

A base é o **desktop** (1440px). Telas menores sobrescrevem com `max-width`:

| Nome | Regra | Referência |
|------|-------|------------|
| Desktop | padrão | Frame de 1440px |
| Notebook | `@media (max-width: 1280px)` | — |
| Tablet | `@media (max-width: 1024px)` | — |
| Celular | `@media (max-width: 767px)` | Frame de 390px |
| Movimento reduzido | `@media (prefers-reduced-motion: reduce)` | Preferência do sistema |

## O que muda em cada breakpoint

### 6.1 · ≤ 1280px
- Margens laterais de 120 → 64px.
- H1 de 64 → 56px; números dos indicadores de 44 → 36px.
- Colunas de título passam a 40% em vez de 486px fixos.

### 6.2 · ≤ 1024px
- Menu horizontal e botão do header somem; aparece o **hambúrguer**.
- Hero empilha: texto em cima, radar centralizado embaixo.
- Indicadores em grade 2×2.
- `.split` empilha título e texto.
- Orçamento: proposta em cima, formulário embaixo.

### 6.3 · ≤ 767px (frame mobile)
- Margens de 20px; estilos de texto `Mobile/*` (ver [03](03-design-system.md#escala-mobile--767px)).
- Botões do hero em largura total.
- **Mapa e radar:** rótulos longos viram números (`.label-short`) e a legenda `.map-legend` aparece abaixo.
- Serviços em bloco: número, ícone e seta numa linha, título e descrição embaixo.
- Formulário em uma coluna; texto do botão do WhatsApp pode quebrar.
- Aparece a `.sticky-cta` no rodapé da tela; o `.fab` sobe para ficar acima dela.

### 6.4 · Movimento reduzido
Desliga a rolagem suave, a rotação do radar e as transições.

## Técnicas usadas

| Técnica | Onde | Por quê |
|---------|------|---------|
| `position: sticky` | `.site-header` | Menu acompanha a rolagem |
| `scroll-padding-top` | `html` | A seção não fica escondida atrás do header ao rolar |
| `aspect-ratio` | `.radar`, `.map` | Mantém a proporção ao redimensionar |
| Posições em `%` | pinos, anéis, rótulos | Radar e mapa escalam sem desalinhar |
| `transform: translate(-50%, -50%)` | `.pin__halo`, `.pin__dot` | Centraliza o marcador no ponto exato |
| `@keyframes sweep` | `.radar__sweep` | Rotação contínua da varredura (6s) |
| `max(120px, calc(...))` | `.quote__inner` | Alinha ao grid mesmo em telas maiores que 1440 |
| `appearance: none` + `background` | `select` | Seta personalizada igual ao Figma |
| `backdrop-filter: blur()` | `.sticky-cta` | Fundo translúcido |
| `env(safe-area-inset-bottom)` | `.sticky-cta` | Respeita a barra do iPhone |
| `:focus-visible` | global | Contorno dourado só na navegação por teclado |

## Catálogo de classes

### Base e texto
| Classe | Descrição |
|--------|-----------|
| `.container` | Centraliza e aplica as margens laterais |
| `.skip-link` | Link "Pular para o conteúdo" (aparece ao receber foco) |
| `.h1` `.h2` `.h3` | Títulos |
| `.title-serif` | Título serifado de 28px (cards, telefones, formulário) |
| `.body-lg` / `.caption` | Texto 18px / 13px |
| `.eyebrow` | Rótulo mono de seção ("01 — SOBRE NÓS") |
| `.mono` | Texto mono pequeno |

### Componentes
| Classe | Descrição |
|--------|-----------|
| `.btn` | Base dos botões |
| `.btn--primary` / `--secondary` / `--whatsapp` | Variantes |
| `.btn--sm` / `.btn--block` | Tamanho menor / largura total |
| `.logo` `.logo__symbol` `.logo__divider` `.logo__wordmark` `.logo__name` `.logo__descriptor` | Assinatura da marca |

### Header e menu
| Classe | Descrição |
|--------|-----------|
| `.utility-bar` `.utility-bar__inner` | Barra superior |
| `.site-header` `.site-header__inner` | Cabeçalho fixo |
| `.main-nav` | Menu desktop (link ativo: `.is-active`) |
| `.menu-toggle` | Botão hambúrguer |
| `.mobile-menu` `__header` `__list` `__label` `__footer` | Menu do celular |
| `.menu-close` | Botão de fechar |

### Hero, radar e mapa
| Classe | Descrição |
|--------|-----------|
| `.hero` `.hero__row` `.hero__content` `.hero__lead` `.hero__actions` | Topo da página |
| `.stats` `.stat` `.stat__value` `.stat__label` `.stat--seal` | Indicadores |
| `.radar-wrap` `.radar` `.radar__mask` `.radar__ring` `.radar__layer` `.radar__sweep` `.radar__crosshair` | Radar |
| `.radar__cardinal--n/s/l/o` `.radar__km15` | Pontos cardeais e rótulo de 15 km |
| `.map-wrap` `.map` | Mapa do formulário |
| `.map-base` | Imagem do mapa-base (compartilhada) |
| `.ring` `.km` `.km--sw` `.km--nw` | Anéis de distância e rótulos |
| `.pin` `.pin--base` `.pin--ut` `.pin--R` `.pin--L` | Marcador (tipo e lado do rótulo) |
| `.pin__halo` `.pin__dot` `.pin__label` `.label-long` `.label-short` | Partes do marcador |
| `.map-note` `.map-ocean` `.map-north` `.map-scale` `.map-legend-inline` | Anotações do mapa |
| `.map-legend` `.legend-mark` | Legenda numerada (celular) |

### Seções
| Classe | Descrição |
|--------|-----------|
| `.section` `--light` `--white` `--surface` | Seção padrão e fundos |
| `.split` `.split--bottom` `.split__title` `.split__text` | Título à esquerda + texto à direita |
| `.columns-3` | Grade de 3 colunas |
| `.pillar` | Pilar (Sobre Nós) |
| `.services` `.service` `__num` `__title` `__desc` `__arrow` | Lista de serviços |
| `.highlight` | Diferencial |
| `.quote` `__left` `__inner` `__right` | Seção de orçamento |
| `.phones` `.phone` | Telefones de plantão |
| `.form` `__header` `__row` `__note` `__status` | Formulário |
| `.field` `.field--select` `.field__error` `.has-error` | Campo |
| `.site-footer` `.footer__cols` `__brand` `__lists` `__contact` `__bar` | Rodapé |
| `.fab` | Botão flutuante do WhatsApp |
| `.sticky-cta` `.sticky-cta__call` | Barra fixa do celular |
