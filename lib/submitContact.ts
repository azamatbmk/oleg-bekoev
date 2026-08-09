export type ContactPayload = {
  name: string;
  phone: string;
  message: string;
  /** Honeypot: если заполнено — бот */
  website?: string;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

const FORM_EMAIL = "Bekoev_2003@mail.ru";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

const NAME_MAX = 80;
const PHONE_MAX = 32;
const MESSAGE_MAX = 2000;

function sanitizeSubjectPart(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").trim().slice(0, NAME_MAX);
}

function validatePayload(
  payload: ContactPayload,
): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  const name = sanitizeSubjectPart(payload.name);
  const phone = payload.phone.replace(/[\r\n\t]+/g, " ").trim().slice(0, PHONE_MAX);
  const message = payload.message.trim().slice(0, MESSAGE_MAX);

  if (!name || name.length < 2) {
    return { ok: false, error: "Укажите имя." };
  }
  if (!phone || phone.replace(/\D/g, "").length < 10) {
    return { ok: false, error: "Укажите корректный телефон." };
  }

  return { ok: true, data: { name, phone, message, website: payload.website } };
}

/** Продакшен на статике (Timeweb) — Web3Forms */
async function submitViaWeb3Forms(
  payload: ContactPayload,
): Promise<SubmitResult | null> {
  if (!WEB3FORMS_KEY) {
    return null;
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `Заявка с сайта: ${payload.name}`,
      from_name: "Сайт — Олег Бекоев",
      name: payload.name,
      phone: payload.phone,
      message: payload.message || "—",
      // Honeypot Web3Forms: пустое = человек; заполненное = спам
      botcheck: "",
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };

  if (res.ok && data.success) {
    return { ok: true };
  }

  return {
    ok: false,
    error:
      data.message ??
      "Не удалось отправить заявку. Позвоните или напишите на почту.",
  };
}

/** Fallback без ключа Web3Forms */
async function submitViaFormSubmit(
  payload: ContactPayload,
): Promise<SubmitResult> {
  const res = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      phone: payload.phone,
      message: payload.message || "—",
      _subject: `Заявка с сайта: ${payload.name}`,
      // Honeypot FormSubmit
      _honey: "",
      // AJAX без редиректа на их captcha-страницу; защита — honeypot + клиентский
      _captcha: "false",
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    success?: string | boolean;
    message?: string;
  };

  const success = data.success === true || data.success === "true";

  if (res.ok && success) {
    return { ok: true };
  }

  const detail = data.message?.trim();
  return {
    ok: false,
    error: detail
      ? `${detail} Если не помогло — позвоните или напишите на ${FORM_EMAIL}.`
      : `Не удалось отправить заявку. Позвоните или напишите на ${FORM_EMAIL}.`,
  };
}

export async function submitContact(
  payload: ContactPayload,
): Promise<SubmitResult> {
  // Клиентский honeypot: боты часто заполняют скрытое поле
  if (payload.website?.trim()) {
    return { ok: true };
  }

  const validated = validatePayload(payload);
  if (!validated.ok) {
    return validated;
  }

  if (WEB3FORMS_KEY) {
    const web3 = await submitViaWeb3Forms(validated.data);
    if (web3) {
      return web3;
    }
  }

  return submitViaFormSubmit(validated.data);
}
