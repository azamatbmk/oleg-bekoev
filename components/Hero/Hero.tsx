import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <h1 className={styles.name}>
              Олег Бекоев
            </h1>
            <p className={styles.specialty}>
              Врач психиатр, нарколог, психотерапевт
            </p>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="/images/doctor.png"
              alt="Бекоев Олег — врач психиатр"
              className={styles.doctorImage}
              width={800}
              height={1200}
              sizes="(max-width: 768px) 90vw, 45vw"
              priority
            />
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
