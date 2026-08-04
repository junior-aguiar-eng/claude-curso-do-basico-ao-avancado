// Torna os componentes da biblioteca padrão disponíveis em toda lição .mdx
// sem precisar de import em cada arquivo. Assim o conteúdo usa
// <SandboxPython>, <Quiz>, <Checkpoint> e <Diagrama> diretamente.

import MDXComponents from '@theme-original/MDXComponents';
import {SandboxPython, Quiz, Checkpoint, Diagrama} from '@site/src/components';

export default {
  ...MDXComponents,
  SandboxPython,
  Quiz,
  Checkpoint,
  Diagrama,
};
