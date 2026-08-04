# claude-curso-do-basico-ao-avancado

## O que é este projeto
Um curso online que ensina Claude e Claude Code do zero ao avançado,
voltado a **pessoas sem experiência em programação**. O curso vai até o
Agent SDK — portanto ensina programação (Python) no caminho.

O curso é **autossuficiente e não depende de assinatura**: toda a teoria
é ensinada de forma dinâmica e interativa dentro do próprio site, e o
aluno pode rodar código Python na própria página, sem instalar nada.

O **Claude Code é uma camada opcional de prática aprofundada** para
alunos assinantes, que quiserem fazer os exercícios no ambiente real.
Nenhuma lição pode *exigir* o Claude Code para ser compreendida ou
concluída — ele é sempre um complemento marcado como opcional.

Este repositório é a **engenharia do curso**: o site, os componentes
interativos, os labs e o ambiente.

## Decisões de arquitetura (não reabrir sem instrução explícita)
- **Site**: Docusaurus sobre MDX. MDX é obrigatório — é o que permite
  texto didático e componentes interativos no mesmo arquivo de lição.
- **Linguagem-base ensinada**: Python. Acessível a iniciantes e suportada
  pelo Agent SDK.
- **Execução de código no site**: os alunos rodam Python direto na página
  via **Pyodide** (Python no navegador, sem servidor). É a peça central da
  interatividade e não depende de assinatura nem de instalação.
  - Limite natural: Pyodide roda **Python puro** (lógica, funções,
    estruturas) — ideal para a primeira metade do curso. Os módulos de
    **Agent SDK**, que exigem chaves de API e rede, NÃO rodam no
    navegador; sua prática fica na camada opcional (Claude Code ou máquina
    do aluno). Não tentar rodar código que precise de credenciais no
    Pyodide.
- **Ambiente opcional (assinantes)**: dev container via GitHub Codespaces
  para quem quiser praticar no Claude Code real, sem instalação local.
- **Publicação**: site estático, build automático por GitHub Actions,
  hospedagem gratuita (GitHub Pages ou Cloudflare Pages). Distribuição
  por link + git clone opcional.
- **Componentes interativos**: biblioteca pequena e reutilizável. Começar
  com **sandbox de código Python (Pyodide), quiz, checkpoint de progresso
  e diagrama (Mermaid)**. Só adicionar um novo tipo mediante instrução
  explícita.

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
- **Prática em dois níveis**: (1) exercício interativo no próprio site,
  para todos os alunos, rodando no sandbox Pyodide quando envolver código;
  (2) lab opcional no Claude Code, para assinantes, com estado inicial,
  `.claude/` pré-configurado e checkpoint verificável. O nível 1 nunca
  depende do nível 2.
- Referência de arquitetura detalhada e diagramas: ver `docs/arquitetura.md`
  (consultar quando a tarefa exigir; não é leitura de toda sessão).

## Comandos
- Toolchain: Node 24 (ver `.nvmrc`) + npm 12 (`npm install -g npm@12`
  se o npm global do Node for mais antigo) para o site; Python 3.14 via
  `uv` para os labs (ambiente opcional, ver `.devcontainer/`).
- Instalar dependências do site: `npm install`
- Dev local do site: `npm start` (porta 3000)
- Build do site: `npm run build` (gera `build/`)
- Servir o build localmente: `npm run serve`
- Rodar testes de checkpoint: `[a definir]` — ainda não existem labs
  versionados com checkpoint automatizado (ver "Fora de escopo por
  enquanto").

## Fora de escopo por enquanto
- Módulo enterprise (gateways, managed settings, analytics de time):
  apêndice opcional, baixa prioridade para este público.
- Progressão pedagógica completa dos módulos: em elaboração à parte;
  não travar as tarefas técnicas por causa dela.
