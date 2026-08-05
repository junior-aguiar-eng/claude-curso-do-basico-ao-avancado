import React from 'react';
import Link from '@docusaurus/Link';
import glossario from '@site/src/data/glossario.json';
import {definicaoExibivel} from '../_shared/glossario';
import styles from './styles.module.css';

/**
 * Referência a um termo do glossário (`src/data/glossario.json`). Não sabe
 * em qual lição está sendo usado — quem garante que o termo já foi
 * definido antes é o script `scripts/verificar-glossario.js`, rodando
 * contra o frontmatter `modulo` de cada lição.
 *
 * Modo referência (padrão) — link com tooltip para a entrada no /glossario:
 *
 *   O <Termo id="loop-agentico">loop agêntico</Termo> é o ciclo...
 *
 * Modo `define` — primeira definição na lição: marca o termo em destaque
 * e cria a âncora `id`, mas não injeta a `definicao` do JSON — quem
 * define o termo, nesse ponto, é a prosa da própria lição, escrita para
 * fluir naturalmente a partir do termo destacado:
 *
 *   <Termo id="loop-agentico" define>Loop agêntico</Termo> é o ciclo em
 *   que...
 *
 * A `definicao` do JSON continua usada na página /glossario e como
 * tooltip do modo referência (para quem só quer lembrar rapidinho, sem
 * sair da lição atual).
 *
 * Um `id` que não existe em glossario.json quebra o build/dev de propósito
 * — isso evita link morto em produção e avisa cedo quem está escrevendo a
 * lição.
 */
export default function Termo({id, children, define = false}) {
  const entrada = glossario[id];

  if (!entrada) {
    throw new Error(
      `<Termo id="${id}"> não encontrado em glossario.json — adicione o termo antes de referenciá-lo.`,
    );
  }

  if (define) {
    return (
      <strong id={id} className={styles.definicao}>
        {children}
      </strong>
    );
  }

  return (
    <Link to={`/glossario#${id}`} className={styles.termo} title={definicaoExibivel(entrada)}>
      {children}
    </Link>
  );
}
