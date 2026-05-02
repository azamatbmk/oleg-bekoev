import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Образование и опыт</span>
          <h2 className={styles.title}>
            Является <em>квалифицированным специалистом</em> в разграничении психических расстройств и психологических/социальных проблем.
          </h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <h3 className={styles.institution}>
                Санкт-Петербургский государственный педиатрический университет
              </h3>
              <p className={styles.description}>
                Окончил с отличием, получил фундаментальную медицинскую подготовку
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <h3 className={styles.institution}>
                Северо-западный государственный медицинский университет имени И.М. Мечникова
              </h3>
              <p className={styles.description}>
                Прошел обучение по программе ординатуры на кафедре психиатрии и наркологии
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <h3 className={styles.institution}>
                Подтверждение диплома в ЕС
              </h3>
              <p className={styles.description}>
                Подтверждает диплом врача в Европейском Союзе
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
                Работает в многопрофильных медицинских учреждениях Санкт-Петербурга
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
