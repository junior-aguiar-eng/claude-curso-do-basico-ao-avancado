// Deriva o estado da trilha (por módulo e por bloco) a partir do
// progresso salvo em localStorage (_shared/progresso.js) — que só
// responde "esse checkpoint está concluído?", nada mais. Aqui isso vira
// "qual módulo é o atual, quais estão bloqueados" e "esse bloco já foi
// concluído por inteiro?", consumido por SidebarLicaoAtual,
// ConclusaoBlocoAtual e a página /trilha.
//
// Curso é linear, sem ramificação: o primeiro módulo sem checkpoint
// marcado é o "atual"; tudo antes dele, concluído; tudo depois,
// bloqueado. Mesmo padrão de "observar o evento curso:progresso" já
// usado por ConclusaoCurso, generalizado aqui para todo módulo/bloco.

import {useEffect, useState} from 'react';
import {obterProgresso} from './progresso';
import {modulosCurso} from '@site/src/data/modulosCurso';
import {blocosCurso} from '@site/src/data/blocosCurso';

export const ESTADOS = {
  CONCLUIDO: 'concluido',
  ATUAL: 'atual',
  BLOQUEADO: 'bloqueado',
};

/** Estado de cada módulo do curso, na ordem do currículo. */
export function calcularEstadoModulos() {
  const progresso = obterProgresso();
  let atualJaEncontrado = false;

  return modulosCurso.map((modulo) => {
    if (progresso[modulo.id]) {
      return {...modulo, estado: ESTADOS.CONCLUIDO};
    }
    if (!atualJaEncontrado) {
      atualJaEncontrado = true;
      return {...modulo, estado: ESTADOS.ATUAL};
    }
    return {...modulo, estado: ESTADOS.BLOQUEADO};
  });
}

/** Estado de cada bloco: concluído (todos os módulos concluídos),
 * bloqueado (nenhum começado) ou atual (o resto — contém o módulo
 * atual, ou uma mistura de concluído/bloqueado). */
export function calcularEstadoBlocos() {
  const estadoPorId = Object.fromEntries(calcularEstadoModulos().map((m) => [m.id, m]));

  return blocosCurso.map((bloco) => {
    const modulosDoBloco = bloco.modulos.map((m) => estadoPorId[m.id]).filter(Boolean);
    const todosConcluidos = modulosDoBloco.every((m) => m.estado === ESTADOS.CONCLUIDO);
    const nenhumComecado = modulosDoBloco.every((m) => m.estado === ESTADOS.BLOQUEADO);
    const estado = todosConcluidos
      ? ESTADOS.CONCLUIDO
      : nenhumComecado
        ? ESTADOS.BLOQUEADO
        : ESTADOS.ATUAL;
    return {...bloco, estado, modulos: modulosDoBloco};
  });
}

/** Acha o bloco pelo id, já com estado calculado. */
export function encontrarBloco(blocoId) {
  return calcularEstadoBlocos().find((bloco) => bloco.id === blocoId) ?? null;
}

/** Acha o bloco ao qual um módulo pertence, já com estado calculado. */
export function encontrarBlocoDoModulo(moduloId) {
  return calcularEstadoBlocos().find((bloco) => bloco.modulos.some((m) => m.id === moduloId)) ?? null;
}

/** Estágio do mascote (0-3, ver Mascote) a partir da fração do curso já
 * concluída — mesma escala usada em Navbar (0, sempre) e ConclusaoCurso
 * (3, curso inteiro), agora também para SidebarLicaoAtual/ConclusaoBlocoAtual. */
export function calcularEstagioMascote(modulos) {
  const total = modulos.length;
  if (total === 0) return 0;
  const concluidos = modulos.filter((m) => m.estado === ESTADOS.CONCLUIDO).length;
  const fracao = concluidos / total;
  return Math.min(3, Math.floor(fracao * 4));
}

/**
 * Hook: recalcula o estado da trilha sempre que um checkpoint muda
 * (evento `curso:progresso`, disparado por marcarConcluido), sem
 * precisar recarregar a página — mesmo padrão do ConclusaoCurso.
 */
export function useEstadoTrilha() {
  const [modulos, setModulos] = useState(() => calcularEstadoModulos());
  const [blocos, setBlocos] = useState(() => calcularEstadoBlocos());

  useEffect(() => {
    const recalcular = () => {
      setModulos(calcularEstadoModulos());
      setBlocos(calcularEstadoBlocos());
    };
    recalcular();
    window.addEventListener('curso:progresso', recalcular);
    return () => window.removeEventListener('curso:progresso', recalcular);
  }, []);

  return {modulos, blocos};
}
