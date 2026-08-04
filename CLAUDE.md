# claude-curso-do-basico-ao-avancado

## O que é este projeto
Um curso online que ensina Claude e Claude Code do zero ao avançado,
voltado a **pessoas sem experiência em programação**. O curso vai até o
Agent SDK — portanto ensina programação (Python) no caminho, usando o
próprio Claude Code como ferramenta e como tutor de prática.

Este repositório é a **engenharia do curso**: o site, os componentes
interativos, os labs e o ambiente. Não é o conteúdo prático rodando —
a prática dos alunos acontece no Claude Code real, não aqui.

## Decisões de arquitetura (não reabrir sem instrução explícita)
- **Site**: Docusaurus sobre MDX. MDX é obrigatório — é o que permite
  texto didático e componentes interativos no mesmo arquivo de lição.
- **Linguagem-base dos labs de código**: Python. Escolhida por ser mais
  acessível a iniciantes e suportada pelo Agent SDK.
- **Ambiente do aluno**: dev container aberto via GitHub Codespaces é a
  porta de entrada principal, não uma alternativa. O aluno não instala
  nada localmente; abre no navegador e faz login na própria conta Claude.
- **Publicação**: site estático, build automático por GitHub Actions,
  hospedagem gratuita (GitHub Pages ou Cloudflare Pages). Distribuição
  por link + git clone opcional.
- **Componentes interativos**: usar uma biblioteca pequena e reutilizável.
  Começar apenas com **quiz, checkpoint de progresso e diagrama (Mermaid)**.
  NÃO construir sandbox de código executável no navegador (ex. Pyodide) —
  a execução de código real acontece no Claude Code, não na página.
  Só adicionar um novo tipo de componente mediante instrução explícita.

## Como construir
- Construção **por etapas verificáveis**, não em bloco. Para qualquer
  tarefa de mais de um passo, **apresente um plano e aguarde minha
  confirmação antes de executar**. Pare em pontos verificáveis.
- Não expandir o escopo além do que a tarefa pediu. Se algo adjacente
  parecer necessário, proponha — não faça por conta própria.
- Dentro de uma etapa já aprovada, execute com autonomia; não peça
  permissão para cada passo trivial.
- Antes de criar um novo componente ou padrão, verifique se já existe
  um equivalente no projeto e reutilize.

## Convenções de conteúdo
- Público não-programador: **nunca usar um termo técnico antes de
  defini-lo**. Manter um glossário e remeter a ele.
- Enquadrar o valor do curso como automação e criação de ferramentas
  próprias, não só "aprender a programar".
- Toda lição segue o mesmo esqueleto estrutural (a definir no esqueleto
  andante) e é montada com os componentes da biblioteca padrão.
- Labs versionados por módulo, cada um com estado inicial, `.claude/`
  pré-configurado e checkpoint verificável (teste que passa, branch de
  solução ou diretório esperado).
- Referência de arquitetura detalhada e diagramas: ver `docs/arquitetura.md`
  (consultar quando a tarefa exigir; não é leitura de toda sessão).

## Comandos
<!-- Preencher quando o esqueleto existir. NÃO inventar comandos. -->
- Build: `[a definir]`
- Dev local: `[a definir]`
- Rodar testes de checkpoint: `[a definir]`

## Fora de escopo por enquanto
- Módulo enterprise (gateways, managed settings, analytics de time):
  apêndice opcional, baixa prioridade para este público.
- Progressão pedagógica completa dos módulos: em elaboração à parte;
  não travar as tarefas técnicas por causa dela.
