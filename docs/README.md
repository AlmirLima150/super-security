# Documentação técnica — Super Security

Documentação do código da landing page institucional da **Super Security**,
desenvolvida no **Projeto Integrador · Engenharia da Computação · Grupo 09**.

> Comece pela [Visão geral](01-visao-geral.md). Para mexer no código, a
> [Arquitetura](02-arquitetura.md) e o [Guia de manutenção](09-guia-de-manutencao.md)
> são o caminho mais rápido.

## Sumário

| # | Documento | Conteúdo |
|---|-----------|----------|
| 01 | [Visão geral](01-visao-geral.md) | Objetivo, escopo, equipe, requisitos funcionais e não funcionais |
| 02 | [Arquitetura](02-arquitetura.md) | Estrutura de pastas, tecnologias, decisões técnicas, fluxo de carregamento |
| 03 | [Design system](03-design-system.md) | Cores, tipografia, grid, componentes e correspondência com o Figma |
| 04 | [HTML](04-html.md) | Seções da página, ids, landmarks e atributos importantes |
| 05 | [CSS](05-css.md) | Organização do `styles.css`, convenção de classes e breakpoints |
| 06 | [JavaScript](06-javascript.md) | Referência de todas as funções do `main.js` e fluxo do formulário |
| 07 | [Mapa e radar](07-mapa-e-radar.md) | Projeção geográfica e cálculo das posições dos pinos |
| 08 | [Acessibilidade](08-acessibilidade.md) | Critérios WCAG 2.1 AA atendidos e tabela de contraste |
| 09 | [Guia de manutenção](09-guia-de-manutencao.md) | Como alterar contatos, serviços, cores, ativar e-mail e publicar |
| 10 | [Testes](10-testes.md) | Plano de testes manuais e casos de teste do formulário |

## Índice rápido de arquivos

| Arquivo | O que é | Documentado em |
|---------|---------|----------------|
| [`index.html`](../index.html) | Estrutura das 8 seções | [04-html](04-html.md) |
| [`css/styles.css`](../css/styles.css) | Todos os estilos e o layout responsivo | [05-css](05-css.md), [03-design-system](03-design-system.md) |
| [`js/main.js`](../js/main.js) | Menu, navegação ativa, máscara e formulário | [06-javascript](06-javascript.md) |
| [`assets/`](../assets) | Ícones, marca, mapa e camadas do radar (SVG) | [02-arquitetura](02-arquitetura.md#assets) |

## Índice rápido de funções (JavaScript)

| Função / bloco | Seção no `main.js` | Referência |
|----------------|--------------------|------------|
| `WHATSAPP`, `EMAIL_COMERCIAL`, `ENVIAR_EMAIL` | §1 | [Configuração](06-javascript.md#1-configuração) |
| `openMenu()` / `closeMenu()` | §2 | [Menu mobile](06-javascript.md#2-menu-mobile) |
| `IntersectionObserver` do menu | §3 | [Navegação ativa](06-javascript.md#3-navegação-ativa) |
| Máscara de telefone | §4.2 | [Máscara](06-javascript.md#42-máscara-de-telefone) |
| Pré-seleção de serviço | §4.3 | [Pré-seleção](06-javascript.md#43-pré-seleção-do-serviço) |
| `rules` | §4.4 | [Regras](06-javascript.md#44-regras-de-validação) |
| `validate()` | §4.5 | [validate](06-javascript.md#45-validate) |
| `resumo()` | §4.6 | [resumo](06-javascript.md#46-resumod) |
| `enviarResumoPorEmail()` | §4.7 | [e-mail](06-javascript.md#47-enviarresumoporemaildados) |
| Envio do formulário | §4.8 | [submit](06-javascript.md#48-envio-do-formulário) |

## Índice rápido de classes CSS

| Bloco | Seção no `styles.css` | Uso |
|-------|-----------------------|-----|
| `:root` | 1 | Tokens de cor, fonte e medida |
| `.h1` `.h2` `.h3` `.title-serif` `.eyebrow` `.mono` | 3 | Estilos de texto |
| `.btn` `.btn--primary` `.btn--secondary` `.btn--whatsapp` | 4 | Botões |
| `.logo` | 4 | Assinatura da marca |
| `.site-header` `.main-nav` `.menu-toggle` | 5.1 | Cabeçalho |
| `.mobile-menu` | 5.2 | Menu do celular |
| `.hero` `.stats` | 5.3 | Topo da página e indicadores |
| `.radar` `.map` `.pin` `.ring` `.km` | 5.4 | Radar e mapa |
| `.section` `.split` `.columns-3` | 5.5 | Layout das seções |
| `.service` | 5.7 | Lista de serviços |
| `.quote` `.form` `.field` | 5.9 | Orçamento e formulário |
| `.site-footer` | 5.10 | Rodapé |
| `.fab` `.sticky-cta` | 5.11–5.12 | Elementos fixos |

Lista completa em [05-css.md](05-css.md#catálogo-de-classes).
