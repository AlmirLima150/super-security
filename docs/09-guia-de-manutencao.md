# 09 · Guia de manutenção

[← Acessibilidade](08-acessibilidade.md) · [Sumário](README.md) · [Próximo: Testes →](10-testes.md)

Receitas para as alterações mais comuns.

## Sumário
- [Rodar o projeto](#rodar-o-projeto)
- [Trocar telefones, WhatsApp e e-mail](#trocar-telefones-whatsapp-e-e-mail)
- [Ativar o envio por e-mail](#ativar-o-envio-por-e-mail)
- [Adicionar ou editar um serviço](#adicionar-ou-editar-um-serviço)
- [Mudar uma cor ou fonte](#mudar-uma-cor-ou-fonte)
- [Adicionar uma seção](#adicionar-uma-seção)
- [Publicar no GitHub Pages](#publicar-no-github-pages)
- [Fluxo de trabalho com Git](#fluxo-de-trabalho-com-git)

## Rodar o projeto

1. Abra a pasta `super-security` no VS Code (*File → Open Folder*).
2. Instale a extensão **Live Server**.
3. Clique com o botão direito em `index.html` → **Open with Live Server**.

Para ver a versão de celular: `F12` → *Toggle device toolbar* → largura 390px.

## Trocar telefones, WhatsApp e e-mail

Os contatos aparecem em vários pontos. Use **Ctrl+Shift+F** no VS Code e busque:

| Buscar | Onde aparece | Trocar por |
|--------|--------------|------------|
| `3000-0000` | barra superior, botão de emergência, telefones, rodapé | telefone de plantão formatado |
| `+558130000000` | links `tel:` | `+55` + DDD + número |
| `99999-0000` | telefones da seção de orçamento | WhatsApp formatado |
| `5581999990000` | `main.js` §1 e links `wa.me` no HTML | `55` + DDD + número |
| `contato@supersecurity.com.br` | rodapé e `main.js` §1 | e-mail real |

## Ativar o envio por e-mail

O resumo é enviado pelo serviço gratuito [FormSubmit](https://formsubmit.co), sem servidor próprio.

1. Em `js/main.js` §1, troque `EMAIL_COMERCIAL` pelo e-mail real.
2. Mude `ENVIAR_EMAIL` para `true`.
3. Abra o site e envie o formulário uma vez.
4. O FormSubmit manda um e-mail de **ativação** para esse endereço. Clique no link.
5. A partir daí, cada envio chega na caixa de entrada.

## Adicionar ou editar um serviço

1. **Lista de serviços** — em `index.html`, seção `04 · Serviços`, copie um `<li>` inteiro e ajuste:
   - `data-servico="Nome do Serviço"`
   - número em `.service__num`
   - ícone em `assets/icons/` (e o `src` do `<img>`)
   - título e descrição
2. **Formulário** — acrescente `<option>Nome do Serviço</option>` no `<select id="servico">`.
   O texto deve ser **igual** ao `data-servico`.
3. **Rodapé** — acrescente o item na lista "SERVIÇOS".

Para um ícone novo, copie um SVG de `assets/icons/` e troque o desenho; mantenha
`width="24" height="24"`, `stroke-width="2"` e a cor no atributo `stroke`.

## Mudar uma cor ou fonte

Todas as cores estão em `css/styles.css`, seção **1. Design tokens**:

```css
:root {
  --accent-gold-shield: #d4af37;   /* mude aqui e o site inteiro acompanha */
}
```

Para trocar uma fonte: altere o link do Google Fonts no `<head>` do `index.html`
e a variável `--font-serif`, `--font-sans` ou `--font-mono`.

> Depois de mudar cores, confira o contraste ([08-acessibilidade](08-acessibilidade.md#contraste)).

## Adicionar uma seção

1. No `index.html`, dentro de `<main>`:
   ```html
   <!-- NN · Nome da seção -->
   <section class="section section--white" id="nova" aria-labelledby="nova-title">
     <div class="container">
       <div class="split">
         <div class="split__title">
           <p class="eyebrow navy">05 — NOVA</p>
           <h2 class="h2" id="nova-title">Título</h2>
         </div>
         <p class="split__text">Texto…</p>
       </div>
     </div>
   </section>
   ```
2. Para aparecer no menu: adicione o link em `.main-nav`, em `#mobile-menu` e no rodapé.
3. Para o destaque automático no menu: inclua o id na lista `sections` do `main.js` §3.
4. Atualize o índice no topo do `index.html` e a [documentação do HTML](04-html.md).

## Publicar no GitHub Pages

1. No repositório: **Settings → Pages**.
2. *Source*: **Deploy from a branch** · *Branch*: `main` · pasta `/ (root)`.
3. Salve. Em alguns minutos o site fica em `https://<usuário>.github.io/<repositório>/`.

## Fluxo de trabalho com Git

```bash
git pull                              # pega as alterações do grupo
git checkout -b ajuste-servicos       # cria um branch para a tarefa
# ... edita os arquivos ...
git add .
git commit -m "Adiciona serviço de ronda motorizada"
git push -u origin ajuste-servicos    # envia e abre um Pull Request no GitHub
```

Boas práticas do grupo:
- Um branch por tarefa e Pull Request revisado por outro integrante.
- Mensagens de commit no imperativo e em português ("Adiciona…", "Corrige…").
- Ao mudar o comportamento, atualize o comentário do código e o documento em `docs/`.
