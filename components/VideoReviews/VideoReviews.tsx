import { resolveVideoSource } from "@/lib/videoEmbed";
import { videoReviews } from "./videos";
import styles from "./VideoReviews.module.css";

export default function VideoReviews() {
  const items = videoReviews
    .map((item) => ({
      ...item,
      source: resolveVideoSource(item.url),
    }))
    .filter((item) => item.source !== null);

  return (
    <section className={styles.reviews} id="videos">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Видео</span>
          <h2 className={styles.title}>
            Методики лечения и <em>профессиональный опыт</em>
          </h2>
          <p className={styles.subtitle}>
            О подходе к терапии и методах работы. Расшифровки и дополнительные
            ролики добавим после сжатия исходников.
          </p>
        </div>

        {items.length > 0 ? (
          <ul className={styles.grid}>
            {items.map((item, index) => (
              <li
                key={item.id}
                className={styles.card}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.player}>
                  {item.source!.kind === "static" ? (
                    <video
                      className={styles.video}
                      src={item.source!.src}
                      controls
                      playsInline
                      preload="none"
                      aria-label="Видео о методиках лечения"
                    />
                  ) : (
                    <iframe
                      src={item.source!.src}
                      title={`Видео ${index + 1}`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>
            Видео скоро появятся в этом разделе.
          </p>
        )}
      </div>
    </section>
  );
}
