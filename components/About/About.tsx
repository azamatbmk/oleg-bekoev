import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Образование и опыт</span>
          <h2 className={styles.title}>
            Специалист в современной наркологии. Опыт работы <em>более 5 лет</em> с различной степенью тяжести алкоголизма и наркомании.
          </h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <h3 className={styles.institution}>
                ФГБУ «НМИЦ психиатрии и наркологии им. В.П. Сербского»  г. Москва
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
                Северо-Осетинскую государственную медицинскую академию г. Владикавказ
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
                Подтверждение диплома и аккредитации - Минздравом России
              </h3>
              {/* <p className={styles.description}>
                Подтверждает диплом врача в странах СНГ
              </p> */}
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <h3 className={styles.institution}>
                Многопрофильные медицинские учреждения
              </h3>
              <p className={styles.description}>
                Опыт работы на скорой помощи и в реанимационном отделении.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
