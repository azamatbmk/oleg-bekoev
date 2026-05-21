import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/social";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <a
          href={INSTAGRAM_URL}
          className={styles.instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram: @${INSTAGRAM_HANDLE}`}
        >
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <span className={styles.handle}>@{INSTAGRAM_HANDLE}</span>
        </a>
        <p className={styles.copy}>© {new Date().getFullYear()} Олег Бекоев</p>
      </div>
    </footer>
  );
}
