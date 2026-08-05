import React, {useMemo, useState} from 'react';
import Mermaid from '@theme/Mermaid';
import styles from './styles.module.css';

// Linhas de cabeçalho reconhecidas: declaram o tipo de diagrama Mermaid e
// precisam estar sempre presentes, mesmo nas primeiras etapas.
const PADRAO_CABECALHO = /^\s*(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(-v2)?)\b/i;

/**
 * Separa o código Mermaid em linha(s) de cabeçalho e linhas de corpo.
 * Cada linha de corpo não-vazia vira uma "etapa" — sem entender o que ela
 * significa (nó, aresta, etc.), só revelando o texto do diagrama aos
 * poucos. Funciona para qualquer fluxo simples, mas não trata blocos
 * multilinha (ex. `subgraph ... end`).
 */
function separarEtapas(codigo) {
  const linhas = codigo.split('\n');
  const cabecalho = [];
  const corpo = [];
  let noCabecalho = true;

  for (const linha of linhas) {
    if (noCabecalho && (linha.trim() === '' || PADRAO_CABECALHO.test(linha))) {
      cabecalho.push(linha);
      if (linha.trim() !== '') noCabecalho = false;
      continue;
    }
    noCabecalho = false;
    if (linha.trim() !== '') corpo.push(linha);
  }

  return {cabecalho, corpo};
}

/**
 * Diagrama Mermaid com moldura, legenda e revelação progressiva por
 * etapas: em vez de mostrar tudo de uma vez, o aluno avança clique a
 * clique e cada clique revela a próxima linha do diagrama.
 *
 * Aceita qualquer sintaxe Mermaid de fluxo simples — não há lógica
 * específica de conteúdo embutida no componente.
 *
 * Uso em uma lição (.mdx):
 *
 *   <Diagrama
 *     title="Onde a prática realmente acontece"
 *     chart={`
 *       flowchart LR
 *         A[Aluno no navegador] --> B[Site do curso]
 *         A --> C[Claude Code no Codespace]
 *         C --> D[Executa código real]
 *     `}
 *   />
 *
 * Também aceita o código do diagrama como conteúdo entre as tags.
 */
export default function Diagrama({chart, title, children}) {
  const code = (chart ?? (typeof children === 'string' ? children : '')).trim();
  const {cabecalho, corpo} = useMemo(() => separarEtapas(code), [code]);
  const totalEtapas = corpo.length;
  const [etapa, setEtapa] = useState(totalEtapas > 0 ? 1 : 0);

  const codigoParcial = useMemo(
    () => [...cabecalho, ...corpo.slice(0, etapa)].join('\n'),
    [cabecalho, corpo, etapa],
  );

  const voltar = () => setEtapa((e) => Math.max(1, e - 1));
  const avancar = () => setEtapa((e) => Math.min(totalEtapas, e + 1));

  return (
    <figure className={styles.diagrama}>
      <Mermaid key={etapa} value={codigoParcial} />
      {title && <figcaption className={styles.legenda}>{title}</figcaption>}
      {totalEtapas > 0 && (
        <div className={styles.controles}>
          <button
            type="button"
            className={styles.botaoEtapa}
            onClick={voltar}
            disabled={etapa <= 1}
          >
            ◀ Voltar
          </button>
          <span className={styles.contadorEtapa}>
            Etapa {etapa} de {totalEtapas}
          </span>
          <button
            type="button"
            className={styles.botaoEtapa}
            onClick={avancar}
            disabled={etapa >= totalEtapas}
          >
            Avançar ▶
          </button>
        </div>
      )}
    </figure>
  );
}
