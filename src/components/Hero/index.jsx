import React from 'react';
import Link from '@docusaurus/Link';
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
 * Painel de abertura do curso: coluna única centralizada (mockup
 * aprovado), com um mockup de terminal mostrando o Claude Code em
 * ação. Usado uma única vez, em docs/intro.mdx — conteúdo (título,
 * texto, links) vem de fora; o mockup de terminal é decorativo e fixo.
 *
 * Links internos usam <Link> do Docusaurus (não <a> cru) para respeitar
 * o baseUrl do site em produção.
 *
 * Uso:
 *
 *   <Hero
 *     eyebrow="18 módulos · grátis · direto no navegador"
 *     title={['Aprenda Claude e', 'Claude Code']} tituloSufixo="do zero"
 *     subtitle="..."
 *     primaryHref="/m1-fundamentos-e-mentalidade" primaryLabel="Começar a primeira lição →"
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
      {eyebrow && (
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          {eyebrow}
        </p>
      )}

      <h1 className={styles.titulo}>
        {Array.isArray(title) ? (
          title.map((linha, i) => (
            <span key={i} className={i === title.length - 1 ? styles.tituloDestaque : undefined}>
              {linha}
              {i < title.length - 1 && <br />}
            </span>
          ))
        ) : (
          title
        )}
      </h1>

      {subtitle && <p className={styles.subtitulo}>{subtitle}</p>}

      <div className={styles.acoes}>
        {primaryHref && (
          <Link className={styles.botaoPrimario} to={primaryHref}>
            {primaryLabel}
          </Link>
        )}
        {secondaryHref && (
          <Link className={styles.botaoSecundario} to={secondaryHref}>
            {secondaryLabel}
          </Link>
        )}
      </div>

      <div className={styles.terminal} aria-hidden="true">
        <div className={styles.terminalBarra}>
          <span className={`${styles.bolinha} ${styles.bolinhaVermelha}`} />
          <span className={`${styles.bolinha} ${styles.bolinhaAmarela}`} />
          <span className={`${styles.bolinha} ${styles.bolinhaVerde}`} />
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
  );
}
