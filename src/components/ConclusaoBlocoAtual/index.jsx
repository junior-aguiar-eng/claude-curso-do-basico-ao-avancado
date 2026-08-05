import React from 'react';
import ConclusaoBloco from '@site/src/components/ConclusaoBloco';
import {useEstadoTrilha, calcularEstagioMascote, ESTADOS} from '@site/src/components/_shared/trilha';
import {blocosCurso} from '@site/src/data/blocosCurso';
import {modulosCurso} from '@site/src/data/modulosCurso';

const slugPorId = Object.fromEntries(modulosCurso.map((m) => [m.id, m.slug]));

/**
 * Liga o componente pronto ConclusaoBloco ao progresso real: só
 * aparece quando todos os módulos do bloco estão concluídos (mesmo
 * padrão do ConclusaoCurso — não recebe estado por prop, consulta
 * _shared/trilha.js sozinho e reage ao evento `curso:progresso`).
 *
 * A mensagem é gerada a partir do nome do bloco atual e do próximo —
 * não é texto pedagógico novo por bloco, é template.
 *
 * Uso em uma lição (.mdx), logo após o <Checkpoint> da última lição de
 * cada bloco (bloco 0 a 8 — o bloco 9/M18 já é coberto por
 * ConclusaoCurso, que fecha o curso inteiro):
 *
 *   <ConclusaoBlocoAtual blocoId="bloco-4" />
 */
export default function ConclusaoBlocoAtual({blocoId}) {
  const {modulos, blocos} = useEstadoTrilha();
  const bloco = blocos.find((b) => b.id === blocoId);

  if (!bloco || bloco.estado !== ESTADOS.CONCLUIDO) {
    return null;
  }

  const indice = blocosCurso.findIndex((b) => b.id === blocoId);
  // ConclusaoBlocoAtual só é usado nos blocos 0-8 — o bloco 9 (M18) é
  // fechado por ConclusaoCurso, então sempre há um próximo bloco aqui.
  const proximoBloco = blocosCurso[indice + 1];

  const licoes = bloco.modulos.length;
  const exercicios = blocosCurso[indice].modulos.filter((m) => m.temLab).length;

  const primeiroModuloSlug = slugPorId[bloco.modulos[0]?.id];
  const proximoModuloSlug = slugPorId[proximoBloco.modulos[0]?.id];

  return (
    <ConclusaoBloco
      blocoNome={`Bloco ${bloco.numero}`}
      titulo={`${bloco.nome} concluído`}
      mensagem={`Você concluiu o Bloco ${bloco.numero} — ${bloco.nome}. A seguir: Bloco ${proximoBloco.numero} — ${proximoBloco.nome}.`}
      licoes={licoes}
      exercicios={exercicios}
      estagioMascote={calcularEstagioMascote(modulos)}
      hrefRevisar={`/${primeiroModuloSlug}`}
      hrefProximo={`/${proximoModuloSlug}`}
    />
  );
}
