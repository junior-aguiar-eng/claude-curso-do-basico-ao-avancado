import React from 'react';
import styles from './styles.module.css';

const rotulos = {
  1: 'NÍVEL 1',
  2: 'NÍVEL 2 · LAB',
};

/**
 * Substitui os marcadores 🟢 (nível 1) / 🔵 (nível 2) do subtítulo de
 * cada módulo por um badge em texto — emoji renderiza com a fonte
 * nativa do sistema, fora do controle de design.
 *
 * Uso na linha de subtítulo de cada lição (docs/m*.mdx):
 *
 *   *Bloco 1 — Mentalidade · Eixo A · Nível <NivelBadge nivel={1} /> ...*
 */
export default function NivelBadge({nivel}) {
  return (
    <span className={`${styles.badge} ${nivel === 2 ? styles.nivel2 : styles.nivel1}`}>
      {rotulos[nivel]}
    </span>
  );
}
