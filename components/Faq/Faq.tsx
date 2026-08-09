"use client";

import { useState } from "react";
import { faqItems } from "@/lib/faq";
import styles from "./Faq.module.css";

export default function Faq() {
  const [openId, setOpenId] = useState<number | null>(1);

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Вопросы и ответы</span>
          <h2 className={styles.title}>
            Частые вопросы о <em>наркологе и психиатре</em>
          </h2>
          <p className={styles.subtitle}>
            Нарколог на дом, вывод из запоя, капельница, кодировка и лечение
            алкоголизма во Владикавказе.
          </p>
        </div>

        <div className={styles.list}>
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div
                key={item.id}
                className={`${styles.item} ${isOpen ? styles.open : ""}`}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <button
                  id={buttonId}
                  type="button"
                  className={styles.question}
                  onClick={() => handleToggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span>{item.question}</span>
                  <span className={styles.icon} aria-hidden />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`${styles.answer} ${isOpen ? styles.answerOpen : ""}`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
