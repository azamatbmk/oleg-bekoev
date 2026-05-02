"use client";

import { useState } from "react";
import styles from "./Specializations.module.css";

const specializations = [
  { id: 1, title: "С тревожными расстройствами", description: "Диагностика и лечение генерализованного тревожного расстройства, панических атак, фобий и ОКР" },
  { id: 2, title: "Нарушением сексуальной жизни", description: "Работа с психогенными нарушениями сексуальной функции и интимными проблемами" },
  { id: 3, title: "Психосоматическими расстройствами", description: "Лечение психосоматических проявлений: хроническая боль, расстройства ЖКТ, сердечно-сосудистые симптомы" },
  { id: 4, title: "Посттравматическими расстройствами", description: "Помощь при ПТСР, комплексном ПТСР и последствиях психологической травмы" },
  { id: 5, title: "С расстройствами шизоидного спектра", description: "Диагностика и сопровождение при шизоидном расстройстве личности и шизотипическом расстройстве" },
  { id: 6, title: "Депрессивными и аффективными расстройствами", description: "Лечение депрессии, биполярного аффективного расстройства, циклотимии" },
];

export default function Specializations() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.specializations} id="specializations">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Направления работы</span>
          <h2 className={styles.title}>Специализация</h2>
        </div>
        
        <div className={styles.grid}>
          {specializations.map((spec, index) => {
            const isActive = activeId === spec.id;
            return (
              <button
                key={spec.id}
                type="button"
                className={`${styles.card} ${isActive ? styles.active : ""}`}
                onClick={() => handleToggle(spec.id)}
                aria-expanded={isActive}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.cardInner}>
                  <div className={styles.number}>{String(spec.id).padStart(2, "0")}</div>
                  <h3 className={styles.cardTitle}>{spec.title}</h3>
                  <p className={`${styles.cardDescription} ${isActive ? styles.visible : ""}`}>
                    {spec.description}
                  </p>
                  <div className={styles.cardLine} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}