// Verifica o uso do glossário (src/data/glossario.json) nas lições
// (docs/**/*.mdx):
//
//   - erro (bloqueia): <Termo id="..."> referenciando um id inexistente,
//     ou usado numa lição de módulo anterior ao `moduloOrigem` do termo.
//   - aviso (não bloqueia): o texto de um termo aparece solto na lição,
//     fora de <Termo> — candidato a marcação esquecida.
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

function numeroModulo(moduloOrigem) {
  return parseInt(String(moduloOrigem).replace(/\D/g, ''), 10);
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
  const linha = frontmatter[1].match(/^modulo:\s*["']?(M\d+)["']?\s*$/m);
  return linha ? linha[1] : null;
}

function extrairUsosDeTermo(conteudo) {
  const usos = [];
  const regex = /<Termo\s+([^>]*?)\/?>/g;
  let match;
  while ((match = regex.exec(conteudo))) {
    const idMatch = match[1].match(/\bid=["']([^"']+)["']/);
    if (idMatch) usos.push(idMatch[1]);
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

    for (const id of extrairUsosDeTermo(conteudo)) {
      const entrada = glossario[id];
      if (!entrada) {
        erros.push(`${caminhoRelativo}: <Termo id="${id}"> não existe em glossario.json`);
        continue;
      }
      if (numeroModuloArquivo != null) {
        const numeroModuloOrigem = numeroModulo(entrada.moduloOrigem);
        if (numeroModuloOrigem > numeroModuloArquivo) {
          erros.push(
            `${caminhoRelativo} (${moduloArquivo}): <Termo id="${id}"> só é definido em ${entrada.moduloOrigem} — usado antes de existir`,
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
