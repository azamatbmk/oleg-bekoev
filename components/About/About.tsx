import Link from "next/link";
import { DOCTOR } from "@/lib/doctor";
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Образование и опыт</span>
          <h2 className={styles.title}>
            {DOCTOR.fullName} — {DOCTOR.specialty} во{" "}
            {DOCTOR.cityLocative}
          </h2>
          <p className={styles.intro}>
            {DOCTOR.experienceNote} Консультации, выезд на дом и лечение
            зависимостей, тревожных и депрессивных состояний.
          </p>
          <p className={styles.intro}>
            <Link href="/o-vrage/" className={styles.moreLink}>
              Полная страница врача, график и сведения об исполнителе →
            </Link>
          </p>
        </div>

        <div className={styles.timeline}>
          {DOCTOR.education.map((item) => (
            <div key={item.place} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <h3 className={styles.institution}>{item.place}</h3>
                <p className={styles.description}>{item.detail}</p>
              </div>
            </div>
          ))}

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <h3 className={styles.institution}>
                Диплом и аккредитация подтверждены Минздравом России
              </h3>
              <p className={styles.description}>
                Копии документов предоставляются по запросу на консультации.
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <h3 className={styles.institution}>
                Многопрофильные медицинские учреждения
              </h3>
              <p className={styles.description}>
                Опыт работы в службе скорой помощи и в реанимационном отделении.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
