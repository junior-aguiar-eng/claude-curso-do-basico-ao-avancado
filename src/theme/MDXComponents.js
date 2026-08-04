// Torna os componentes da biblioteca padrão disponíveis em toda lição .mdx
// sem precisar de import em cada arquivo. Assim o conteúdo usa <Quiz>,
// <Checkpoint> e <Diagrama> diretamente.

import MDXComponents from '@theme-original/MDXComponents';
import {Quiz, Checkpoint, Diagrama} from '@site/src/components';

export default {
  ...MDXComponents,
  Quiz,
  Checkpoint,
  Diagrama,
};
