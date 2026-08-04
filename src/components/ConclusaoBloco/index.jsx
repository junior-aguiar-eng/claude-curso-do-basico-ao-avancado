import React from 'react';
import Mascote from '@site/src/components/Mascote';
import styles from './styles.module.css';

/**
 * Tela de conclusão de bloco: layout centralizado (não é uma lista, como
 * os outros dois componentes). Mostra o selo do bloco concluído, o
 * mascote no estágio correspondente, um resumo do que foi feito, e dois
 * caminhos: revisar ou seguir em frente.
 *
 * Título e mensagem são passados pelo autor da lição — o componente não
 * gera texto de celebração sozinho.
 *
 * @param {string} blocoNome - nome do bloco concluído, exibido no selo
 * @param {string} titulo
 * @param {string} mensagem - parágrafo curto conectando o que foi
 *   aprendido ao que vem a seguir
 * @param {number} licoes - número de lições do bloco
 * @param {number} exercicios - número de exercícios do bloco
 * @param {number} [estagioMascote]
 * @param {string} [hrefRevisar] @param {() => void} [onRevisar]
 * @param {string} [hrefProximo] @param {() => void} [onProximo]
 * @param {string} [textoProximo] - rótulo do botão principal
 */
export default function ConclusaoBloco({
  blocoNome,
  titulo,
  mensagem,
  licoes,
  exercicios,
  estagioMascote = 0,
  hrefRevisar,
  onRevisar,
  hrefProximo,
  onProximo,
  textoProximo = 'Seguir para o próximo bloco',
}) {
  const BotaoRevisar = hrefRevisar ? 'a' : 'button';
  const propsRevisar = hrefRevisar ? {href: hrefRevisar} : {type: 'button', onClick: onRevisar};

  const BotaoProximo = hrefProximo ? 'a' : 'button';
  const propsProximo = hrefProximo ? {href: hrefProximo} : {type: 'button', onClick: onProximo};

  return (
    <div className={styles.tela}>
      <span className={styles.selo}>{blocoNome} concluído</span>

      <Mascote estagio={estagioMascote} tamanho={96} />

      <h2 className={styles.titulo}>{titulo}</h2>
      {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

      <dl className={styles.resumo}>
        <div className={styles.resumoItem}>
          <dt>Lições</dt>
          <dd>{licoes}</dd>
        </div>
        <div className={styles.resumoItem}>
          <dt>Exercícios</dt>
          <dd>{exercicios}</dd>
        </div>
      </dl>

      <div className={styles.acoes}>
        <BotaoRevisar className={styles.botaoSecundario} {...propsRevisar}>
          Revisar o bloco
        </BotaoRevisar>
        <BotaoProximo className={styles.botaoPrimario} {...propsProximo}>
          {textoProximo}
        </BotaoProximo>
      </div>
    </div>
  );
}
