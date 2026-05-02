const RESEND_EMAILS = "https://api.resend.com/emails";

const LINK = "#5b9cff";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const DEFAULT_WELCOME_LINKS_ORIGIN = "https://www.alphainvestor.pl";

/** Origin for `/`, `/#waitlist`, `/privacy` in the welcome email only. */
function welcomeEmailLinksOrigin(): string {
  const raw =
    process.env.RESEND_WELCOME_LINKS_ORIGIN?.trim() ||
    DEFAULT_WELCOME_LINKS_ORIGIN;
  try {
    const base = new URL(raw.includes("://") ? raw : `https://${raw}`);
    if (base.protocol !== "http:" && base.protocol !== "https:") {
      return DEFAULT_WELCOME_LINKS_ORIGIN;
    }
    return `${base.protocol}//${base.host}`;
  } catch {
    return DEFAULT_WELCOME_LINKS_ORIGIN;
  }
}

function welcomeLink(path: string): string {
  const origin = welcomeEmailLinksOrigin();
  const p = path.startsWith("/") ? path : `/${path}`;
  try {
    return encodeURI(`${origin}${p}`);
  } catch {
    return "";
  }
}

function a(href: string, label: string): string {
  if (!href) {
    return `<span style="color:#a3a3a3">${escapeHtml(label)}</span>`;
  }
  return `<a href="${escapeHtml(href)}" style="color:${LINK};text-decoration:underline">${escapeHtml(label)}</a>`;
}

type WelcomeLang = "en" | "pl";

const mail = {
  en: {
    headerLabel: "Alpha Investor · from Kuba",
    subject: "Welcome to Alpha Investor — a note from Kuba",
    hey: (name?: string) =>
      name?.trim()
        ? `Hey ${escapeHtml(name.trim())},`
        : "Hey,",
    intro:
      "My name is <strong style=\"color:#fafafa\">Kuba</strong> — I'm the founder of Alpha Investor.",
    mission:
      "My mission is straightforward: help regular investors see through the noise. Markets love to spike fear and FOMO; I want you to open the app and instead see your portfolio the way you actually built it — your weights, where you're concentrated, and context you can trust. AI can help later, but clarity comes first.",
    bridge:
      "We're still early and intentionally small, so your signup on the waitlist genuinely matters. I read these replies myself — not a bot, not a ticket queue.",
    p2italic:
      "When we ship, I want the first-run experience to feel like it <em>just works</em> — no gimmicks, no dark patterns, just honest tooling.",
    tipsLead: "If you have two minutes, here are three useful links:",
    tip1: "See what we're building on the site",
    tip2: "Jump to the early access section",
    tip3: "Read our privacy page — short, plain language",
    ps: "P.S.: I'd really like to know — what made you sign up? What should we get right first for someone like you?",
    reply:
      'Hit <strong style="color:#fafafa">Reply</strong> and tell me. I read and answer every message.',
    signoff: "Cheers,",
    team: "Kuba",
  },
  pl: {
    headerLabel: "Alpha Investor · od Kuby",
    subject: "Witaj w Alpha Investor — krótka notka od Kuby",
    hey: (name?: string) =>
      name?.trim()
        ? `Cześć ${escapeHtml(name.trim())},`
        : "Cześć,",
    intro:
      'Nazywam się <strong style="color:#fafafa">Kuba</strong> — jestem założycielem Alpha Investor.',
    mission:
      "Chcę robić jedną rzecz dobrze: pomóc zwykłym inwestorom przeciąć szum. Rynek karmi strachem i FOMO; ja chcę, żebyś po otwarciu aplikacji zobaczył portfel takim, jakim go naprawdę złożyłeś — swoje wagi, koncentrację i kontekst, któremu możesz zaufać. AI może pomóc później, ale najpierw musi być jasno.",
    bridge:
      "Jesteśmy we wczesnej fazie i celowo trzymamy się małego zespołu, więc Twój zapis na listę naprawdę coś znaczy. Te odpowiedzi czytam osobiście — bez bota i bez kolejki ticketów.",
    p2italic:
      "Kiedy tylko wyślemy pierwsze sensowne wersje, chcę, żebyś poczuł, że wszystko <em>po prostu działa</em> — bez sztuczek i bez „innowacji” kosztem przejrzystości.",
    tipsLead: "Jeśli masz dwie minuty, oto trzy przydatne linki:",
    tip1: "Zobacz, co budujemy, na stronie",
    tip2: "Wróć do sekcji wczesnego dostępu",
    tip3: "Przeczytaj politykę prywatności — krótko i po ludzku",
    ps: "P.S.: Naprawdę chciałbym wiedzieć — co skłoniło Cię do zapisu? Co mamy zrobić dobrze jako pierwsze dla kogoś takiego jak Ty?",
    reply:
      'Śmiało kliknij <strong style="color:#fafafa">Odpowiedz</strong> — czytam i odpisuję na każdą wiadomość.',
    signoff: "Pozdrawiam,",
    team: "Kuba",
  },
} as const;

