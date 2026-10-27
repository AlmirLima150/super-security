# 03 · Design system

[← Arquitetura](02-arquitetura.md) · [Sumário](README.md) · [Próximo: HTML →](04-html.md)

O design system foi criado no Figma (página **🎨 Design System** e **✦ Marca / Logo**)
e reproduzido no CSS como variáveis e classes. Esta página é a tabela de
correspondência entre os dois.

## Sumário
- [Cores](#cores)
- [Tipografia](#tipografia)
- [Grid e espaçamento](#grid-e-espaçamento)
- [Componentes](#componentes)
- [Marca](#marca)
- [Correspondência Figma → código](#correspondência-figma--código)

## Cores

Definidas em `:root` (`styles.css` §1).

### Paleta principal

| Token Figma | Variável CSS | Hex | Uso |
|-------------|--------------|-----|-----|
| Primary / Navy Dark | `--primary-navy-dark` | `#0A1128` | Fundos escuros (header, hero, orçamento, footer) |
| Primary / Surface | `--primary-surface` | `#101F42` | Seção Diferenciais, rótulos em fundo claro |
| Accent / Gold Shield | `--accent-gold-shield` | `#D4AF37` | Destaques, botão primário, marca |
| Neutral / Background | `--neutral-background` | `#F4F6F9` | Seção Sobre Nós, fundo do formulário |
| Neutral / Text-Primary | `--neutral-text-primary` | `#1A202C` | Texto em fundo claro |
| Neutral / Text-Light | `--neutral-text-light` | `#FFFFFF` | Texto em fundo escuro |
| CTA / Action Green | `--cta-action-green` | `#25D366` | Botões de WhatsApp |

### Cores de apoio

| Token Figma | Variável CSS | Hex | Uso |
|-------------|--------------|-----|-----|
| Support / Surface-White | `--support-surface-white` | `#FFFFFF` | Seção Serviços, cartão do formulário |
| Support / Text-Secondary | `--support-text-secondary` | `#4A5568` | Descrições em fundo claro |
| Support / Text-Muted | `--support-text-muted` | `#64748B` | Placeholders e notas |
| Support / Text-On-Dark | `--support-text-on-dark` | `#CBD5E1` | Texto secundário em fundo escuro |
| Support / Border | `--support-border` | `#E2E8F0` | Divisórias em fundo claro |
| Support / Border-Input | `--support-border-input` | `#7B8494` | Borda dos campos |
| — | `--hairline-dark` | `rgba(255,255,255,.12)` | Linhas finas em fundo escuro |

> **Regra de uso:** o dourado nunca é usado como cor de texto sobre fundo claro
> (contraste insuficiente). Ver [08-acessibilidade](08-acessibilidade.md#contraste).

## Tipografia

Três famílias, carregadas do Google Fonts no `<head>`:

| Família | Papel | Variável |
|---------|-------|----------|
| **Newsreader** | Títulos (serifa editorial) | `--font-serif` |
| **Inter** | Texto corrido e interface | `--font-sans` |
| **JetBrains Mono** | Rótulos, numeração, dados técnicos | `--font-mono` |

### Escala (desktop)

| Estilo Figma | Classe | Fonte | Tamanho / altura de linha / espaçamento |
|--------------|--------|-------|----------------------------------------|
| Heading/H1 | `.h1` | Newsreader Regular | 64px / 108% / −1,5% |
| Heading/H2 | `.h2` | Newsreader Regular | 40px / 118% / −1% |
| Heading/H3 | `.h3` | Inter Semi Bold | 19px / 140% / −0,5% |
| Display/Title | `.title-serif`, `.service__title` | Newsreader Regular | 28px / 125% / −0,5% |
| Display/Stat | `.stat__value` | Newsreader Regular | 44px / 100% / −1% |
| Body/Large | `.body-lg`, `.hero__lead` | Inter Regular | 18px / 150% |
| Body/Regular | `body` | Inter Regular | 16px / 150% |
| Caption/Small | `.caption` | Inter Regular | 13px / 150% |
| Label/Button | `.btn` | Inter Semi Bold | 15px / 120% / +0,5% |
| Label/Field | `.field label` | Inter Medium | 14px / 140% |
| Label/Nav | `.main-nav a` | Inter Medium | 14px / 140% |
| Label/Eyebrow | `.eyebrow` | JetBrains Mono Medium | 12px / 140% / +10% |
| Label/Mono | `.mono` | JetBrains Mono Regular | 11px / 140% / +6% |

### Escala mobile (≤ 767px)

| Estilo Figma | Aplica em | Valor |
|--------------|-----------|-------|
| Mobile/H1 | `.h1` | 40px / 110% / −1% |
| Mobile/H2 | `.h2` | 30px / 120% / −0,5% |
| Mobile/Title | `.title-serif`, `.service__title` | 22px / 130% |
| Mobile/Stat | `.stat__value` | 26px / 105% |

## Grid e espaçamento

| Item | Desktop (1440) | Celular (390) |
|------|----------------|---------------|
| Colunas | 12 | 4 |
| Largura do conteúdo | 1200px (`--content`) | 350px |
| Margens laterais | 120px | 20px |
| Gutter | 24px (`--gutter`) | 16px |
| Espaço vertical das seções | 128px (`--section-y`) | 64px |
| Coluna de título (5 colunas) | 486px (`--col-5`) | 100% |
| Recuo entre título e texto | 126px (`--gap-col`) | empilhado |
| Raio de borda | 2px (`--radius`) | 2px |

## Componentes

| Componente Figma | Variantes | Implementação |
|------------------|-----------|---------------|
| **Button** | Primary · Secondary · WhatsApp | `.btn` + `.btn--primary` / `.btn--secondary` / `.btn--whatsapp`; tamanhos `.btn--sm`, `.btn--block` |
| **Input** | Text · Select · Textarea | `.field` com `<input>`, `<select>` ou `<textarea>` |
| **Brand/Logo** | Theme=Dark · Theme=Light | `.logo` (versão escura) |
| **Brand/Symbol** | Gold · Navy · White | `assets/img/simbolo-*.svg` |
| **Map/Recife RMR** | — | `assets/img/mapa-recife-rmr.svg` (`.map-base`) |
| **FAB/WhatsApp** | — | `.fab` |
| **Icon/*** | 16 ícones | `assets/icons/*.svg` |

### Botões

| Variante | Fundo | Texto | Borda | Uso |
|----------|-------|-------|-------|-----|
| Primary | Dourado | Navy | — | Ação principal (orçamento) |
| Secondary | Transparente | Branco | Branco 45% | Ação secundária em fundo escuro |
| WhatsApp | Verde | Navy | — | Envio do formulário |

Estados: `:hover` clareia o fundo; `:focus-visible` mostra contorno dourado de 2px.

## Marca

- **Símbolo:** escudo com filete interno e monograma "S" de traço reto.
- **Assinatura:** símbolo + divisor + "SUPER SECURITY" (Inter Semi Bold, espaçamento 24%)
  + descritor "SEGURANÇA PRIVADA · RECIFE/PE" (JetBrains Mono).
- **Tamanho mínimo:** 24px de altura (símbolo) e 120px de largura (assinatura).
- Regras completas na página **✦ Marca / Logo** do Figma.

## Correspondência Figma → código

| Figma | Código |
|-------|--------|
| Frame `Desktop — Landing Page (1440)` | `index.html` com estilos padrão |
| Frame `Mobile — Landing Page (390)` | `@media (max-width: 767px)` |
| Frame `Mobile — Menu aberto` | `#mobile-menu` |
| Seção `00 · Barra institucional` | `.utility-bar` |
| Seção `01 · Header / Navigation` | `.site-header` |
| Seção `02 · Hero` | `#inicio.hero` |
| Seção `03 · Sobre Nós & Conformidade Legal` | `#sobre` |
| Seção `04 · Serviços` | `#servicos` |
| Seção `05 · Diferenciais Competitivos` | `#diferenciais` |
| Seção `06 · Captação / Formulário` | `#contato.quote` |
| Seção `07 · Footer Institucional` | `.site-footer` |
| `08 · FAB WhatsApp` | `.fab` |
| `09 · Barra de ação fixa` | `.sticky-cta` |
