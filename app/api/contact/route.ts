import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MAX_LEN = 4000;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }

  const { name, phone, message } = body as Record<string, unknown>;
  const nameStr = typeof name === "string" ? name.trim() : "";
  const phoneStr = typeof phone === "string" ? phone.trim() : "";
  const messageStr =
    typeof message === "string" ? message.trim().slice(0, MAX_LEN) : "";

  if (!nameStr || !phoneStr) {
    return NextResponse.json(
      { error: "Укажите имя и телефон" },
      { status: 400 },
    );
  }

  const host = (process.env.SMTP_HOST ?? "smtp.mail.ru").trim();
  const port = Number((process.env.SMTP_PORT ?? "465").trim());
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASSWORD?.trim();
  const mailTo =
    process.env.MAIL_TO?.trim() || "Bekoev_2003@mail.ru";

  if (!user || !pass || !mailTo) {
    console.error("contact: отсутствуют SMTP_USER, SMTP_PASSWORD или MAIL_TO");
    return NextResponse.json(
      { error: "Отправка писем не настроена на сервере" },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const textBody = [
    `Имя: ${nameStr}`,
    `Телефон: ${phoneStr}`,
    "",
    "Сообщение:",
    messageStr || "—",
  ].join("\n");

  const htmlBody = `
    <p><strong>Имя:</strong> ${escapeHtml(nameStr)}</p>
    <p><strong>Телефон:</strong> ${escapeHtml(phoneStr)}</p>
    <p><strong>Сообщение:</strong></p>
    <p>${escapeHtml(messageStr || "—").replace(/\n/g, "<br/>")}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Заявка с сайта" <${user}>`,
      to: mailTo,
      subject: `Заявка с сайта: ${nameStr}`,
      text: textBody,
      html: htmlBody,
    });
  } catch (err) {
    console.error("contact: SMTP error", err);
    return NextResponse.json(
      { error: "Не удалось отправить письмо. Попробуйте позже." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
