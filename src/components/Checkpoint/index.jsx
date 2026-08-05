import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {marcarConcluido, estaConcluido} from '../_shared/progresso';
import styles from './styles.module.css';

/**
 * Checkpoint de progresso da lição.
 *
 * O estado é salvo no próprio navegador do aluno via `_shared/progresso.js`
 * (localStorage), então a marcação persiste entre visitas sem precisar de
 * login ou servidor — mas não sincroniza entre dispositivos.
 *
 * Uso em uma lição (.mdx):
 *
 *   <Checkpoint id="modulo-1-intro">
 *     Entendi que a prática roda no Claude Code real, não na página.
 *   </Checkpoint>
 *
 * `id` é obrigatório e deve ser único no curso.
 *
 * `onChange(concluido)` é opcional: dispara depois de marcar/desmarcar,
 * para outros componentes na mesma página (ex. sidebar, mapa da trilha)
 * saberem que devem reconsultar `obterProgresso()`.
 */
export default function Checkpoint({id, children, label, onChange}) {
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
    setDone(estaConcluido(id));
    setReady(true);
  }, [id]);

  const toggle = () => {
    const next = !done;
    setDone(next);
    marcarConcluido(id, next);
    onChange?.(next);
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
