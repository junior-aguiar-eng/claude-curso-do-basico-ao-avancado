import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const storageKey = (id) => `curso:checkpoint:${id}`;

/**
 * Checkpoint de progresso da lição.
 *
 * O estado é salvo no próprio navegador do aluno (localStorage), então
 * a marcação persiste entre visitas sem precisar de login ou servidor.
 *
 * Uso em uma lição (.mdx):
 *
 *   <Checkpoint id="modulo-1-intro">
 *     Entendi que a prática roda no Claude Code real, não na página.
 *   </Checkpoint>
 *
 * `id` é obrigatório e deve ser único no curso.
 */
export default function Checkpoint({id, children, label}) {
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!id) {
      // Falha barulhenta em desenvolvimento: um checkpoint sem id não
      // consegue salvar progresso e provavelmente é um erro de conteúdo.
      // eslint-disable-next-line no-console
      console.warn('<Checkpoint> precisa de uma prop "id" única.');
      return;
    }
    try {
      setDone(localStorage.getItem(storageKey(id)) === '1');
    } catch (e) {
      /* localStorage indisponível (ex. modo privado): segue sem persistir. */
    }
    setReady(true);
  }, [id]);

  const toggle = () => {
    const next = !done;
    setDone(next);
    try {
      if (next) {
        localStorage.setItem(storageKey(id), '1');
      } else {
        localStorage.removeItem(storageKey(id));
      }
    } catch (e) {
      /* sem persistência: o estado ainda vale para esta sessão. */
    }
  };

  return (
    <label className={clsx(styles.checkpoint, done && styles.concluido)}>
      <input
        type="checkbox"
        className={styles.caixa}
        checked={done}
        onChange={toggle}
        disabled={!ready}
      />
      <span className={styles.texto}>
        {children || label || 'Marcar como concluído'}
      </span>
    </label>
  );
}
