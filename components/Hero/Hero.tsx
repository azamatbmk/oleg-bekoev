import styles from "./Hero.module.css";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/phone";

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <h1 className={styles.heading}>
              <span className={styles.name}>Олег Бекоев</span>
              <span className={styles.tagline}>
                Психиатр и нарколог во Владикавказе
              </span>
            </h1>
            <p className={styles.specialty}>
              Выезд на дом 24/7, вывод из запоя, кодирование и консультации
            </p>
            <a
              href={PHONE_TEL}
              className={styles.callButton}
              aria-label={`Позвонить: ${PHONE_DISPLAY}`}
            >
              <svg
                className={styles.callIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Позвонить
            </a>

            <div className={styles.scrollIndicator}>
              <div className={styles.scrollLine} />
            </div>
          </div>

          <div className={styles.imageWrapper}>
            <picture>
              <source srcSet="/images/doctor.avif" type="image/avif" />
              <source srcSet="/images/doctor.webp" type="image/webp" />
              <img
                src="/images/doctor.png"
                alt="Олег Бекоев — врач-психиатр-нарколог"
                className={styles.doctorImage}
                width={1920}
                height={1513}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
