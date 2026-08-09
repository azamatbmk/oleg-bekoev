"use client";

import { useState } from "react";
import PhoneLink from "@/components/PhoneLink/PhoneLink";
import styles from "./Book.module.css";
import { MetrikaGoals, reachGoal } from "@/lib/metrika";
import { PHONE_DISPLAY } from "@/lib/phone";
import { submitContact } from "@/lib/submitContact";

export default function Book() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    website: "",
  });
  const [consent, setConsent] = useState(false);
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

    if (!consent) {
      setSubmitError(
        "Нужно согласие на обработку персональных данных.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Honeypot: не шлём заявку и не бьём цель Метрики
      if (formData.website.trim()) {
        setIsSubmitted(true);
        setFormData({ name: "", phone: "", message: "", website: "" });
        setConsent(false);
        setTimeout(() => setIsSubmitted(false), 8000);
        return;
      }

      const result = await submitContact({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        website: formData.website,
      });

      if (!result.ok) {
        setSubmitError(result.error);
        return;
      }

      reachGoal(MetrikaGoals.formSubmit);
      setIsSubmitted(true);
      setFormData({ name: "", phone: "", message: "", website: "" });
      setConsent(false);
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
                <PhoneLink
                  className={styles.contactValue}
                  goalParams={{ place: "book" }}
                >
                  {PHONE_DISPLAY}
                </PhoneLink>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Электронная почта</span>
                <a
                  href="mailto:Bekoev_2003@mail.ru"
                  className={styles.contactValue}
                >
                  Bekoev_2003@mail.ru
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Город / зона</span>
                <span className={styles.contactValue}>
                  Владикавказ и РСО-Алания (выезд)
                </span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>График</span>
                <span className={styles.contactValue}>
                  Выезд 24/7 · приём по записи
                </span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>О враче</span>
                <a href="/o-vrage/" className={styles.contactValue}>
                  Бекоев Олег Альбертович
                </a>
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
                <div className={styles.honeypot} aria-hidden="true">
                  <label htmlFor="website">Сайт</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

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
                    maxLength={80}
                    className={styles.formInput}
                    placeholder="Иван Иванов"
                    autoComplete="name"
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
                    maxLength={32}
                    className={styles.formInput}
                    placeholder="+7 (988) 877-49-92"
                    autoComplete="tel"
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
                    maxLength={2000}
                    className={styles.formTextarea}
                    placeholder="Кратко опишите запрос (без лишних медицинских подробностей, если не хотите)"
                  />
                </div>

                <label className={styles.consent}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                  />
                  <span>
                    Согласен / согласна на обработку персональных данных и принимаю{" "}
                    <a
                      href="/politika-konfidencialnosti/"
                      onClick={(e) => e.stopPropagation()}
                    >
                      политику конфиденциальности
                    </a>
                  </span>
                </label>

                {submitError ? (
                  <p className={styles.formError} role="alert">
                    {submitError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting || !consent}
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
