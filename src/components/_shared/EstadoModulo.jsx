import React from 'react';
import styles from './EstadoModulo.module.css';

/**
 * Ícone + rótulo de acessibilidade para os três estados possíveis de um
 * módulo/bloco na trilha: concluído, atual, bloqueado. Peça interna
 * compartilhada por SidebarLicao e MapaTrilha — não faz parte da
 * biblioteca pública de conteúdo (não entra no MDXComponents).
 */
export const ESTADOS = {
  CONCLUIDO: 'concluido',
  ATUAL: 'atual',
  BLOQUEADO: 'bloqueado',
};

const rotulos = {
  [ESTADOS.CONCLUIDO]: 'Concluído',
  [ESTADOS.ATUAL]: 'Em andamento',
  [ESTADOS.BLOQUEADO]: 'Bloqueado',
};

const classesIcone = {
  [ESTADOS.CONCLUIDO]: 'iconeConcluido',
  [ESTADOS.ATUAL]: 'iconeAtual',
  [ESTADOS.BLOQUEADO]: 'iconeBloqueado',
};

export function IconeEstado({estado, className}) {
  const rotulo = rotulos[estado] ?? estado;
  const corClasse = styles[classesIcone[estado]] ?? '';
  const classeFinal = [styles.icone, corClasse, className].filter(Boolean).join(' ');
  return (
    <span className={classeFinal} role="img" aria-label={rotulo}>
      {estado === ESTADOS.CONCLUIDO && (
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path
            d="M3 8.5L6.5 12L13 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {estado === ESTADOS.ATUAL && (
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <circle cx="8" cy="8" r="5" fill="currentColor" />
        </svg>
      )}
      {estado === ESTADOS.BLOQUEADO && (
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <rect
            x="3.5"
            y="7"
            width="9"
            height="7"
            rx="1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
}

/** Classe CSS de texto correspondente ao estado, para uso no rótulo ao lado do ícone. */
export function textoClasseEstado(estado) {
  switch (estado) {
    case ESTADOS.CONCLUIDO:
      return styles.textoConcluido;
    case ESTADOS.ATUAL:
      return styles.textoAtual;
    case ESTADOS.BLOQUEADO:
      return styles.textoBloqueado;
    default:
      return '';
  }
}
