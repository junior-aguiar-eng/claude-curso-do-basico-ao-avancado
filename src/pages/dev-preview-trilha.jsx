import React from 'react';
import Layout from '@theme/Layout';
import SidebarLicao from '@site/src/components/SidebarLicao';
import MapaTrilha from '@site/src/components/MapaTrilha';
import ConclusaoBloco from '@site/src/components/ConclusaoBloco';
import Mascote from '@site/src/components/Mascote';
import {modulosBlocoAtual, blocosTrilha, resumoBlocoConcluido} from '@site/src/data/mockTrilha';

// Página interna de validação visual, com dados fictícios — não faz parte
// da navegação do site (sem link no menu). Serve para conferir os três
// componentes de trilha antes de integrá-los ao layout real das lições.
export default function DevPreviewTrilha() {
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
      </main>
    </Layout>
  );
}
