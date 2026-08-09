import Link from "next/link";
import styles from "./SiteHeader.module.css";

type Props = {
  /** Ссылки с главной (/#...) — для внутренних страниц */
  homeLinks?: boolean;
};

export default function SiteHeader({ homeLinks = false }: Props) {
  const links = [
    { href: homeLinks ? "/#services" : "#services", label: "Услуги" },
    { href: "/o-vrage/", label: "О враче" },
    { href: homeLinks ? "/#faq" : "#faq", label: "Вопросы" },
    { href: homeLinks ? "/#book" : "#book", label: "Запись" },
  ] as const;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Олег Бекоев
        </Link>
        <nav className={styles.nav} aria-label="Разделы сайта">
          {links.map(({ href, label }) => (
            <Link key={label} href={href} className={styles.link}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
