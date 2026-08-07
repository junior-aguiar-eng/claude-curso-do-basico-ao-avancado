import React from 'react';
import Layout from '@theme/Layout';
import MapaTrilha from '@site/src/components/MapaTrilha';
import {useEstadoTrilha} from '@site/src/components/_shared/trilha';
import {modulosCurso} from '@site/src/data/modulosCurso';
import styles from './trilha.module.css';

// Página real da trilha: mapa dos 10 blocos do curso com progresso real
// do aluno (localStorage), substituindo o papel de dev-preview-trilha.jsx
// depois que MapaTrilha passou a ser alimentado com dados reais.
export default function Trilha() {
  const {modulos, blocos} = useEstadoTrilha();

  const slugPorId = Object.fromEntries(modulosCurso.map((m) => [m.id, m.slug]));
  const moduloAtual = modulos.find((m) => m.estado === 'atual');

  const blocosParaMapa = blocos.map((bloco) => ({
    id: bloco.id,
    nome: `Bloco ${bloco.numero} — ${bloco.nome}`,
    estado: bloco.estado,
    modulos: bloco.modulos.map((m) => ({eixo: bloco.eixo, concluido: m.estado === 'concluido'})),
  }));

  return (
    <Layout title="Trilha" description="Seu progresso pelos 10 blocos do curso.">
      <main className={styles.pagina}>
        <h1>Trilha</h1>
        <p>Os 10 blocos do curso — Bloco 0 ao Bloco 9 — e o quanto você já percorreu.</p>
        <MapaTrilha
          blocos={blocosParaMapa}
          hrefContinuar={moduloAtual ? `/${slugPorId[moduloAtual.id]}` : undefined}
        />
      </main>
    </Layout>
  );
}
