import Link from "next/link";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import SiteHeader from "@/components/SiteHeader/SiteHeader";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main>
      <SiteHeader homeLinks />
      <section className={styles.section}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Страница не найдена</h1>
        <p className={styles.text}>
          Такой страницы нет. Вернитесь на главную или выберите услугу.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>
            На главную
          </Link>
          <Link href="/narkolog-na-dom/" className={styles.secondary}>
            Нарколог на дом
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
