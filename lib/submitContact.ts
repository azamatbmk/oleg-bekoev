export type ContactPayload = {
  name: string;
  phone: string;
  message: string;
};

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

const FORM_EMAIL = "Bekoev_2003@mail.ru";

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
    const data = (
      isJson ? await res.json().catch(() => ({})) : {}
    ) as { error?: string };

    if (res.ok) {
      return { ok: true };
    }

    if (res.status === 404) {
      return null;
    }

    return {
      ok: false,
      error: data.error ?? "Не удалось отправить заявку. Попробуйте позже.",
    };
  } catch {
    return null;
  }
}

/** Для статического хостинга (Timeweb + output: export) — письма на почту без Node API */
async function submitViaFormSubmit(
  payload: ContactPayload,
): Promise<SubmitResult> {
  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(FORM_EMAIL)}`,
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
        _template: "table",
      }),
    },
  );

  const data = (await res.json().catch(() => ({}))) as {
    success?: string;
    message?: string;
  };

  if (res.ok && data.success === "true") {
    return { ok: true };
  }

  return {
    ok: false,
    error:
      "Не удалось отправить заявку. Позвоните по телефону или напишите на Bekoev_2003@mail.ru.",
  };
}

export async function submitContact(
  payload: ContactPayload,
): Promise<SubmitResult> {
  const apiResult = await submitViaApi(payload);
  if (apiResult) {
    return apiResult;
  }

  return submitViaFormSubmit(payload);
}
