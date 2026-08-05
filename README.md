# Curso de Claude e Claude Code

Curso completo, do zero ao Agent SDK, para quem **nunca programou**. Os
23 módulos (Bloco 0 de panorama + M1–M18) rodam direto no navegador — o
aluno lê a teoria e executa Python de verdade num sandbox (Pyodide), sem
instalar nada e sem depender de assinatura. O Claude Code é uma camada
opcional de prática aprofundada, para quem quiser ir além.

**Site publicado:** https://www.nerdolajuridico.com

## Stack

- [Docusaurus 3](https://docusaurus.io/) sobre MDX — cada lição mistura
  texto didático com componentes React interativos no mesmo arquivo.
- [Pyodide](https://pyodide.org/) — Python rodando no navegador, sem
  servidor.
- Deploy automático via GitHub Actions → GitHub Pages a cada push em
  `main`.

## Estrutura

```
docs/                   lições do curso (Bloco 0: M0.1–M0.5, M1–M18), glossário, home
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

## Analytics

O site usa [GoatCounter](https://www.goatcounter.com/) para saber quantas
pessoas abrem o curso e em que módulo tendem a parar — escolhido por ser
gratuito sem limite de tempo, sem cookies, sem backend, e por ser só um
`<script>` (configurado em `scripts` no `docusaurus.config.js`). Cada
lição já é uma URL própria (ex. `/m11-as-seis-primitivas`), então a
visualização por módulo é automática, sem evento customizado.

**Passo pendente (só o dono do site consegue fazer):** criar uma conta
gratuita em [goatcounter.com](https://www.goatcounter.com/), pegar o "site
code" gerado, e substituir o placeholder `SEU-CODIGO` em
`data-goatcounter` (dentro de `scripts` em `docusaurus.config.js`) pelo
código real. Enquanto isso não for feito, o script carrega mas não
registra nada.

Depois de configurado, o painel fica disponível em
`https://SEU-CODIGO.goatcounter.com` (login com a conta criada).

## Convenções do projeto

Decisões de arquitetura, convenções de conteúdo e o fluxo de trabalho
esperado (etapas verificáveis, plano antes de mudanças maiores) estão
documentados em [`CLAUDE.md`](./CLAUDE.md).

## Autoria

Criado e mantido por [Nerdola Programador Jurídico](https://github.com/junior-aguiar-eng).

## Licença

Este projeto está licenciado sob **Creative Commons Atribuição-NãoComercial
4.0 (CC BY-NC 4.0)**: qualquer pessoa pode usar, estudar e adaptar o
conteúdo e o código, desde que dê crédito ao autor e não faça uso
comercial sem autorização. Texto completo em
[`LICENSE.md`](./LICENSE.md) e na
[página oficial da licença](https://creativecommons.org/licenses/by-nc/4.0/).
