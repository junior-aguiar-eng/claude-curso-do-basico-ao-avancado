#!/usr/bin/env node
// Valida o uso de <Termo> nas lições .mdx contra src/data/glossario.json:
// - todo id referenciado precisa existir no glossário;
// - todo id referenciado precisa ter exatamente um ponto `define` no site;
// - (aviso) termos do glossário nunca referenciados por nenhum <Termo>.

import {readFileSync, readdirSync, statSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const raizProjeto = fileURLToPath(new URL('..', import.meta.url));
const pastaDocs = join(raizProjeto, 'docs');
const caminhoGlossario = join(raizProjeto, 'src', 'data', 'glossario.json');

function listarArquivosMdx(pasta) {
  const arquivos = [];
  for (const item of readdirSync(pasta)) {
    const caminho = join(pasta, item);
    if (statSync(caminho).isDirectory()) {
      arquivos.push(...listarArquivosMdx(caminho));
    } else if (item.endsWith('.mdx')) {
      arquivos.push(caminho);
    }
  }
  return arquivos;
}

const glossario = JSON.parse(readFileSync(caminhoGlossario, 'utf8'));
const regexTermo = /<Termo\s+id="([^"]+)"(\s+define)?/g;

// id -> {arquivos: Set<string>, definicoes: number}
const usos = new Map();

for (const caminho of listarArquivosMdx(pastaDocs)) {
  const conteudo = readFileSync(caminho, 'utf8');
  for (const match of conteudo.matchAll(regexTermo)) {
    const [, id, define] = match;
    if (!usos.has(id)) usos.set(id, {arquivos: new Set(), definicoes: 0});
    const registro = usos.get(id);
    registro.arquivos.add(caminho);
    if (define) registro.definicoes += 1;
  }
}

const erros = [];
const avisos = [];

for (const [id, {arquivos, definicoes}] of usos) {
  const arquivosTexto = [...arquivos].map((a) => a.replace(raizProjeto, '')).join(', ');
  if (!glossario[id]) {
    erros.push(`<Termo id="${id}"> usado em ${arquivosTexto}, mas "${id}" não existe em src/data/glossario.json.`);
    continue;
  }
  if (definicoes === 0) {
    erros.push(`<Termo id="${id}"> usado em ${arquivosTexto} sem nenhum ponto com "define".`);
  } else if (definicoes > 1) {
    erros.push(`<Termo id="${id}" define> aparece ${definicoes} vezes (deveria ser uma só) em ${arquivosTexto}.`);
  }
}

for (const id of Object.keys(glossario)) {
  if (!usos.has(id)) {
    avisos.push(`"${id}" existe em glossario.json mas nenhuma lição usa <Termo id="${id}">.`);
  }
}

if (avisos.length > 0) {
  console.warn('Avisos do glossário:');
  for (const aviso of avisos) console.warn(`  - ${aviso}`);
}

if (erros.length > 0) {
  console.error('Erros do glossário:');
  for (const erro of erros) console.error(`  - ${erro}`);
  process.exit(1);
}

console.log('Glossário ok.');
