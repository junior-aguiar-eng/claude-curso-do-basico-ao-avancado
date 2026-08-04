#!/usr/bin/env bash
# Prepara o ambiente opcional de prática (assinantes) dentro do Codespace:
# uv + Python 3.14 para os labs, dependências do site, e o Claude Code CLI.
set -euo pipefail

echo "Instalando uv e Python 3.14..."
curl -LsSf https://astral.sh/uv/install.sh | sh
export PATH="$HOME/.local/bin:$PATH"
uv python install 3.14

echo "Atualizando npm..."
npm install -g npm@12

echo "Instalando dependências do site (Docusaurus)..."
npm install

echo "Instalando o Claude Code CLI..."
npm install -g @anthropic-ai/claude-code

cat <<'MSG'

Ambiente pronto.
- Site do curso (dev):  npm start        (abre na porta 3000)
- Python dos labs:      uv run python3.14 --version
- Claude Code:          claude

Este ambiente é opcional: nenhuma lição do curso exige ele para ser
concluída. Ele existe para quem quiser praticar no Claude Code real.
MSG
