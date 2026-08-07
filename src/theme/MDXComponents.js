// Torna os componentes da biblioteca padrão disponíveis em toda lição .mdx
// sem precisar de import em cada arquivo. Assim o conteúdo usa
// <SandboxPython>, <Quiz>, <Checkpoint>, <Diagrama>, <Termo> e
// <NivelBadge> diretamente.

import MDXComponents from '@theme-original/MDXComponents';
import {SandboxPython, Quiz, Checkpoint, Diagrama, Termo, NivelBadge} from '@site/src/components';
// SidebarLicaoAtual e ConclusaoBlocoAtual não fazem parte da biblioteca
// padrão de componentes interativos (src/components/index.js) — são
// chrome de navegação/progresso da trilha, registrados aqui à parte
// pelo mesmo motivo prático (uso direto em .mdx sem import).
import SidebarLicaoAtual from '@site/src/components/SidebarLicaoAtual';
import ConclusaoBlocoAtual from '@site/src/components/ConclusaoBlocoAtual';

export default {
  ...MDXComponents,
  SandboxPython,
  Quiz,
  Checkpoint,
  Diagrama,
  Termo,
  NivelBadge,
  SidebarLicaoAtual,
  ConclusaoBlocoAtual,
};
