// Verifica o uso do glossário (src/data/glossario.json) nas lições
// (docs/**/*.mdx):
//
//   - erro (bloqueia): <Termo id="..."> referenciando um id inexistente;
//     <Termo id="..." define> usado antes do `moduloOrigem` do termo
//     (não dá pra definir algo antes da hora); ou <Termo id="..."> (sem
//     define, qualquer módulo) referenciando um id inexistente.
//   - aviso (não bloqueia): o texto de um termo aparece solto na lição,
//     fora de <Termo> — candidato a marcação esquecida.
//
// <Termo id="..."> sem `define` pode apontar para um termo de um módulo
// futuro (gancho/referência para o que vem depois) sem bloquear o build
// — só o modo `define` exige que o módulo de origem já tenha passado.
//
// Cada lição declara seu módulo via frontmatter `modulo: "M4"`. Lições
// sem esse campo (ex. esqueletos/exemplos) só passam pela checagem de
// existência do id, sem checagem de ordem.
//
// Uso: node scripts/verificar-glossario.js (chamado por `npm run
// verificar-glossario` e pelo workflow de deploy, antes do build).

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const CAMINHO_GLOSSARIO = path.join(RAIZ, 'src/data/glossario.json');
const PASTA_DOCS = path.join(RAIZ, 'docs');

function escaparRegex(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// parseFloat (não parseInt+replace \D) porque o Bloco 0 usa módulos
// fracionários ("M0.1"..."M0.5", antes de M1) — remover só o "M" preserva
// o ponto, então "M0.1" vira 0.1 (< 1) em vez de colidir com "M1" (ambos
// virariam 1 se a gente removesse o ponto também).
function numeroModulo(moduloOrigem) {
  return parseFloat(String(moduloOrigem).replace(/^M/, ''));
}

function listarArquivosMdx(pasta) {
  const resultado = [];
  for (const item of fs.readdirSync(pasta, {withFileTypes: true})) {
    const caminho = path.join(pasta, item.name);
    if (item.isDirectory()) {
      resultado.push(...listarArquivosMdx(caminho));
    } else if (item.isFile() && item.name.endsWith('.mdx')) {
      resultado.push(caminho);
    }
  }
  return resultado;
}

function extrairModuloFrontmatter(conteudo) {
  const frontmatter = conteudo.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatter) return null;
  const linha = frontmatter[1].match(/^modulo:\s*["']?(M\d+(?:\.\d+)?)["']?\s*$/m);
  return linha ? linha[1] : null;
}

function extrairUsosDeTermo(conteudo) {
  const usos = [];
  const regex = /<Termo\s+([^>]*?)\/?>/g;
  let match;
  while ((match = regex.exec(conteudo))) {
    const idMatch = match[1].match(/\bid=["']([^"']+)["']/);
    if (idMatch) {
      const define = /\bdefine\b/.test(match[1]);
      usos.push({id: idMatch[1], define});
    }
  }
  return usos;
}

// Remove frontmatter, blocos de código e trechos <Termo>...</Termo> antes
// de procurar termos "soltos" — evita avisos em código-fonte de exemplo
// ou em termos que já estão corretamente marcados.
function textoProsa(conteudo) {
  return conteudo
    .replace(/^---\n[\s\S]*?\n---/, '')
    .replace(/^import\s.*$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]*`/g, '')
    .replace(/<Termo\s+[^>]*>[\s\S]*?<\/Termo>/g, '');
}

function main() {
  const glossario = JSON.parse(fs.readFileSync(CAMINHO_GLOSSARIO, 'utf8'));
  const arquivos = fs.existsSync(PASTA_DOCS) ? listarArquivosMdx(PASTA_DOCS) : [];

  const erros = [];
  const avisos = [];

  for (const caminhoAbsoluto of arquivos) {
    const caminhoRelativo = path.relative(RAIZ, caminhoAbsoluto);
    const conteudo = fs.readFileSync(caminhoAbsoluto, 'utf8');
    const moduloArquivo = extrairModuloFrontmatter(conteudo);
    const numeroModuloArquivo = moduloArquivo ? numeroModulo(moduloArquivo) : null;

    for (const {id, define} of extrairUsosDeTermo(conteudo)) {
      const entrada = glossario[id];
      if (!entrada) {
        erros.push(`${caminhoRelativo}: <Termo id="${id}"> não existe em glossario.json`);
        continue;
      }
      if (define && numeroModuloArquivo != null) {
        const numeroModuloOrigem = numeroModulo(entrada.moduloOrigem);
        if (numeroModuloOrigem > numeroModuloArquivo) {
          erros.push(
            `${caminhoRelativo} (${moduloArquivo}): <Termo id="${id}" define> só é definido em ${entrada.moduloOrigem} — não dá pra definir antes da hora`,
          );
        }
      }
    }

    const prosa = textoProsa(conteudo);
    for (const entrada of Object.values(glossario)) {
      const regexTermo = new RegExp(`\\b${escaparRegex(entrada.termo)}\\b`, 'i');
      if (regexTermo.test(prosa)) {
        avisos.push(
          `${caminhoRelativo}: "${entrada.termo}" aparece como texto solto, fora de <Termo> — marcação esquecida?`,
        );
      }
    }
  }

  if (avisos.length > 0) {
    console.warn(`Avisos (${avisos.length}):`);
    for (const aviso of avisos) console.warn(`  - ${aviso}`);
  }

  if (erros.length > 0) {
    console.error(`\nErros (${erros.length}):`);
    for (const erro of erros) console.error(`  - ${erro}`);
    console.error('\nVerificação do glossário falhou.');
    process.exit(1);
  }

  console.log(
    `Glossário ok — ${arquivos.length} lição(ões) verificada(s), ${avisos.length} aviso(s).`,
  );
}

main();
