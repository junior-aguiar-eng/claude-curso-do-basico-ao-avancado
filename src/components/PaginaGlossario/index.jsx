import React, {useMemo} from 'react';
import Heading from '@theme/Heading';
import glossario from '@site/src/data/glossario.json';
import {definicaoExibivel, DEFINICAO_PENDENTE} from '../_shared/glossario';
import styles from './styles.module.css';

const rotuloEixo = {
  A: 'Eixo A — Claude e Claude Code',
  B: 'Eixo B — Fundamentos de Python',
};

function numeroModulo(moduloOrigem) {
  return parseInt(moduloOrigem.replace(/\D/g, ''), 10);
}

function agruparPorModulo(dados) {
  const porModulo = new Map();
  for (const [id, entrada] of Object.entries(dados)) {
    const lista = porModulo.get(entrada.moduloOrigem) ?? [];
    lista.push({id, ...entrada});
    porModulo.set(entrada.moduloOrigem, lista);
  }
  return [...porModulo.entries()].sort(
    ([a], [b]) => numeroModulo(a) - numeroModulo(b),
  );
}

/**
 * Lista todos os termos de `src/data/glossario.json`, agrupados por
 * módulo de origem. Usada pela página `/glossario` (`docs/glossario.mdx`).
 *
 * Termos de módulos ainda não escritos ficam com o placeholder interno
 * ("TODO: definir") no JSON — aqui exibimos uma mensagem de "em breve"
 * no lugar, nunca o placeholder cru.
 */
export default function PaginaGlossario() {
  const grupos = useMemo(() => agruparPorModulo(glossario), []);

  return (
    <div className={styles.paginaGlossario}>
      {grupos.map(([moduloOrigem, termos]) => (
        <section key={moduloOrigem} className={styles.grupo}>
          <h2 className={styles.tituloGrupo}>{moduloOrigem}</h2>
          <div className={styles.lista}>
            {termos.map((termo) => (
              <div key={termo.id} className={styles.item}>
                <Heading as="h3" id={termo.id} className={styles.termo}>
                  {termo.termo}
                  <span className={`${styles.eixo} ${styles[`eixo${termo.eixo}`]}`}>
                    {rotuloEixo[termo.eixo] ?? termo.eixo}
                  </span>
                </Heading>
                <p
                  className={
                    termo.definicao === DEFINICAO_PENDENTE
                      ? `${styles.definicao} ${styles.pendente}`
                      : styles.definicao
                  }
                >
                  {definicaoExibivel(termo)}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
