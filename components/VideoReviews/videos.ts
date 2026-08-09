import type { VideoReview } from "@/lib/videoEmbed";

/**
 * Тяжёлые .MOV (~67–78 МБ) временно не подключаем к главной —
 * они убивают скорость. Оставляем сжатый MP4.
 * Конвертируйте MOV в MP4/WebM и добавьте пути сюда.
 */
export const videoReviews: VideoReview[] = [
  { id: 1, url: "/videos/VIDEO-39.mp4" },
];
