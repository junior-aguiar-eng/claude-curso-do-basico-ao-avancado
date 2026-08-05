# Curso de Claude e Claude Code

Curso completo, do zero ao Agent SDK, para quem **nunca programou**. Os
18 módulos rodam direto no navegador — o aluno lê a teoria e executa
Python de verdade num sandbox (Pyodide), sem instalar nada e sem
depender de assinatura. O Claude Code é uma camada opcional de prática
aprofundada, para quem quiser ir além.

**Site publicado:** https://junior-aguiar-eng.github.io/claude-curso-do-basico-ao-avancado/

## Stack

- [Docusaurus 3](https://docusaurus.io/) sobre MDX — cada lição mistura
  texto didático com componentes React interativos no mesmo arquivo.
- [Pyodide](https://pyodide.org/) — Python rodando no navegador, sem
  servidor.
- Deploy automático via GitHub Actions → GitHub Pages a cada push em
  `main`.

## Estrutura

```
docs/                   lições do curso (M1–M18), glossário, home
src/components/          biblioteca de componentes interativos
  SandboxPython/          sandbox de código Python (Pyodide)
  Quiz/                    pergunta de revisão
  Checkpoint/              progresso salvo em localStorage
  Diagrama/                diagramas Mermaid
  Termo/                   termo do glossário (ligado a src/data/glossario.json)
  Hero/                    painel de abertura da home
  SidebarLicao/, MapaTrilha/, ConclusaoBloco/   navegação da trilha
src/data/glossario.json  fonte dos termos do glossário
scripts/verificar-glossario.js   valida o uso de <Termo> no build
.devcontainer/            ambiente opcional (Codespaces) para labs com Claude Code
```

## Rodando localmente

Requer Node 24 e npm 12 (ver `.nvmrc`).

```bash
npm install          # instala dependências
npm start            # dev local, porta 3000
npm run build        # build de produção em build/
npm run serve        # serve o build gerado
npm run verificar-glossario   # valida os termos do glossário
npm run typecheck     # checagem de tipos (tsc --noEmit)
```

## Convenções do projeto

Decisões de arquitetura, convenções de conteúdo e o fluxo de trabalho
esperado (etapas verificáveis, plano antes de mudanças maiores) estão
documentados em [`CLAUDE.md`](./CLAUDE.md).
