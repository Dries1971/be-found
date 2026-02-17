import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter;

function getTransporter() {
  if (!transporter) {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT ?? "465", 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      throw new Error("SMTP environment variables are required (SMTP_HOST, SMTP_USER, SMTP_PASS)");
    }

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465 (SMTPS), false for 587 (STARTTLS)
      auth: { user, pass },
    });
  }
  return transporter;
}

const FROM = process.env.SMTP_FROM ?? "Be-Found <hello@b-found.online>";

/**
 * Send a contact form notification to the team.
 */
export async function sendContactNotification({
  name,
  email,
  company,
  message,
  locale,
}: {
  name: string;
  email: string;
  company: string;
  message: string;
  locale: string;
}) {
  const mail = getTransporter();

  await mail.sendMail({
    from: FROM,
    to: "hello@b-found.online",
    replyTo: email,
    subject: `New contact: ${name}${company ? ` (${company})` : ""}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      `Locale: ${locale}`,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <h2>New contact form submission</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;">
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        ${company ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Company</td><td>${escapeHtml(company)}</td></tr>` : ""}
        <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Locale</td><td>${escapeHtml(locale)}</td></tr>
      </table>
      <h3>Message</h3>
      <p style="white-space:pre-wrap;font-family:sans-serif;">${escapeHtml(message)}</p>
    `,
  });
}

/**
 * Send a newsletter double opt-in confirmation email.
 */
export async function sendConfirmationEmail({
  email,
  token,
  locale,
}: {
  email: string;
  token: string;
  locale: string;
}) {
  const mail = getTransporter();
  const confirmUrl = `https://be-found.online/api/newsletter/confirm?token=${token}`;

  // Locale-aware subject lines
  const subjects: Record<string, string> = {
    en: "Confirm your Be-Found newsletter subscription",
    nl: "Bevestig je Be-Found nieuwsbrief aanmelding",
    de: "Bestätige dein Be-Found Newsletter-Abonnement",
    fr: "Confirmez votre inscription à la newsletter Be-Found",
    es: "Confirma tu suscripción al boletín de Be-Found",
    pt: "Confirme sua assinatura da newsletter Be-Found",
  };

  const bodies: Record<string, { heading: string; text: string; button: string; expires: string }> = {
    en: {
      heading: "Confirm your subscription",
      text: "Thank you for subscribing to the Be-Found newsletter. Click the button below to confirm your email address.",
      button: "Confirm subscription",
      expires: "This link expires in 24 hours.",
    },
    nl: {
      heading: "Bevestig je aanmelding",
      text: "Bedankt voor je aanmelding voor de Be-Found nieuwsbrief. Klik op de knop hieronder om je e-mailadres te bevestigen.",
      button: "Aanmelding bevestigen",
      expires: "Deze link vervalt na 24 uur.",
    },
    de: {
      heading: "Abonnement bestätigen",
      text: "Vielen Dank für deine Anmeldung zum Be-Found Newsletter. Klicke auf den Button unten, um deine E-Mail-Adresse zu bestätigen.",
      button: "Abonnement bestätigen",
      expires: "Dieser Link läuft in 24 Stunden ab.",
    },
    fr: {
      heading: "Confirmez votre inscription",
      text: "Merci de vous être inscrit à la newsletter Be-Found. Cliquez sur le bouton ci-dessous pour confirmer votre adresse e-mail.",
      button: "Confirmer l'inscription",
      expires: "Ce lien expire dans 24 heures.",
    },
    es: {
      heading: "Confirma tu suscripción",
      text: "Gracias por suscribirte al boletín de Be-Found. Haz clic en el botón de abajo para confirmar tu dirección de correo electrónico.",
      button: "Confirmar suscripción",
      expires: "Este enlace caduca en 24 horas.",
    },
    pt: {
      heading: "Confirme sua assinatura",
      text: "Obrigado por se inscrever na newsletter da Be-Found. Clique no botão abaixo para confirmar seu endereço de e-mail.",
      button: "Confirmar assinatura",
      expires: "Este link expira em 24 horas.",
    },
  };

  const subject = subjects[locale] ?? subjects.en;
  const body = bodies[locale] ?? bodies.en;

  await mail.sendMail({
    from: FROM,
    to: email,
    subject,
    text: `${body.heading}\n\n${body.text}\n\n${confirmUrl}\n\n${body.expires}`,
    html: `
      <div style="max-width:480px;margin:0 auto;font-family:sans-serif;color:#0f172a;">
        <h2 style="color:#0f172a;">${escapeHtml(body.heading)}</h2>
        <p>${escapeHtml(body.text)}</p>
        <p style="text-align:center;margin:32px 0;">
          <a href="${escapeHtml(confirmUrl)}"
             style="display:inline-block;padding:12px 32px;background:#f59e0b;color:#0f172a;text-decoration:none;border-radius:8px;font-weight:600;">
            ${escapeHtml(body.button)}
          </a>
        </p>
        <p style="font-size:12px;color:#64748b;">${escapeHtml(body.expires)}</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
        <p style="font-size:12px;color:#64748b;">Be-Found.online — GEO & AI Visibility</p>
      </div>
    `,
  });
}

/** Escape HTML special characters to prevent XSS in email templates */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
