// Os 10 blocos reais do curso (Bloco 0 a Bloco 9), extraídos da linha
// itálica "*Bloco N — Nome · Eixo X · ...*" que aparece sob o H1 de
// cada lição real (docs/m*.mdx) — mesma informação, só estruturada.
// `moduloIds` referencia os ids já existentes em modulosCurso.js, sem
// duplicar título/slug. `temLab` reflete se aquele módulo tem seção
// "## Lab opcional 🔵" hoje — usado para calcular "exercícios" na tela
// de conclusão de bloco (ConclusaoBlocoAtual).

export const blocosCurso = [
  {
    id: 'bloco-0',
    numero: 0,
    nome: 'Panorama',
    eixo: 'A',
    modulos: [
      {id: 'm0-1', temLab: false},
      {id: 'm0-2', temLab: false},
      {id: 'm0-3', temLab: false},
      {id: 'm0-4', temLab: false},
      {id: 'm0-5', temLab: false},
    ],
  },
  {
    id: 'bloco-1',
    numero: 1,
    nome: 'Mentalidade',
    eixo: 'A',
    modulos: [{id: 'm1', temLab: false}],
  },
  {
    id: 'bloco-2',
    numero: 2,
    nome: 'Primeiro contato',
    eixo: 'A',
    modulos: [
      {id: 'm2', temLab: true},
      {id: 'm3', temLab: true},
    ],
  },
  {
    id: 'bloco-3',
    numero: 3,
    nome: 'Programação, fundamentos',
    eixo: 'B',
    modulos: [
      {id: 'm4', temLab: false},
      {id: 'm5', temLab: false},
      {id: 'm6', temLab: false},
    ],
  },
  {
    id: 'bloco-4',
    numero: 4,
    nome: 'Configuração do Claude Code',
    eixo: 'A',
    modulos: [
      {id: 'm7', temLab: true},
      {id: 'm8', temLab: true},
    ],
  },
  {
    id: 'bloco-5',
    numero: 5,
    nome: 'Estruturas de dados e funções',
    eixo: 'B',
    modulos: [
      {id: 'm9', temLab: true},
      {id: 'm10', temLab: true},
    ],
  },
  {
    id: 'bloco-6',
    numero: 6,
    nome: 'Extensão do Claude Code',
    eixo: 'A',
    modulos: [{id: 'm11', temLab: true}],
  },
  {
    id: 'bloco-7',
    numero: 7,
    nome: 'Orquestração',
    eixo: 'A',
    modulos: [
      {id: 'm12', temLab: true},
      {id: 'm13', temLab: true},
      {id: 'm14', temLab: true},
    ],
  },
  {
    id: 'bloco-8',
    numero: 8,
    nome: 'Reuso e integração',
    eixo: 'B',
    modulos: [
      {id: 'm15', temLab: true},
      {id: 'm16', temLab: true},
      {id: 'm17', temLab: true},
    ],
  },
  {
    id: 'bloco-9',
    numero: 9,
    nome: 'Agent SDK',
    eixo: 'A',
    modulos: [{id: 'm18', temLab: true}],
  },
];

/** Acha o bloco ao qual um módulo pertence, pelo id do módulo. */
export function blocoDoModulo(moduloId) {
  return blocosCurso.find((bloco) => bloco.modulos.some((m) => m.id === moduloId));
}
