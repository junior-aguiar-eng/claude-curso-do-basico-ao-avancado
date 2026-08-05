import React from 'react';
import Link from '@docusaurus/Link';
import {IconeEstado, textoClasseEstado, ESTADOS} from '@site/src/components/_shared/EstadoModulo';
import styles from './styles.module.css';

/**
 * Mapa da trilha completa: uma linha por bloco (não por módulo individual),
 * com estado, nome, e quadrados indicando quantos módulos o bloco tem e a
 * qual eixo pertencem.
 *
 * @param {{
 *   id: string,
 *   nome: string,
 *   estado: 'concluido'|'atual'|'bloqueado',
 *   modulos: {eixo: 'A'|'B', concluido?: boolean}[],
 * }[]} blocos
 * @param {string} [hrefContinuar]
 * @param {() => void} [onContinuar]
 */
export default function MapaTrilha({blocos = [], hrefContinuar, onContinuar}) {
  const totalConcluidos = blocos.reduce((soma, bloco) => {
    const modulosConcluidos = bloco.modulos.filter((m) =>
      m.concluido !== undefined ? m.concluido : bloco.estado === ESTADOS.CONCLUIDO
    ).length;
    return soma + modulosConcluidos;
  }, 0);
  const totalModulos = blocos.reduce((soma, bloco) => soma + bloco.modulos.length, 0);

  // <Link> (não <a> cru) para respeitar o baseUrl do site em produção.
  const BotaoContinuar = hrefContinuar ? Link : 'button';
  const propsBotao = hrefContinuar
    ? {to: hrefContinuar}
    : {type: 'button', onClick: onContinuar};

  return (
    <div className={styles.mapa}>
      <div className={styles.legenda}>
        <span className={styles.legendaItem}>
          <span className={`${styles.quadrado} ${styles.eixoA}`} />
          Eixo A — Claude e Claude Code
        </span>
        <span className={styles.legendaItem}>
          <span className={`${styles.quadrado} ${styles.eixoB}`} />
          Eixo B — Fundamentos de Python
        </span>
      </div>

      <ul className={styles.lista}>
        {blocos.map((bloco) => (
          <li
            key={bloco.id}
            className={
              bloco.estado === ESTADOS.ATUAL ? `${styles.linha} ${styles.linhaAtual}` : styles.linha
            }
          >
            <IconeEstado estado={bloco.estado} />
            <span className={`${styles.nome} ${textoClasseEstado(bloco.estado)}`}>{bloco.nome}</span>
            <span className={styles.quadrados} aria-label={`${bloco.modulos.length} módulos`}>
              {bloco.modulos.map((modulo, i) => (
                <span
                  key={i}
                  className={`${styles.quadrado} ${modulo.eixo === 'A' ? styles.eixoA : styles.eixoB}`}
                />
              ))}
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.rodape}>
        <p className={styles.rodapeTexto}>
          {totalConcluidos} de {totalModulos} módulos concluídos
        </p>
        <BotaoContinuar className={styles.botaoContinuar} {...propsBotao}>
          Continuar de onde parou
        </BotaoContinuar>
      </div>
    </div>
  );
}
