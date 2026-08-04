import React from 'react';
import Mascote from '@site/src/components/Mascote';
import {IconeEstado, textoClasseEstado, ESTADOS} from '@site/src/components/_shared/EstadoModulo';
import styles from './styles.module.css';

/**
 * Sidebar de navegação da lição: lista os módulos do bloco atual com seu
 * estado (concluído/atual/bloqueado), uma barra de progresso e o mascote
 * no rodapé.
 *
 * @param {{id: string, titulo: string, estado: 'concluido'|'atual'|'bloqueado'}[]} modulos
 * @param {string} [tituloBloco]
 * @param {number} [estagioMascote] - estágio do mascote (0 a 3), ver Mascote.
 */
export default function SidebarLicao({modulos = [], tituloBloco, estagioMascote = 0}) {
  const concluidos = modulos.filter((m) => m.estado === ESTADOS.CONCLUIDO).length;
  const total = modulos.length;
  const progresso = total > 0 ? Math.round((concluidos / total) * 100) : 0;

  return (
    <nav className={styles.sidebar} aria-label="Módulos do bloco">
      {tituloBloco && <p className={styles.tituloBloco}>{tituloBloco}</p>}

      <ul className={styles.lista}>
        {modulos.map((modulo) => (
          <li key={modulo.id}>
            <div
              className={
                modulo.estado === ESTADOS.ATUAL
                  ? `${styles.item} ${styles.itemAtual}`
                  : styles.item
              }
            >
              <IconeEstado estado={modulo.estado} />
              <span className={textoClasseEstado(modulo.estado)}>{modulo.titulo}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.progresso}>
        <div
          className={styles.progressoBarra}
          role="progressbar"
          aria-valuenow={progresso}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${concluidos} de ${total} módulos concluídos`}
        >
          <div className={styles.progressoPreenchido} style={{width: `${progresso}%`}} />
        </div>
        <p className={styles.progressoTexto}>
          {concluidos} de {total} módulos
        </p>
      </div>

      <div className={styles.rodape}>
        <Mascote estagio={estagioMascote} tamanho={56} />
        <p className={styles.rodapeTexto}>
          Você já percorreu {concluidos} {concluidos === 1 ? 'módulo' : 'módulos'}
        </p>
      </div>
    </nav>
  );
}
