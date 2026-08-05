// Tradução de erros do Python (via Pyodide) para mensagens didáticas.
// O aluno nunca vê a mensagem crua do interpretador — só o texto traduzido
// e, quando dá para localizar, a linha do código relacionada.

// Regras específicas por tipo de exceção, na ordem em que devem ser
// testadas (algumas exceções têm mais de uma mensagem possível).
const REGRAS = [
  {
    tipo: 'SyntaxError',
    quando: (msg) => /unterminated|EOF while scanning|was never closed/i.test(msg),
    mensagem: 'Falta fechar parêntese, aspas ou colchete nesta linha',
  },
  {
    tipo: 'SyntaxError',
    quando: (msg) => /expected ['"]?:['"]?/i.test(msg),
    mensagem: 'Depois de if/for/while/def, sempre vem um ":" — parece que ficou faltando aqui',
  },
  {
    tipo: 'IndentationError',
    quando: (msg) => /expected an indented block/i.test(msg),
    mensagem: 'O que vem depois do ":" precisa estar recuado — adicione um espaço no início da próxima linha',
  },
  {
    tipo: 'IndentationError',
    quando: (msg) => /unexpected indent/i.test(msg),
    mensagem: 'Essa linha está recuada sem motivo — remova o espaço extra no início',
  },
  {
    tipo: 'NameError',
    quando: () => true,
    mensagem: 'Essa variável ainda não existe — verifique se o nome está exatamente igual ao que foi criado antes',
  },
  {
    tipo: 'TypeError',
    quando: (msg) => /can only concatenate str|unsupported operand type\(s\) for \+/i.test(msg),
    mensagem: 'Você está tentando juntar texto com número diretamente — envolva o número em str() antes',
  },
  {
    tipo: 'ZeroDivisionError',
    quando: () => true,
    mensagem: 'Esse cálculo está dividindo por zero, o que não tem resultado — confira o valor do divisor',
  },
  {
    tipo: 'KeyError',
    quando: () => true,
    mensagem: 'Essa chave não existe neste dicionário — confira a grafia ou se foi mesmo adicionada',
  },
  {
    tipo: 'IndexError',
    quando: () => true,
    mensagem: 'Essa posição não existe na lista — a contagem começa em 0, e a última posição é o tamanho menos um',
  },
  {
    tipo: 'AttributeError',
    quando: () => true,
    mensagem: 'Esse tipo de dado não tem essa ação disponível — confira se o método está certo para ele',
  },
];

// Cobre tanto erro de sintaxe não listado acima quanto erro de execução
// (ex. ValueError, FileNotFoundError) — por isso não menciona "sintaxe"
// especificamente, já que o código pode ter rodado até essa linha.
const MENSAGEM_GENERICA = 'Algo não deu certo ao rodar esse código — dê uma olhada nesta linha';

/**
 * Traduz o erro cru lançado pelo Pyodide (`err.message`, com o traceback
 * completo do Python) para uma mensagem didática, junto do número da linha
 * e do trecho de código correspondente, quando dá para localizar.
 */
export function traduzirErro(mensagemBruta, codigoFonte) {
  const linhas = String(mensagemBruta ?? '').split('\n');

  let tipoExcecao = null;
  let detalheExcecao = '';
  for (let i = linhas.length - 1; i >= 0; i--) {
    const match = linhas[i].match(/^(\w+(?:Error|Warning)):\s*(.*)$/);
    if (match) {
      tipoExcecao = match[1];
      detalheExcecao = match[2];
      break;
    }
  }

  let numeroLinha = null;
  for (let i = linhas.length - 1; i >= 0; i--) {
    const match = linhas[i].match(/File "[^"]*",\s*line\s*(\d+)/);
    if (match) {
      numeroLinha = parseInt(match[1], 10);
      break;
    }
  }

  const regra = REGRAS.find((r) => r.tipo === tipoExcecao && r.quando(detalheExcecao || mensagemBruta));
  const mensagem = regra ? regra.mensagem : MENSAGEM_GENERICA;

  let trechoLinha = null;
  if (numeroLinha != null && codigoFonte) {
    const linhasCodigo = codigoFonte.split('\n');
    trechoLinha = linhasCodigo[numeroLinha - 1] ?? null;
  }

  return {mensagem, numeroLinha, trechoLinha};
}
