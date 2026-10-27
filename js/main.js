(function () {
  "use strict";

  // Número do WhatsApp comercial (fictício) e e-mail que recebe os resumos
  var WHATSAPP = "5581999990000";
  var EMAIL_COMERCIAL = "contato@supersecurity.com.br";
  // Troque para true depois de colocar um e-mail real acima (ver README)
  var ENVIAR_EMAIL = false;

  /* ---------- Menu mobile */
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("mobile-menu");
  var closeBtn = document.querySelector(".menu-close");

  function openMenu() {
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }
  function closeMenu() {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    toggle.focus();
  }
  toggle.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.hidden) closeMenu();
  });

  /* ---------- Link ativo no menu */
  var navLinks = document.querySelectorAll(".main-nav a");
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
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Formulário */
  var form = document.getElementById("form-orcamento");
  var tel = document.getElementById("telefone");
  var servicoSelect = document.getElementById("servico");
  var status = form.querySelector(".form__status");

  // Máscara: (81) 9 0000-0000 ou (81) 3000-0000
  tel.addEventListener("input", function () {
    var d = tel.value.replace(/\D/g, "").slice(0, 11);
    var out = d;
    if (d.length > 0) out = "(" + d.slice(0, 2);
    if (d.length >= 3) out += ") " + (d.length === 11 ? d.slice(2, 3) + " " + d.slice(3, 7) + "-" + d.slice(7) : d.slice(2, 6) + (d.length > 6 ? "-" + d.slice(6, 10) : ""));
    tel.value = out;
  });

  // Clicar em um serviço da lista pré-seleciona o campo correspondente
  document.querySelectorAll("[data-servico]").forEach(function (link) {
    link.addEventListener("click", function () {
      servicoSelect.value = link.getAttribute("data-servico");
    });
  });

  var rules = {
    nome: function (v) { return v.trim().length >= 3 || "Informe seu nome completo."; },
    telefone: function (v) { return v.replace(/\D/g, "").length >= 10 || "Informe um telefone com DDD."; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Informe um e-mail válido."; },
    segmento: function (v) { return !!v || "Selecione o segmento."; },
    servico: function (v) { return !!v || "Selecione o serviço de interesse."; }
  };

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

  /* Envio do resumo por e-mail. */
  function enviarResumoPorEmail(dados) {
    if (!ENVIAR_EMAIL) return Promise.resolve();
    return fetch("https://formsubmit.co/ajax/" + EMAIL_COMERCIAL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(Object.assign({ _subject: "Novo orçamento — " + dados.servico }, dados))
    }).catch(function () { /* falha no e-mail não impede o WhatsApp */ });
  }

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

    // Abre o WhatsApp imediatamente (antes de qualquer await) para não ser bloqueado como pop-up
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(resumo(dados)), "_blank", "noopener");
    enviarResumoPorEmail(dados);

    status.textContent = "Solicitação enviada! Abrimos o WhatsApp comercial e enviaremos o resumo para " + dados.email + ".";
    form.reset();
  });
})();
