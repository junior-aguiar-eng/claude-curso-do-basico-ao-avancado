import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import SidebarLicao from '@site/src/components/SidebarLicao';
import MapaTrilha from '@site/src/components/MapaTrilha';
import ConclusaoBloco from '@site/src/components/ConclusaoBloco';
import Mascote from '@site/src/components/Mascote';
import Checkpoint from '@site/src/components/Checkpoint';
import {obterProgresso} from '@site/src/components/_shared/progresso';
import {modulosBlocoAtual, blocosTrilha, resumoBlocoConcluido} from '@site/src/data/mockTrilha';

// Módulos fictícios só para testar o componente C (progresso local) sem
// mexer nos dados fixos usados pelas outras seções desta página.
const MODULOS_TESTE_PROGRESSO = [
  {id: 'dev-preview-teste-1', titulo: 'Módulo de teste 1'},
  {id: 'dev-preview-teste-2', titulo: 'Módulo de teste 2'},
  {id: 'dev-preview-teste-3', titulo: 'Módulo de teste 3'},
];

// Página interna de validação visual, com dados fictícios — não faz parte
// da navegação do site (sem link no menu). Serve para conferir os três
// componentes de trilha antes de integrá-los ao layout real das lições.
export default function DevPreviewTrilha() {
  // Incrementado a cada Checkpoint marcado/desmarcado, só para forçar a
  // releitura de obterProgresso() — o localStorage não dispara re-render
  // por conta própria.
  const [versaoProgresso, setVersaoProgresso] = useState(0);

  const modulosComProgresso = useMemo(() => {
    const progresso = obterProgresso();
    return MODULOS_TESTE_PROGRESSO.map((modulo) => ({
      ...modulo,
      estado: progresso[modulo.id] ? 'concluido' : 'atual',
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [versaoProgresso]);

  return (
    <Layout title="Pré-visualização — componentes de trilha (dev)">
      <main style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '3rem'}}>
        <section>
          <h1>Pré-visualização — componentes de trilha</h1>
          <p>Página interna com dados fictícios, para validar os três componentes visuais.</p>
        </section>

        <section>
          <h2>Estágios do mascote</h2>
          <div style={{display: 'flex', gap: '1.5rem', alignItems: 'flex-end'}}>
            {[0, 1, 2, 3].map((estagio) => (
              <div key={estagio} style={{textAlign: 'center'}}>
                <Mascote estagio={estagio} tamanho={72} />
                <p style={{fontSize: '0.8rem', marginTop: '0.4rem'}}>Estágio {estagio}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Componente 1 — SidebarLicao</h2>
          <SidebarLicao
            tituloBloco="Bloco 3"
            modulos={modulosBlocoAtual}
            estagioMascote={1}
          />
        </section>

        <section>
          <h2>Componente 2 — MapaTrilha</h2>
          <MapaTrilha blocos={blocosTrilha} hrefContinuar="#" />
        </section>

        <section>
          <h2>Componente 3 — ConclusaoBloco</h2>
          <ConclusaoBloco
            blocoNome={resumoBlocoConcluido.blocoNome}
            titulo={resumoBlocoConcluido.titulo}
            mensagem={resumoBlocoConcluido.mensagem}
            licoes={resumoBlocoConcluido.licoes}
            exercicios={resumoBlocoConcluido.exercicios}
            estagioMascote={resumoBlocoConcluido.estagioMascote}
            hrefRevisar="#"
            hrefProximo="#"
          />
        </section>

        <section>
          <h2>Componente C — Checkpoint + progresso local</h2>
          <p>
            Marque/desmarque os checkpoints abaixo e veja a SidebarLicao de
            teste refletir o mesmo estado, lido de <code>obterProgresso()</code>{' '}
            (<code>_shared/progresso.js</code>) — progresso salvo só neste
            navegador, sem sincronizar entre dispositivos.
          </p>
          <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start'}}>
            <div style={{flex: '1 1 320px'}}>
              {MODULOS_TESTE_PROGRESSO.map((modulo) => (
                <Checkpoint
                  key={modulo.id}
                  id={modulo.id}
                  onChange={() => setVersaoProgresso((v) => v + 1)}
                >
                  {modulo.titulo}
                </Checkpoint>
              ))}
            </div>
            <div style={{flex: '0 0 280px'}}>
              <SidebarLicao tituloBloco="Teste — progresso local" modulos={modulosComProgresso} />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
