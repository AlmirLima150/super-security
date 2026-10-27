# 08 · Acessibilidade

[← Mapa e radar](07-mapa-e-radar.md) · [Sumário](README.md) · [Próximo: Guia de manutenção →](09-guia-de-manutencao.md)

Meta do projeto: **WCAG 2.1 nível AA**.

## Sumário
- [Contraste](#contraste)
- [Critérios atendidos](#critérios-atendidos)
- [Navegação por teclado](#navegação-por-teclado)
- [Leitores de tela](#leitores-de-tela)
- [Limitações conhecidas](#limitações-conhecidas)

## Contraste

Mínimos da WCAG AA: **4,5:1** para texto normal, **3:1** para texto grande
(≥ 24px, ou ≥ 18,66px em negrito) e para componentes de interface.

| Texto / elemento | Fundo | Contraste | Resultado |
|------------------|-------|-----------|-----------|
| Branco `#FFFFFF` | Navy `#0A1128` | 18,69:1 | ✅ |
| Cinza claro `#CBD5E1` | Navy `#0A1128` | 12,59:1 | ✅ |
| Dourado `#D4AF37` | Navy `#0A1128` | 8,89:1 | ✅ |
| Dourado `#D4AF37` | Surface `#101F42` | 7,70:1 | ✅ |
| Cinza claro `#CBD5E1` | Surface `#101F42` | 10,91:1 | ✅ |
| Navy (texto do botão) | Dourado `#D4AF37` | 8,89:1 | ✅ |
| Navy (texto do botão) | Verde `#25D366` | 9,42:1 | ✅ |
| Texto `#1A202C` | Cinza `#F4F6F9` | 15,07:1 | ✅ |
| Texto `#1A202C` | Branco | 16,32:1 | ✅ |
| Secundário `#4A5568` | Branco | 7,53:1 | ✅ |
| Secundário `#4A5568` | Cinza `#F4F6F9` | 6,95:1 | ✅ |
| Placeholder `#64748B` | Branco | 4,76:1 | ✅ |
| Rótulo `#101F42` | Cinza `#F4F6F9` | 14,96:1 | ✅ |
| Borda do campo `#7B8494` | Branco | 3,77:1 | ✅ (componente, mín. 3:1) |
| Erro `#B42318` | Branco | 6,57:1 | ✅ |
| Sucesso `#146C2E` | `#E8F8EE` | 5,94:1 | ✅ |
| ~~Branco~~ | ~~Verde `#25D366`~~ | 1,98:1 | ❌ por isso os botões verdes usam texto navy |
| ~~Dourado~~ | ~~Branco~~ | 2,10:1 | ❌ por isso o dourado não é usado como texto em fundo claro |

## Critérios atendidos

| Critério WCAG | Como |
|---------------|------|
| 1.1.1 Conteúdo não textual | Ícones decorativos com `alt=""`; radar e mapa com `role="img"` e `aria-label` |
| 1.3.1 Informações e relações | HTML semântico (`header`, `nav`, `main`, `section`, `footer`, `address`, listas), `<label for>` em todos os campos |
| 1.3.5 Identificar propósito do campo | `autocomplete="name"`, `"tel"`, `"email"` |
| 1.4.3 Contraste (mínimo) | Tabela acima |
| 1.4.4 Redimensionar texto | Tamanhos em px com layout flexível; funciona com zoom de 200% |
| 1.4.10 Refluxo | Sem rolagem horizontal até 320px de largura |
| 1.4.11 Contraste não textual | Bordas de campo 3,77:1; foco dourado sobre navy e branco |
| 2.1.1 Teclado | Todos os links, botões e campos são acessíveis com `Tab` |
| 2.3.3 Animação a partir de interações | Radar e transições desligados com `prefers-reduced-motion` |
| 2.4.1 Ignorar blocos | Link "Pular para o conteúdo" (`.skip-link`) |
| 2.4.3 Ordem do foco | Ordem do HTML = ordem visual; foco vai para dentro do menu ao abrir |
| 2.4.7 Foco visível | `:focus-visible` com contorno dourado de 2px |
| 2.5.5 Tamanho do alvo | Botões do menu e barra fixa com 44–52px |
| 3.1.1 Idioma da página | `lang="pt-BR"` |
| 3.3.1 Identificação de erro | Mensagem em texto abaixo do campo + `aria-invalid` |
| 3.3.2 Rótulos ou instruções | Rótulo visível em todos os campos; "*" indica obrigatório |
| 4.1.2 Nome, função, valor | `aria-expanded`, `aria-controls`, `aria-label` |
| 4.1.3 Mensagens de status | `aria-live="polite"` nos erros e `role="status"` na confirmação |

## Navegação por teclado

| Tecla | Ação |
|-------|------|
| `Tab` / `Shift+Tab` | Percorre links, botões e campos |
| `Enter` | Ativa links e botões, envia o formulário |
| `Esc` | Fecha o menu mobile |
| Setas | Escolhem a opção nos `<select>` |

## Leitores de tela

- Cada `<section>` é anunciada pelo seu título (`aria-labelledby`).
- O radar é lido como uma única imagem: *"Radar de cobertura com raio de 15 km…"*.
- Erros do formulário são anunciados assim que aparecem.
- Após o envio, a mensagem de confirmação é anunciada.

## Limitações conhecidas

- O ícone do WhatsApp é genérico (balão de conversa); a versão final deve usar o ícone oficial.
- Os rótulos do mapa não são lidos individualmente (o mapa inteiro tem uma descrição única).
- A validação de e-mail verifica só o formato, não se o endereço existe.
