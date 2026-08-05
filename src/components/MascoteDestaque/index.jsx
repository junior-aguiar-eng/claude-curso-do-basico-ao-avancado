import React from 'react';
import Mascote from '@site/src/components/Mascote';
import styles from './styles.module.css';

/**
 * Card de destaque com o mascote na home — segundo dos três pontos de
 * presença ampliada (ver também Navbar/Logo e ConclusaoBloco, que
 * continua sendo o ponto alto, com o mascote maior). Usado uma única
 * vez, em docs/intro.mdx.
 *
 * Uso:
 *
 *   <MascoteDestaque>
 *     <strong>Termos técnicos, sempre à mão.</strong> Toda palavra
 *     nova... está explicada no glossário vivo do curso.
 *   </MascoteDestaque>
 */
export default function MascoteDestaque({children}) {
  return (
    <div className={styles.card}>
      <Mascote estagio={0} tamanho={64} />
      <p className={styles.texto}>{children}</p>
    </div>
  );
}
