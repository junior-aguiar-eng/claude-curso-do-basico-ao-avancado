import React, {useMemo} from 'react';
import {gerarGrade, TAMANHO_GRADE, TOTAL_ESTAGIOS} from './grade';
import styles from './styles.module.css';

const rotulosEstagio = [
  'Mascote do curso, estágio inicial',
  'Mascote do curso, com topete',
  'Mascote do curso, com topete e cinto',
  'Mascote do curso, com topete, cinto e emblema',
];

/**
 * Mascote em pixel art, único elemento decorativo (não sóbrio, de
 * propósito) da interface. Usado em dois lugares: rodapé da sidebar da
 * lição (pequeno) e tela de conclusão de bloco (grande, refletindo o
 * estágio de progresso do aluno).
 */
export default function Mascote({estagio = 0, tamanho = 56}) {
  const estagioValido = Math.max(0, Math.min(estagio, TOTAL_ESTAGIOS - 1));
  const celulas = useMemo(() => gerarGrade(estagioValido), [estagioValido]);
  const rotulo = rotulosEstagio[estagioValido];

  return (
    <svg
      className={styles.mascote}
      viewBox={`0 0 ${TAMANHO_GRADE} ${TAMANHO_GRADE}`}
      width={tamanho}
      height={tamanho}
      role="img"
      aria-label={rotulo}
      shapeRendering="crispEdges"
    >
      {celulas.map(({x, y, cor}) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={cor} />
      ))}
    </svg>
  );
}
