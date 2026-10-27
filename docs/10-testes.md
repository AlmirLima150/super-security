# 10 · Testes

[← Guia de manutenção](09-guia-de-manutencao.md) · [Sumário](README.md)

Plano de testes manuais. Marque o resultado a cada entrega.

## Sumário
- [Ambientes](#ambientes)
- [Casos de teste — navegação](#casos-de-teste--navegação)
- [Casos de teste — formulário](#casos-de-teste--formulário)
- [Casos de teste — responsividade](#casos-de-teste--responsividade)
- [Casos de teste — acessibilidade](#casos-de-teste--acessibilidade)
- [Ferramentas de apoio](#ferramentas-de-apoio)

## Ambientes

| Navegador | Desktop (1440) | Tablet (768) | Celular (390) |
|-----------|----------------|--------------|---------------|
| Chrome | ☐ | ☐ | ☐ |
| Edge | ☐ | ☐ | ☐ |
| Firefox | ☐ | ☐ | ☐ |
| Safari (iPhone) | — | — | ☐ |

## Casos de teste — navegação

| ID | Passos | Resultado esperado | Req. | OK |
|----|--------|--------------------|------|----|
| CT01 | Clicar em "Serviços" no menu | Rola suavemente até a seção; o título não fica atrás do header | RF01, RF02 | ☐ |
| CT02 | Rolar a página devagar | O link da seção visível fica branco com sublinhado dourado | RF03 | ☐ |
| CT03 | Em 390px, tocar no hambúrguer | Abre o menu em tela cheia; a página por trás não rola | RF04 | ☐ |
| CT04 | Com o menu aberto, tocar em "Contato" | Menu fecha e a página vai até o formulário | RF04 | ☐ |
| CT05 | Com o menu aberto, apertar `Esc` | Menu fecha e o foco volta ao hambúrguer | RF04 | ☐ |
| CT06 | Clicar no serviço "Escolta Armada e Transporte" | Vai ao formulário com esse serviço já selecionado | RF06 | ☐ |
| CT07 | Clicar no botão verde flutuante | Abre o WhatsApp em nova aba | RF12 | ☐ |
| CT08 | No celular, tocar no ícone de telefone da barra fixa | Abre o discador com (81) 3000-0000 | RF13 | ☐ |

## Casos de teste — formulário

| ID | Entrada | Resultado esperado | Req. | OK |
|----|---------|--------------------|------|----|
| CT09 | Enviar tudo vazio | 5 mensagens de erro; foco no campo "Nome" | RF08 | ☐ |
| CT10 | Nome "Al" | "Informe seu nome completo." | RF08 | ☐ |
| CT11 | Digitar `81999990000` no telefone | Campo mostra `(81) 9 9999-0000` | RF09 | ☐ |
| CT12 | Digitar `8130000000` no telefone | Campo mostra `(81) 3000-0000` | RF09 | ☐ |
| CT13 | Digitar letras no telefone | Letras são descartadas | RF09 | ☐ |
| CT14 | Telefone com 9 dígitos | "Informe um telefone com DDD." | RF08 | ☐ |
| CT15 | E-mail `maria@empresa` | "Informe um e-mail válido." | RF08 | ☐ |
| CT16 | Sem escolher segmento | "Selecione o segmento." | RF08 | ☐ |
| CT17 | Corrigir um campo com erro e reenviar | Erro daquele campo some | RF08 | ☐ |
| CT18 | Todos os campos válidos | Abre `wa.me` com o resumo, aparece a mensagem verde e o formulário é limpo | RF10 | ☐ |
| CT19 | Campo "Detalhes" vazio | O resumo não tem a linha "Detalhes" | RF10 | ☐ |
| CT20 | `ENVIAR_EMAIL = true` com e-mail ativado | Resumo chega no e-mail com assunto "Novo orçamento — <serviço>" | RF11 | ☐ |

## Casos de teste — responsividade

| ID | Largura | Verificar | OK |
|----|---------|-----------|----|
| CT21 | 1440px | Layout igual ao frame desktop do Figma | ☐ |
| CT22 | 1280px | Margens menores, nada cortado | ☐ |
| CT23 | 1024px | Hambúrguer aparece; radar abaixo do texto; indicadores 2×2 | ☐ |
| CT24 | 390px | Layout igual ao frame mobile; rótulos do mapa viram números + legenda | ☐ |
| CT25 | 320px | Nenhuma rolagem horizontal | ☐ |
| CT26 | Zoom 200% (desktop) | Conteúdo legível, sem sobreposição | ☐ |

## Casos de teste — acessibilidade

| ID | Passos | Resultado esperado | OK |
|----|--------|--------------------|----|
| CT27 | Apertar `Tab` ao abrir a página | Aparece "Pular para o conteúdo" | ☐ |
| CT28 | Navegar só com `Tab` até enviar o formulário | Todos os elementos recebem foco com contorno dourado | ☐ |
| CT29 | Ativar "reduzir movimento" no sistema | Radar para de girar | ☐ |
| CT30 | Lighthouse → Accessibility | Pontuação ≥ 95 | ☐ |
| CT31 | Leitor de tela (NVDA / VoiceOver) no formulário com erro | Mensagem de erro é anunciada | ☐ |

## Ferramentas de apoio

| Ferramenta | Uso |
|------------|-----|
| DevTools → *Toggle device toolbar* | Simular celular e tablet |
| DevTools → **Lighthouse** | Desempenho, acessibilidade, boas práticas, SEO |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Conferir contraste de cores |
| [W3C Validator](https://validator.w3.org/) | Validar o HTML |
| NVDA (Windows) / VoiceOver (Mac, iPhone) | Leitor de tela |
