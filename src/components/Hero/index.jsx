import React from 'react';
import styles from './styles.module.css';

const LINHAS_TERMINAL = [
  {tipo: 'prompt', texto: 'claude "cria a função saudacao"'},
  {tipo: 'vazio'},
  {tipo: 'rotulo', texto: '✻ Claude Code'},
  {tipo: 'texto', texto: 'Plano: vou criar a função em 3 passos'},
  {tipo: 'texto', texto: '  1. Definir saudacao(nome)'},
  {tipo: 'texto', texto: '  2. Testar com dois nomes diferentes'},
  {tipo: 'texto', texto: '  3. Confirmar a saída'},
  {tipo: 'vazio'},
  {tipo: 'sucesso', texto: '✓ saudacao() criada'},
  {tipo: 'sucesso', texto: '✓ testes rodados, sem erro'},
  {tipo: 'vazio'},
  {tipo: 'cursor'},
];

/**
 * Painel de abertura do curso: sempre escuro (independente do tema claro/
 * escuro do site), com brilho coral e um mockup de terminal mostrando o
 * Claude Code em ação. Usado uma única vez, em docs/intro.mdx — conteúdo
 * (título, texto, links) vem de fora; o mockup de terminal é decorativo e
 * fixo.
 *
 * Uso:
 *
 *   <Hero
 *     eyebrow="Curso completo, do zero ao Agent SDK"
 *     title="Bem-vindo ao curso de Claude e Claude Code"
 *     subtitle="..."
 *     primaryHref="/m1-fundamentos-e-mentalidade" primaryLabel="Começar a primeira lição"
 *     secondaryHref="/glossario" secondaryLabel="Ver o glossário"
 *   />
 */
export default function Hero({
  eyebrow,
  title,
  subtitle,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}) {
  return (
    <div className={styles.hero}>
      <div className={styles.coluna}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.titulo}>
          {Array.isArray(title) ? (
            title.map((linha, i) => (
              <span key={i} className={i === title.length - 1 ? styles.tituloDestaque : undefined}>
                {linha}
                <br />
              </span>
            ))
          ) : (
            title
          )}
        </h1>
        {subtitle && <p className={styles.subtitulo}>{subtitle}</p>}
        <div className={styles.acoes}>
          {primaryHref && (
            <a className={styles.botaoPrimario} href={primaryHref}>
              {primaryLabel}
            </a>
          )}
          {secondaryHref && (
            <a className={styles.botaoSecundario} href={secondaryHref}>
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>

      <div className={styles.coluna}>
        <div className={styles.terminal} aria-hidden="true">
          <div className={styles.terminalBarra}>
            <span className={styles.bolinha} />
            <span className={styles.bolinha} />
            <span className={styles.bolinha} />
          </div>
          <pre className={styles.terminalCorpo}>
            {LINHAS_TERMINAL.map((linha, i) => {
              if (linha.tipo === 'vazio') return <div key={i}>&nbsp;</div>;
              if (linha.tipo === 'cursor') {
                return (
                  <div key={i}>
                    <span className={styles.prompt}>~ $</span> <span className={styles.piscar}>_</span>
                  </div>
                );
              }
              if (linha.tipo === 'prompt') {
                return (
                  <div key={i}>
                    <span className={styles.prompt}>~ $</span> {linha.texto}
                  </div>
                );
              }
              return (
                <div key={i} className={styles[linha.tipo]}>
                  {linha.texto}
                </div>
              );
            })}
          </pre>
        </div>
      </div>
    </div>
  );
}
