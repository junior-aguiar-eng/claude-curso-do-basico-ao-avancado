import React from 'react';
import Mascote from '@site/src/components/Mascote';
import styles from './styles.module.css';

/**
 * Card de destaque com o mascote na home — segundo dos três pontos de
 * presença ampliada (ver também Navbar/Logo e ConclusaoBloco, que
 * continua sendo o ponto alto, com o mascote maior). Usado uma única
 * vez, em docs/intro.mdx.
 *
 * `children` fica num <div>, não num <p>: como é usado em MDX com o
 * componente em posição de bloco, o remark já envolve o conteúdo solto
 * num <p> automaticamente — um <p> aninhado dentro de outro é HTML
 * inválido e quebra a hidratação (o navegador corrige a árvore ao
 * parsear o HTML do servidor, React espera a árvore original).
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
      <div className={styles.texto}>{children}</div>
    </div>
  );
}
