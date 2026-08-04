// Dados FICTÍCIOS para pré-visualizar os componentes de trilha com dados
// realistas em formato, mas não em conteúdo — nomes de bloco/módulo são
// placeholders genéricos ("Bloco 1", "Módulo 1.1"...), não currículo real.
// A progressão pedagógica dos módulos está fora de escopo por enquanto
// (ver CLAUDE.md).

// Módulos do "bloco atual" — usado para pré-visualizar a SidebarLicao com
// os três estados possíveis representados.
export const modulosBlocoAtual = [
  {id: 'm1', titulo: 'Módulo 3.1 — Introdução', estado: 'concluido'},
  {id: 'm2', titulo: 'Módulo 3.2 — Conceito central', estado: 'concluido'},
  {id: 'm3', titulo: 'Módulo 3.3 — Prática guiada', estado: 'atual'},
  {id: 'm4', titulo: 'Módulo 3.4 — Exercício', estado: 'bloqueado'},
  {id: 'm5', titulo: 'Módulo 3.5 — Revisão do bloco', estado: 'bloqueado'},
];

// Os 9 blocos da trilha completa, 2 módulos cada (18 no total), alternando
// eixo A (Claude/Claude Code) e eixo B (fundamentos de Python).
export const blocosTrilha = [
  {id: 'b1', nome: 'Bloco 1', estado: 'concluido', modulos: [{eixo: 'A'}, {eixo: 'B'}]},
  {id: 'b2', nome: 'Bloco 2', estado: 'concluido', modulos: [{eixo: 'A'}, {eixo: 'B'}]},
  {id: 'b3', nome: 'Bloco 3', estado: 'atual', modulos: [{eixo: 'A', concluido: true}, {eixo: 'B', concluido: false}]},
  {id: 'b4', nome: 'Bloco 4', estado: 'bloqueado', modulos: [{eixo: 'A'}, {eixo: 'B'}]},
  {id: 'b5', nome: 'Bloco 5', estado: 'bloqueado', modulos: [{eixo: 'B'}, {eixo: 'B'}]},
  {id: 'b6', nome: 'Bloco 6', estado: 'bloqueado', modulos: [{eixo: 'A'}, {eixo: 'B'}]},
  {id: 'b7', nome: 'Bloco 7', estado: 'bloqueado', modulos: [{eixo: 'A'}, {eixo: 'A'}]},
  {id: 'b8', nome: 'Bloco 8', estado: 'bloqueado', modulos: [{eixo: 'A'}, {eixo: 'B'}]},
  {id: 'b9', nome: 'Bloco 9', estado: 'bloqueado', modulos: [{eixo: 'A'}, {eixo: 'B'}]},
];

// Resumo de um bloco recém-concluído, para pré-visualizar a ConclusaoBloco.
export const resumoBlocoConcluido = {
  blocoNome: 'Bloco 2',
  titulo: 'Bloco concluído',
  mensagem:
    'Você aprendeu a estruturar instruções em Python e a usar o Claude Code para rodá-las. O próximo bloco parte daí para introduzir suas primeiras automações.',
  licoes: 5,
  exercicios: 8,
  estagioMascote: 1,
};
