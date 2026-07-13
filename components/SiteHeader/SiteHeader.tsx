import Link from "next/link";
import styles from "./SiteHeader.module.css";

type Props = {
  /** Ссылки на якоря с префиксом / — для посадочных страниц */
  homeLinks?: boolean;
};

const sectionLinks = [
  { hash: "services", label: "Услуги" },
  { hash: "about", label: "О враче" },
  { hash: "faq", label: "Вопросы" },
  { hash: "videos", label: "Методики" },
  { hash: "book", label: "Запись" },
] as const;

export default function SiteHeader({ homeLinks = false }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Олег Бекоев
        </Link>
        <nav className={styles.nav} aria-label="Разделы сайта">
          {sectionLinks.map(({ hash, label }) => (
            <a
              key={hash}
              href={homeLinks ? `/#${hash}` : `#${hash}`}
              className={styles.link}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
