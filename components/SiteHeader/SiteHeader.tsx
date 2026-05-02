import styles from "./SiteHeader.module.css";

const links = [
  { href: "#about", label: "О враче" },
  { href: "#specializations", label: "Специализация" },
  { href: "#book", label: "Запись" },
] as const;

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* <a href="#top" className={styles.brand}>
          Олег Бекоев
        </a> */}
        <nav className={styles.nav} aria-label="Разделы страницы">
          {links.map(({ href, label }) => (
            <a key={href} href={href} className={styles.link}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
