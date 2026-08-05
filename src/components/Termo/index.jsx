import React from 'react';
import glossario from '@site/src/data/glossario.json';
import styles from './styles.module.css';

/**
 * Marca um termo do glossário dentro do texto de uma lição.
 *
 * Uso em uma lição (.mdx):
 *
 *   Um <Termo id="lista" define>lista</Termo> guarda vários valores...
 *   (aparição posterior, mesma ou outra lição)
 *   ...volte à <Termo id="lista">lista</Termo> do exemplo anterior.
 *
 * `define` marca o ponto em que o termo é explicado na prosa da lição —
 * a definição já está no texto ao redor, então o componente não a repete,
 * só destaca o termo e cria uma âncora (`termo-{id}`) para link profundo.
 * Sem `define`, renderiza um link simples para a entrada correspondente
 * em `/glossario`.
 *
 * `id` deve bater com uma chave existente em `src/data/glossario.json`.
 */
export default function Termo({id, define = false, children}) {
  if (!glossario[id] && typeof console !== 'undefined') {
    // eslint-disable-next-line no-console
    console.warn(`<Termo id="${id}"> não encontrado em glossario.json.`);
  }

  if (define) {
    return (
      <strong id={`termo-${id}`} className={styles.definindo}>
        {children}
      </strong>
    );
  }

  return (
    <a href={`/glossario#${id}`} className={styles.termo}>
      {children}
    </a>
  );
}
