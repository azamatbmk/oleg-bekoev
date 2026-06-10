export type VideoReview = {
  id: number;
  /**
   * Локальный файл из public, например /videos/review-1.mp4
   * или ссылка на YouTube, VK, RuTube.
   */
  url: string;
};

export type VideoSource =
  | { kind: "static"; src: string }
  | { kind: "embed"; src: string };

const STATIC_VIDEO = /\.(mp4|webm|mov|m4v)(\?.*)?$/i;

export function resolveVideoSource(url: string): VideoSource | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("/") || STATIC_VIDEO.test(trimmed)) {
    return { kind: "static", src: trimmed };
  }

  const youtubeMatch =
    trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/) ??
    trimmed.match(/youtube\.com\/embed\/([\w-]{11})/);
  if (youtubeMatch) {
    return {
      kind: "embed",
      src: `https://www.youtube-nocookie.com/embed/${youtubeMatch[1]}`,
    };
  }

  const rutubeMatch = trimmed.match(/rutube\.ru\/video\/([a-f0-9]+)/i);
  if (rutubeMatch) {
    return {
      kind: "embed",
      src: `https://rutube.ru/play/embed/${rutubeMatch[1]}`,
    };
  }

  const vkMatch = trimmed.match(/vk\.com\/video(-?\d+)_(\d+)/);
  if (vkMatch) {
    return {
      kind: "embed",
      src: `https://vk.com/video_ext.php?oid=${vkMatch[1]}&id=${vkMatch[2]}&hd=2`,
    };
  }

  if (trimmed.includes("/embed/") || trimmed.includes("video_ext.php")) {
    return { kind: "embed", src: trimmed };
  }

  return null;
}
