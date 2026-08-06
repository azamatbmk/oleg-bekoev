import Link from "next/link";
import styles from "./Services.module.css";

const services = [
  {
    id: 1,
    title: "Профессиональная консультация",
    description:
      "Приём психиатра, нарколога и психотерапевта. Разберём ситуацию и составим понятный план лечения.",
    price: "1 500 ₽",
  },
  {
    id: 2,
    title: "Вывод из запоя",
    description:
      "Купирование запоя на дому. Оценка ЭКГ, давления, пульса и глюкозы — терапия подбирается по тяжести.",
    price: "от 4 500 — 9 000 ₽",
    href: "/vyvod-iz-zapoya/",
  },
  {
    id: 3,
    title: "Кодирование от алкоголя",
    description:
      "Запретительная процедура после консультации. Срок и препарат — индивидуально, с учётом противопоказаний.",
    price: "от 8 000 — 12 000 ₽ / год",
    href: "/kodirovanie/",
  },
  {
    id: 4,
    title: "Снятие абстинентного синдрома",
    subtitle: "похмелье и ломка",
    description:
      "Помощь при похмелье и ломке, в том числе с выездом нарколога на дом.",
    price: "от 4 500 — 9 000 ₽",
    href: "/narkolog-na-dom/",
  },
  {
    id: 5,
    title: "Реабилитационная помощь",
    description:
      "Лечение алкоголизма и наркомании: программа с психологами для устойчивой ремиссии.",
    price: "35 000 ₽ / месяц",
  },
] as const;

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <div className={styles.banner}>
          <div className={styles.bannerIcon} aria-hidden>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div className={styles.bannerText}>
            <p className={styles.bannerLead}>
              Нарколог на дом во Владикавказе — 24/7
            </p>
            <p className={styles.bannerSub}>
              Срочная помощь при запое, похмелье и ломке.{" "}
              <Link href="/narkolog-na-dom/" className={styles.bannerLink}>
                Подробнее о выезде
              </Link>
            </p>
          </div>
        </div>

        <div className={styles.header}>
          <span className={styles.label}>Услуги и стоимость</span>
          <h2 className={styles.title}>
            Нарколог и психиатр во Владикавказе —{" "}
            <em>приём и выезд</em>
          </h2>
          <p className={styles.intro}>
            Консультации, вывод из запоя, кодирование от алкоголя, снятие
            абстиненции и реабилитация. Работаю с зависимостью и психическими
            расстройствами.
          </p>
        </div>

        <ul className={styles.grid}>
          {services.map((item, index) => {
            const body = (
              <>
                <div className={styles.cardTop}>
                  <span className={styles.number}>
                    {String(item.id).padStart(2, "0")}
                  </span>
                  <span className={styles.price}>{item.price}</span>
                </div>
                <h3 className={styles.cardTitle}>
                  {item.title}
                  {"subtitle" in item && item.subtitle ? (
                    <span className={styles.cardSubtitle}> ({item.subtitle})</span>
                  ) : null}
                </h3>
                <p className={styles.cardDescription}>{item.description}</p>
                {"href" in item && item.href ? (
                  <span className={styles.cardMore}>Подробнее →</span>
                ) : null}
                <div className={styles.cardLine} />
              </>
            );

            return (
              <li
                key={item.id}
                className={styles.card}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {"href" in item && item.href ? (
                  <Link href={item.href} className={styles.cardLink}>
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
