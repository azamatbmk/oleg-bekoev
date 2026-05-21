"use client";

import { useState } from "react";
import styles from "./Book.module.css";

export default function Book() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setSubmitError(
          data.error ?? "Не удалось отправить заявку. Попробуйте позже.",
        );
        return;
      }

      setIsSubmitted(true);
      setFormData({ name: "", phone: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 8000);
    } catch {
      setSubmitError("Нет соединения с сервером. Проверьте интернет.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.book} id="book">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.info}>
            <span className={styles.label}>Запись на приём</span>
            <h2 className={styles.title}>
              Консультация и <em>индивидуальный подход</em>
            </h2>
            <p className={styles.description}>
              Оставьте заявку — свяжусь с вами для согласования времени и формата
              приёма. Профессиональная помощь и внимание к вашей ситуации.
            </p>

            <div className={styles.contacts}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Телефон</span>
                <a href="tel:+79888774992" className={styles.contactValue}>
                  +7(988)-877-4992
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email</span>
                <a
                  href="mailto:Bekoev_2003@mail.ru"
                  className={styles.contactValue}
                >
                  Bekoev_2003@mail.ru
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Город</span>
                <span className={styles.contactValue}>
                  Владикавказ
                </span>
              </div>
            </div>
          </div>

          <div className={styles.formWrapper}>
            {isSubmitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Заявка отправлена</h3>
                <p className={styles.successText}>
                  Я свяжусь с вами в ближайшее время для уточнения деталей.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                    placeholder="Иван Иванов"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={styles.formInput}
                    placeholder="+7 (999) 999-99-99"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={styles.formTextarea}
                    placeholder="Опишите вашу ситуацию..."
                  />
                </div>

                {submitError ? (
                  <p className={styles.formError} role="alert">
                    {submitError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? (
                    <span className={styles.spinner} />
                  ) : (
                    "Записаться на приём"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
