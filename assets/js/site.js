// Sun-Cy Shipyard site settings. Edit these two lines; both language pages use them.
const SITE_CONFIG = {
  // Web3Forms access key: get it free at https://web3forms.com (enter hello@suncyshipyard.com).
  // While it's empty, the form opens the visitor's email app instead.
  web3formsKey: "",
  // Spool Up's Steam page. While it's empty, the page says the Steam page is coming soon.
  spoolUpSteamUrl: "",
};

const CONTACT_EMAIL = "hello@suncyshipyard.com";

const TEXT = {
  en: {
    sending: "Sending…",
    sent: (email) => `Message sent. I'll reply to ${email}.`,
    failed: `The message didn't send. Email ${CONTACT_EMAIL} instead.`,
    mailApp: "Your email app should open with the message ready to send.",
    subject: (topic) => `Website message: ${topic}`,
  },
  fr: {
    sending: "Envoi…",
    sent: (email) => `Message envoyé. Je vous répondrai à ${email}.`,
    failed: `Le message n'est pas parti. Écrivez plutôt à ${CONTACT_EMAIL}.`,
    mailApp: "Votre logiciel de courriel devrait s'ouvrir avec le message prêt à envoyer.",
    subject: (topic) => `Message du site : ${topic}`,
  },
};

const lang = document.documentElement.lang.startsWith("fr") ? "fr" : "en";
const t = TEXT[lang];

// Steam button: shown only once the Steam page exists.
document.querySelectorAll("[data-steam]").forEach((link) => {
  const soon = link.parentElement.querySelector("[data-steam-soon]");
  if (SITE_CONFIG.spoolUpSteamUrl) {
    link.href = SITE_CONFIG.spoolUpSteamUrl;
    link.hidden = false;
    if (soon) soon.hidden = true;
  }
});

// Contact form
const form = document.querySelector("[data-contact-form]");
if (form) {
  const status = form.querySelector("[data-form-status]");
  const button = form.querySelector("button[type=submit]");

  const setStatus = (message, kind) => {
    status.textContent = message;
    status.classList.toggle("is-ok", kind === "ok");
    status.classList.toggle("is-error", kind === "error");
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (data.get("botcheck")) return; // a bot filled the hidden field

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topicSelect = form.querySelector("select[name=topic]");
    const topic = topicSelect.options[topicSelect.selectedIndex].text;
    const message = String(data.get("message") || "").trim();

    if (!SITE_CONFIG.web3formsKey) {
      const body = `${message}\n\n${name}\n${email}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.subject(topic))}&body=${encodeURIComponent(body)}`;
      setStatus(t.mailApp, "ok");
      return;
    }

    button.disabled = true;
    setStatus(t.sending);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: SITE_CONFIG.web3formsKey,
          subject: t.subject(topic),
          from_name: "suncyshipyard.com",
          name,
          email,
          topic,
          message,
          page_language: lang,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || response.status);
      form.reset();
      setStatus(t.sent(email), "ok");
    } catch (error) {
      setStatus(t.failed, "error");
    } finally {
      button.disabled = false;
    }
  });
}