function buildHtml(lang: WelcomeLang, firstName?: string): string {
  const m = mail[lang];
  const h = welcomeLink("/");
  const w = welcomeLink("/#waitlist");
  const p = welcomeLink("/privacy");

  const body = `
<p style="margin:0 0 20px;font-size:16px;line-height:1.65;color:#e5e5e5">${m.hey(firstName)}</p>
<p style="margin:0 0 18px;font-size:16px;line-height:1.65;color:#d4d4d4">${m.intro}</p>
<p style="margin:0 0 18px;font-size:16px;line-height:1.65;color:#d4d4d4">${m.mission}</p>
<p style="margin:0 0 22px;font-size:16px;line-height:1.65;color:#d4d4d4">${m.bridge}</p>
<p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#d4d4d4">${m.p2italic}</p>
<p style="margin:0 0 12px;font-size:16px;line-height:1.65;color:#e5e5e5">${m.tipsLead}</p>
<ol style="margin:0 0 24px;padding-left:1.35rem;color:#d4d4d4;font-size:16px;line-height:1.65">
<li style="margin:10px 0">${a(h, m.tip1)}</li>
<li style="margin:10px 0">${a(w, m.tip2)}</li>
<li style="margin:10px 0">${a(p, m.tip3)}</li>
</ol>
<p style="margin:0 0 16px;font-size:16px;line-height:1.65;font-weight:700;color:#fafafa">${m.ps}</p>
<p style="margin:0 0 28px;font-size:16px;line-height:1.65;color:#d4d4d4">${m.reply}</p>
<p style="margin:0 0 6px;font-size:16px;line-height:1.65;color:#e5e5e5">${m.signoff}</p>
<p style="margin:0;font-size:16px;line-height:1.65;color:#e5e5e5">${m.team}</p>`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8"/>
<meta name="color-scheme" content="dark"/>
<meta name="supported-color-schemes" content="dark"/>
</head>
<body style="margin:0;padding:0;background-color:#000000;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#000000;">
<tr><td style="padding:28px 20px 40px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;">
<tr><td style="border-bottom:1px solid #262626;padding-bottom:20px;margin-bottom:20px;">
<p style="margin:0;font-size:13px;line-height:1.5;color:#737373;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">${escapeHtml(m.headerLabel)}</p>
</td></tr>
<tr><td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
${body}
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/**
 * Sends a welcome email via Resend (dark, conversational layout). Fails soft (logs).
 */
export async function sendWaitlistWelcomeEmail(opts: {
  apiKey: string;
  from: string;
  to: string;
  lang: WelcomeLang;
  firstName?: string;
}): Promise<void> {
  const m = mail[opts.lang];
  const html = buildHtml(opts.lang, opts.firstName);
  const replyTo = process.env.RESEND_WELCOME_REPLY_TO?.trim();

  try {
    const payload: Record<string, unknown> = {
      from: opts.from,
      to: [opts.to],
      subject: m.subject,
      html,
    };
    if (replyTo) {
      payload.reply_to = replyTo;
    }

    const res = await fetch(RESEND_EMAILS, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${opts.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let detail = res.statusText;
      try {
        const data = (await res.json()) as { message?: string };
        if (typeof data.message === "string") detail = data.message;
      } catch {
        // ignore
      }
      console.error("[waitlist welcome email] Resend error:", res.status, detail);
      return;
    }

    try {
      const data = (await res.json()) as { id?: string };
      if (typeof data.id === "string") {
        console.info(
          `[waitlist welcome email] sent id=${data.id} to=${opts.to}`,
        );
      } else {
        console.info("[waitlist welcome email] sent (ok, unexpected body)");
      }
    } catch {
      console.info("[waitlist welcome email] sent (ok, could not parse body)");
    }
  } catch (e) {
    console.error("[waitlist welcome email] fetch failed:", e);
  }
}
