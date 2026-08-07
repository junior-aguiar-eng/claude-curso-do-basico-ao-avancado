// Os módulos reais do curso, na ordem do currículo — id igual ao usado
// em <Checkpoint id="..."> de cada lição (docs/m*.mdx) e título igual ao
// frontmatter `title` de cada arquivo. `slug` é o nome do arquivo em
// docs/ (sem `.mdx`), igual à rota real da lição — diferente do `id`
// curto, que não é uma rota navegável. Usado pelo marco de conclusão do
// curso e pela trilha real (blocosCurso.js, _shared/trilha.js) — inclui
// o Bloco 0 (M0.1-M0.5), já que ele também faz parte da trilha hoje.

export const modulosCurso = [
  {id: 'm0-1', titulo: 'M0.1 — O que é a Anthropic', slug: 'm0-1-o-que-e-a-anthropic'},
  {id: 'm0-2', titulo: 'M0.2 — O que é Claude', slug: 'm0-2-o-que-e-claude'},
  {id: 'm0-3', titulo: 'M0.3 — Modelos e Escolha', slug: 'm0-3-modelos-e-escolha'},
  {id: 'm0-4', titulo: 'M0.4 — Ferramentas do Dia a Dia', slug: 'm0-4-ferramentas-do-dia-a-dia'},
  {id: 'm0-5', titulo: 'M0.5 — Conectores e o Ecossistema Claude', slug: 'm0-5-conectores-e-o-ecossistema-claude'},
  {id: 'm1', titulo: 'M1 — Fundamentos e Mentalidade', slug: 'm1-fundamentos-e-mentalidade'},
  {id: 'm2', titulo: 'M2 — Instalação e Primeira Sessão', slug: 'm2-instalacao-e-primeira-sessao'},
  {id: 'm3', titulo: 'M3 — Uso Cotidiano', slug: 'm3-uso-cotidiano'},
  {id: 'm4', titulo: 'M4 — Valores e Variáveis', slug: 'm4-valores-e-variaveis'},
  {id: 'm5', titulo: 'M5 — Condicionais', slug: 'm5-condicionais'},
  {id: 'm6', titulo: 'M6 — Laços', slug: 'm6-lacos'},
  {id: 'm7', titulo: 'M7 — Memória e Contexto', slug: 'm7-memoria-e-contexto'},
  {id: 'm8', titulo: 'M8 — Configuração e Governança Local', slug: 'm8-configuracao-e-governanca-local'},
  {id: 'm9', titulo: 'M9 — Listas e Dicionários', slug: 'm9-listas-e-dicionarios'},
  {id: 'm10', titulo: 'M10 — Funções', slug: 'm10-funcoes'},
  {id: 'm11', titulo: 'M11 — As Seis Primitivas', slug: 'm11-as-seis-primitivas'},
  {id: 'm12', titulo: 'M12 — MCP e Integrações Externas', slug: 'm12-mcp-e-integracoes-externas'},
  {id: 'm13', titulo: 'M13 — Paralelismo e Orquestração', slug: 'm13-paralelismo-e-orquestracao'},
  {id: 'm14', titulo: 'M14 — Automação e Autonomia', slug: 'm14-automacao-e-autonomia'},
  {id: 'm15', titulo: 'M15 — Módulos e Bibliotecas', slug: 'm15-modulos-e-bibliotecas'},
  {id: 'm16', titulo: 'M16 — JSON', slug: 'm16-json'},
  {id: 'm17', titulo: 'M17 — Async/await', slug: 'm17-async-await'},
  {id: 'm18', titulo: 'M18 — Agent SDK', slug: 'm18-agent-sdk'},
];
