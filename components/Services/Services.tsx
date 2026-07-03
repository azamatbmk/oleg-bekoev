import styles from "./Services.module.css";

const services = [
  {
    id: 1,
    title: "Профессиональная консультация",
    description:
      "Приём психиатра, нарколога и психотерапевта во Владикавказе. Разберём ситуацию и составим понятный план лечения.",
    price: "1 500 ₽",
  },
  {
    id: 2,
    title: "Купирование запоя",
    description:
      "Вывод из запоя на дому во Владикавказе. Оценка состояния: ЭКГ, давление, пульс, глюкоза. Терапия подбирается по тяжести.",
    price: "от 4 500 — 9 000 ₽",
  },
  {
    id: 3,
    title: "Запретительная процедура (кодирование)",
    description:
      "Кодирование от алкоголя во Владикавказе. Срок и препарат подбираются индивидуально после консультации нарколога.",
    price: "от 8 000 — 12 000 ₽ / год",
  },
  {
    id: 4,
    title: "Снятие абстинентного синдрома",
    subtitle: "похмелье и ломка",
    description:
      "Снятие похмелья и ломки на дому. Комплексная помощь при абстинентном синдроме с восстановлением показателей.",
    price: "от 4 500 — 9 000 ₽",
  },
  {
    id: 5,
    title: "Реабилитационная помощь",
    description:
      "Лечение алкоголизма и наркомании: программа с психологами для выявления причин зависимости и устойчивой ремиссии.",
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
              Нарколог на дом во Владикавказе — 24 часа в сутки
            </p>
            <p className={styles.bannerSub}>
              Экстренная наркологическая помощь: вывод из запоя, снятие похмелья
              и ломки
            </p>
          </div>
        </div>

        <div className={styles.header}>
          <span className={styles.label}>Услуги и стоимость</span>
          <h2 className={styles.title}>
            Нарколог и психиатр во Владикавказе — <em>помощь при зависимости</em>
          </h2>
          <p className={styles.intro}>
            Консультации, выезд на дом и лечение алкоголизма и наркомании.
            Работаю с запоями, абстинентным синдромом, кодированием и
            психическими расстройствами.
          </p>
        </div>

        <ul className={styles.grid}>
          {services.map((item, index) => (
            <li
              key={item.id}
              className={styles.card}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
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
              <div className={styles.cardLine} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
