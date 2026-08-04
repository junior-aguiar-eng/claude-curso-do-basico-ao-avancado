import React, {useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * Quiz de resposta única.
 *
 * Uso em uma lição (.mdx):
 *
 *   <Quiz
 *     question="O que o Claude Code executa na máquina do aluno?"
 *     options={[
 *       {text: 'Código real, com sua permissão', correct: true,
 *        explanation: 'Isso mesmo — a prática roda no ambiente real.'},
 *       {text: 'Apenas simulações no navegador',
 *        explanation: 'Não: o navegador só mostra o curso; a execução é real.'},
 *     ]}
 *   />
 *
 * Cada opção: { text, correct?, explanation? }.
 */
export default function Quiz({question, options = [], children}) {
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;
  const acertou = answered && options[selected]?.correct;

  return (
    <div className={styles.quiz} role="group" aria-label="Pergunta de revisão">
      <p className={styles.pergunta}>{question}</p>
      <ul className={styles.opcoes}>
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const estado = !answered
            ? null
            : opt.correct
            ? 'correta'
            : isSelected
            ? 'errada'
            : null;
          return (
            <li key={i}>
              <button
                type="button"
                className={clsx(styles.opcao, estado && styles[estado])}
                disabled={answered}
                onClick={() => setSelected(i)}
              >
                <span className={styles.marcador} aria-hidden="true">
                  {estado === 'correta' ? '✓' : estado === 'errada' ? '✗' : ''}
                </span>
                <span>{opt.text}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {answered && (
        <div
          className={clsx(styles.feedback, acertou ? styles.acertou : styles.errou)}
          role="status"
        >
          <strong>{acertou ? 'Correto! ' : 'Ainda não. '}</strong>
          {options[selected]?.explanation || children}
          {!acertou && (
            <button
              type="button"
              className={styles.tentar}
              onClick={() => setSelected(null)}
            >
              Tentar de novo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
