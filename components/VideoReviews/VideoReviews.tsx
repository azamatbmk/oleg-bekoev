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
    <section className={styles.reviews} id="reviews">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Отзывы</span>
          <h2 className={styles.title}>
            Видеоотзывы <em>пациентов</em>
          </h2>
          <p className={styles.subtitle}>
            Реальные истории людей, которым помогла консультация и лечение.
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
                      preload="metadata"
                      aria-label={`Видеоотзыв ${index + 1}`}
                    />
                  ) : (
                    <iframe
                      src={item.source!.src}
                      title={`Видеоотзыв ${index + 1}`}
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
            Видеоотзывы скоро появятся в этом разделе.
          </p>
        )}
      </div>
    </section>
  );
}
