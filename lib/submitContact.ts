export type ContactPayload = {
  name: string;
  phone: string;
  message: string;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

const FORM_EMAIL = "Bekoev_2003@mail.ru";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

/** Локально: SMTP через /api/contact */
async function submitViaApi(payload: ContactPayload): Promise<SubmitResult | null> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const isJson = (res.headers.get("content-type") ?? "").includes(
      "application/json",
    );
    if (!isJson) {
      return null;
    }

    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
    };

    if (res.ok && data.ok === true) {
      return { ok: true };
    }

    if (data.error && res.status >= 400) {
      return { ok: false, error: data.error };
    }

    return null;
  } catch {
    return null;
  }
}

/** Продакшен на статике (Timeweb) */
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
      from_name: payload.name,
      phone: payload.phone,
      message: payload.message || "—",
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

async function submitViaFormSubmit(
  payload: ContactPayload,
): Promise<SubmitResult> {
  const res = await fetch(
    `https://formsubmit.co/ajax/${FORM_EMAIL}`,
    {
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
        _captcha: "false",
      }),
    },
  );

  const data = (await res.json().catch(() => ({}))) as {
    success?: string | boolean;
    message?: string;
  };

  const success =
    data.success === true ||
    data.success === "true";

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
  if (WEB3FORMS_KEY) {
    const web3 = await submitViaWeb3Forms(payload);
    if (web3) {
      return web3;
    }
  }

  const apiResult = await submitViaApi(payload);
  if (apiResult) {
    return apiResult;
  }

  return submitViaFormSubmit(payload);
}
