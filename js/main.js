/**
 * ============================================================================
 * Super Security — Landing Page
 * Arquivo: js/main.js
 * Projeto Integrador · Grupo 09
 *
 * Comportamentos da página. Script único, sem dependências, carregado com
 * `defer` no fim do <body>. Tudo fica dentro de uma IIFE para não criar
 * variáveis globais.
 *
 * Documentação completa: docs/06-javascript.md
 *
 * ÍNDICE
 *   1. Configuração ............ constantes de contato e envio
 *   2. Menu mobile ............. abrir, fechar, ESC e travar o scroll
 *   3. Navegação ativa ......... destaca o link da seção visível
 *   4. Formulário
 *      4.1 Referências ......... elementos usados pelo formulário
 *      4.2 Máscara de telefone . (81) 9 0000-0000 / (81) 3000-0000
 *      4.3 Pré-seleção ......... clique num serviço preenche o <select>
 *      4.4 Regras de validação
 *      4.5 validate() .......... aplica as regras e mostra os erros
 *      4.6 resumo() ............ monta o texto enviado ao WhatsApp/e-mail
 *      4.7 enviarResumoPorEmail()
 *      4.8 Envio (submit) ...... fluxo completo do formulário
 * ============================================================================
 */

(function () {
  "use strict";

  /* ==========================================================================
     1. CONFIGURAÇÃO
     Altere aqui os dados de contato. Os valores atuais são fictícios.
     ========================================================================== */

  /** Número do WhatsApp comercial no formato internacional: 55 + DDD + número. */
  var WHATSAPP = "5581999990000";

  /** E-mail que recebe o resumo de cada solicitação de orçamento. */
  var EMAIL_COMERCIAL = "contato@supersecurity.com.br";

  /**
   * Liga/desliga o envio do resumo por e-mail (serviço FormSubmit).
   * Mantenha `false` enquanto EMAIL_COMERCIAL for fictício.
   */
  var ENVIAR_EMAIL = false;


  /* ==========================================================================
     2. MENU MOBILE
     Em telas ≤ 1024px o menu horizontal some e aparece o botão "hambúrguer",
     que abre o painel #mobile-menu em tela cheia.
     ========================================================================== */

  var toggle = document.querySelector(".menu-toggle");   // botão hambúrguer
  var menu = document.getElementById("mobile-menu");     // painel do menu
  var closeBtn = document.querySelector(".menu-close");  // botão "X"

  /**
   * Abre o menu mobile.
   * - Remove o atributo `hidden` do painel.
   * - Atualiza `aria-expanded` para leitores de tela.
   * - Trava a rolagem da página por trás do menu.
   * - Move o foco para o botão de fechar (acessibilidade por teclado).
   */
  function openMenu() {
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  /**
   * Fecha o menu mobile e devolve o foco ao botão hambúrguer.
   */
  function closeMenu() {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    toggle.focus();
  }

  toggle.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  // Clicar em qualquer link do menu fecha o painel (a rolagem até a seção é
  // feita pelo navegador, via `scroll-behavior: smooth` no CSS).
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });

  // Tecla ESC fecha o menu.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.hidden) closeMenu();
  });


  /* ==========================================================================
     3. NAVEGAÇÃO ATIVA
     Usa IntersectionObserver para saber qual seção está no meio da tela e
     aplica a classe `.is-active` no link correspondente do menu desktop.
     ========================================================================== */

  var navLinks = document.querySelectorAll(".main-nav a");

  /** Seções observadas, na mesma ordem do menu. */
  var sections = ["inicio", "sobre", "servicos", "diferenciais", "contato"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, {
      // Considera "ativa" a seção que cruza uma faixa fina no meio da tela
      // (45% do topo e 50% do rodapé são ignorados).
      rootMargin: "-45% 0px -50% 0px"
    });
    sections.forEach(function (s) { observer.observe(s); });
  }


  /* ==========================================================================
     4. FORMULÁRIO DE ORÇAMENTO (#form-orcamento)
     ========================================================================== */

  /* ---------- 4.1 Referências */
  var form = document.getElementById("form-orcamento");
  var tel = document.getElementById("telefone");
  var servicoSelect = document.getElementById("servico");
  var status = form.querySelector(".form__status");  // mensagem de sucesso (aria-live)

  /* ---------- 4.2 Máscara de telefone
     Formata enquanto o usuário digita, aceitando só números:
       11 dígitos (celular) → (81) 9 0000-0000
       10 dígitos (fixo)    → (81) 3000-0000 */
  tel.addEventListener("input", function () {
    var d = tel.value.replace(/\D/g, "").slice(0, 11);
    var out = d;
    if (d.length > 0) out = "(" + d.slice(0, 2);
    if (d.length >= 3) {
      out += ") " + (d.length === 11
        ? d.slice(2, 3) + " " + d.slice(3, 7) + "-" + d.slice(7)                 // celular
        : d.slice(2, 6) + (d.length > 6 ? "-" + d.slice(6, 10) : ""));          // fixo
    }
    tel.value = out;
  });

  /* ---------- 4.3 Pré-seleção do serviço
     Cada item da lista de serviços tem `data-servico="<nome>"`. Ao clicar,
     além de rolar até o formulário, o <select id="servico"> já fica preenchido. */
  document.querySelectorAll("[data-servico]").forEach(function (link) {
    link.addEventListener("click", function () {
      servicoSelect.value = link.getAttribute("data-servico");
    });
  });

  /* ---------- 4.4 Regras de validação
     Cada regra recebe o valor do campo e retorna:
       true      → campo válido
       "texto"   → mensagem de erro exibida abaixo do campo
     A chave do objeto é o atributo `name` do campo no HTML. */
  var rules = {
    nome: function (v) { return v.trim().length >= 3 || "Informe seu nome completo."; },
    telefone: function (v) { return v.replace(/\D/g, "").length >= 10 || "Informe um telefone com DDD."; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Informe um e-mail válido."; },
    segmento: function (v) { return !!v || "Selecione o segmento."; },
    servico: function (v) { return !!v || "Selecione o serviço de interesse."; }
  };

  /**
   * 4.5 Valida todos os campos com regra definida em `rules`.
   * Para cada campo inválido: adiciona `.has-error` no `.field`,
   * marca `aria-invalid="true"` e escreve a mensagem em `.field__error`.
   *
   * @returns {boolean} `true` se todos os campos forem válidos.
   */
  function validate() {
    var ok = true;
    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      var result = rules[name](input.value);
      var field = input.closest(".field");
      var error = field.querySelector(".field__error");
      if (result === true) {
        field.classList.remove("has-error");
        input.removeAttribute("aria-invalid");
        error.textContent = "";
      } else {
        ok = false;
        field.classList.add("has-error");
        input.setAttribute("aria-invalid", "true");
        error.textContent = result;
      }
    });
    return ok;
  }

  /**
   * 4.6 Monta o texto do resumo da solicitação.
   *
   * @param {Object} d             Dados do formulário.
   * @param {string} d.nome
   * @param {string} d.telefone
   * @param {string} d.email
   * @param {string} d.segmento
   * @param {string} d.servico
   * @param {string} [d.detalhes]  Opcional; omitido do texto se vazio.
   * @returns {string} Texto em várias linhas, pronto para o WhatsApp.
   */
  function resumo(d) {
    return [
      "Olá! Gostaria de um orçamento de segurança.",
      "",
      "Nome: " + d.nome,
      "Telefone: " + d.telefone,
      "E-mail: " + d.email,
      "Segmento: " + d.segmento,
      "Serviço: " + d.servico,
      d.detalhes ? "Detalhes: " + d.detalhes : ""
    ].filter(Boolean).join("\n");
  }

  /**
   * 4.7 Envia o resumo por e-mail usando o serviço FormSubmit (formsubmit.co),
   * que dispensa back-end. Só executa se `ENVIAR_EMAIL` for `true`.
   * Erros de rede são ignorados: o WhatsApp já foi aberto e o usuário não
   * fica sem retorno.
   *
   * @param {Object} dados  Mesmo objeto recebido por `resumo()`.
   * @returns {Promise<void>}
   */
  function enviarResumoPorEmail(dados) {
    if (!ENVIAR_EMAIL) return Promise.resolve();
    return fetch("https://formsubmit.co/ajax/" + EMAIL_COMERCIAL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(Object.assign({ _subject: "Novo orçamento — " + dados.servico }, dados))
    }).catch(function () { /* falha no e-mail não impede o WhatsApp */ });
  }

  /* ---------- 4.8 Envio (submit)
     Fluxo:
       1. Impede o envio padrão do navegador.
       2. Valida; se houver erro, foca o primeiro campo inválido e para.
       3. Coleta os dados.
       4. Abre o WhatsApp com o resumo (precisa ser síncrono, dentro do
          clique, senão o navegador bloqueia como pop-up).
       5. Dispara o e-mail em segundo plano.
       6. Mostra a mensagem de sucesso e limpa o formulário. */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validate()) {
      var firstError = form.querySelector(".has-error input, .has-error select");
      if (firstError) firstError.focus();
      return;
    }

    var dados = {
      nome: form.elements.nome.value.trim(),
      telefone: form.elements.telefone.value.trim(),
      email: form.elements.email.value.trim(),
      segmento: form.elements.segmento.value,
      servico: form.elements.servico.value,
      detalhes: form.elements.detalhes.value.trim()
    };

    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(resumo(dados)), "_blank", "noopener");
    enviarResumoPorEmail(dados);

    status.textContent = "Solicitação enviada! Abrimos o WhatsApp comercial e enviaremos o resumo para " + dados.email + ".";
    form.reset();
  });
})();
