import React from 'react';
import Mermaid from '@theme/Mermaid';
import styles from './styles.module.css';

/**
 * Diagrama Mermaid com moldura e legenda padronizadas.
 *
 * Envolve o componente nativo de Mermaid do Docusaurus para dar às
 * lições um único ponto de uso, com legenda opcional.
 *
 * Uso em uma lição (.mdx):
 *
 *   <Diagrama
 *     title="Onde a prática realmente acontece"
 *     chart={`
 *       flowchart LR
 *         A[Aluno no navegador] --> B[Site do curso]
 *         A --> C[Claude Code no Codespace]
 *         C --> D[Executa código real]
 *     `}
 *   />
 *
 * Também aceita o código do diagrama como conteúdo entre as tags.
 */
export default function Diagrama({chart, title, children}) {
  const code = (chart ?? (typeof children === 'string' ? children : '')).trim();

  return (
    <figure className={styles.diagrama}>
      <Mermaid value={code} />
      {title && <figcaption className={styles.legenda}>{title}</figcaption>}
    </figure>
  );
}
