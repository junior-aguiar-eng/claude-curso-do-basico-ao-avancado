// Gera a grade de pixels do mascote programaticamente (em vez de uma matriz
// desenhada célula a célula à mão) para garantir uma silhueta simétrica.
// Cada linha define a "meia largura" a partir da coluna central — método
// clássico de pixel art para desenhar formas arredondadas em grade.

export const TAMANHO_GRADE = 13;

const CENTRO = 6;

// Meia largura do corpo por linha (0 = topo, 12 = base): cria uma silhueta
// arredondada, mais larga no meio, afunilando para cima e para baixo.
const LARGURA_CORPO = [1, 3, 4, 5, 5, 5, 5, 5, 4, 4, 3, 2, 1];

// Linhas/colunas da barriga (patch claro), menor que o corpo e sempre
// contida dentro dele.
const LARGURA_BARRIGA = {9: 2, 10: 2, 11: 1};

// Olhos: 2 pixels de altura (linhas 4-5), para ficarem mais expressivos.
const LINHAS_OLHOS = [4, 5];
const COLUNA_OLHO_ESQUERDO = CENTRO - 2;
const COLUNA_OLHO_DIREITO = CENTRO + 2;

// Bochechas: um pixel de cada lado, mesma linha da base dos olhos.
const LINHA_BOCHECHA = 5;
const COLUNA_BOCHECHA_ESQUERDA = CENTRO - 4;
const COLUNA_BOCHECHA_DIREITA = CENTRO + 4;

// Boca: linha logo abaixo dos olhos, antes do cinto (linha 7).
const LINHA_BOCA = 6;
const COLUNA_BOCA_INICIO = CENTRO - 1;
const COLUNA_BOCA_FIM = CENTRO + 1;

const LINHA_TRANSICAO_SOMBRA = 7; // a partir daqui, tom mais escuro (voxel)
const LINHA_CINTO = 7;
const LINHA_EMBLEMA = 10;

const PALETA = {
  corpo: '#d97757',
  corpoSombra: '#c65733',
  barriga: '#f4d0c6',
  olho: '#3d2418',
  bochecha: '#e9ac9a',
  acessorio: '#8a5a3b',
  emblema: '#5b3a24',
};

/**
 * Retorna as células preenchidas do mascote no estágio dado.
 * Estágios são cumulativos: cada um mantém os traços do anterior e
 * adiciona um novo (estágio 0 = base; 1 = + topete; 2 = + cinto;
 * 3 = + emblema).
 */
export function gerarGrade(estagio = 0) {
  const celulas = [];
  const temTopete = estagio >= 1;
  const temCinto = estagio >= 2;
  const temEmblema = estagio >= 3;

  for (let y = 0; y < TAMANHO_GRADE; y++) {
    const meiaLargura = LARGURA_CORPO[y];
    if (meiaLargura === undefined) continue;

    for (let x = CENTRO - meiaLargura; x <= CENTRO + meiaLargura; x++) {
      let cor = y < LINHA_TRANSICAO_SOMBRA ? PALETA.corpo : PALETA.corpoSombra;

      const meiaBarriga = LARGURA_BARRIGA[y];
      if (meiaBarriga !== undefined && Math.abs(x - CENTRO) <= meiaBarriga) {
        cor = PALETA.barriga;
      }

      if (LINHAS_OLHOS.includes(y) && (x === COLUNA_OLHO_ESQUERDO || x === COLUNA_OLHO_DIREITO)) {
        cor = PALETA.olho;
      }

      if (y === LINHA_BOCHECHA && (x === COLUNA_BOCHECHA_ESQUERDA || x === COLUNA_BOCHECHA_DIREITA)) {
        cor = PALETA.bochecha;
      }

      if (y === LINHA_BOCA && x >= COLUNA_BOCA_INICIO && x <= COLUNA_BOCA_FIM) {
        cor = PALETA.olho;
      }

      if (temTopete && y === 0) {
        cor = PALETA.acessorio;
      }

      if (temCinto && y === LINHA_CINTO) {
        cor = PALETA.acessorio;
      }

      if (temEmblema && y === LINHA_EMBLEMA && x === CENTRO) {
        cor = PALETA.emblema;
      }

      celulas.push({x, y, cor});
    }
  }

  return celulas;
}

export const TOTAL_ESTAGIOS = 4;
