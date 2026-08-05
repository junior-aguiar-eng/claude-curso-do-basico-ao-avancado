import React from 'react';
import SidebarLicao from '@site/src/components/SidebarLicao';
import {useEstadoTrilha, calcularEstagioMascote} from '@site/src/components/_shared/trilha';
import {modulosCurso} from '@site/src/data/modulosCurso';
import styles from './styles.module.css';

/**
 * Liga o componente pronto SidebarLicao ao progresso real do aluno:
 * acha o bloco do módulo atual e monta a lista de módulos daquele bloco
 * com estado (concluído/atual/bloqueado), a partir de
 * _shared/trilha.js.
 *
 * Uso em uma lição (.mdx), logo após a linha de Bloco/Eixo/Nível:
 *
 *   <SidebarLicaoAtual moduloId="m1" />
 */
export default function SidebarLicaoAtual({moduloId}) {
  const {modulos, blocos} = useEstadoTrilha();
  const bloco = blocos.find((b) => b.modulos.some((m) => m.id === moduloId));

  if (!bloco) {
    return null;
  }

  const tituloPorId = Object.fromEntries(modulosCurso.map((m) => [m.id, m.titulo]));
  const modulosDoBloco = bloco.modulos.map((m) => ({
    id: m.id,
    titulo: tituloPorId[m.id] ?? m.id,
    estado: m.estado,
  }));

  return (
    <div className={styles.wrapper}>
      <SidebarLicao
        modulos={modulosDoBloco}
        tituloBloco={`Bloco ${bloco.numero} — ${bloco.nome}`}
        estagioMascote={calcularEstagioMascote(modulos)}
      />
    </div>
  );
}
