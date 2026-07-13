import Link from "next/link";
import { landings } from "@/lib/landings";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/social";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav className={styles.links} aria-label="Услуги">
          {landings.map((page) => (
            <Link key={page.slug} href={`/${page.slug}`} className={styles.link}>
              {page.h1}
            </Link>
          ))}
        </nav>
        <a
          href={INSTAGRAM_URL}
          className={styles.socialLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Соцсети: @${INSTAGRAM_HANDLE}`}
        >
          @{INSTAGRAM_HANDLE}
        </a>
        <p className={styles.copy}>© {new Date().getFullYear()} Олег Бекоев</p>
      </div>
    </footer>
  );
}
