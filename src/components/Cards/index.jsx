import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * Grid de cards para conteúdo mais denso em texto que não é código nem
 * diagrama — comparação lado a lado, lista de ferramentas/conectores,
 * ou um exemplo ilustrativo isolado (1 card só). Usado no Bloco 0, que
 * por ser conteúdo institucional/produto não tem sandbox nem transcrição
 * de terminal para quebrar o texto corrido.
 *
 * `tag` é opcional: um rótulo curto (ex. "FERRAMENTA", "MODELO") no
 * mesmo padrão visual dos badges já usados no site (pill em JetBrains
 * Mono) — substitui ícone customizado por um marcador temático leve.
 *
 * `texto` aceita uma string (um parágrafo) ou uma lista de strings/nós
 * (ex. as falas de uma conversa ilustrativa) — cada item da lista vira um
 * parágrafo próprio dentro do card.
 *
 * Uso:
 *
 *   <Cards itens={[
 *     {tag: 'MODELO', titulo: 'Opus', texto: 'Tarefas complexas...'},
 *     {tag: 'MODELO', titulo: 'Sonnet', texto: 'Equilíbrio dia a dia...'},
 *   ]} />
 */
export default function Cards({itens = [], colunas}) {
  return (
    <div
      className={styles.grade}
      style={colunas ? {gridTemplateColumns: `repeat(${colunas}, minmax(0, 1fr))`} : undefined}
    >
      {itens.map((item, i) => (
        <div key={i} className={clsx(styles.card, 'curso-glow-card')}>
          {item.tag && <span className={styles.tag}>{item.tag}</span>}
          <h4 className={styles.titulo}>{item.titulo}</h4>
          {Array.isArray(item.texto) ? (
            item.texto.map((linha, j) => (
              <p key={j} className={styles.texto}>
                {linha}
              </p>
            ))
          ) : (
            <p className={styles.texto}>{item.texto}</p>
          )}
        </div>
      ))}
    </div>
  );
}
