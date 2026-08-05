// Placeholder usado em glossario.json para termos cuja definição ainda
// não foi escrita (ver CLAUDE.md — "definição final... escrita módulo a
// módulo, junto com o conteúdo da lição"). Componentes públicos (página
// /glossario, tooltip do <Termo>) não devem expor esse texto interno ao
// aluno — mostram uma mensagem de "em breve" no lugar.
export const DEFINICAO_PENDENTE = 'TODO: definir';

const MENSAGEM_PENDENTE = 'Definição em breve — módulo ainda não publicado.';

/** Texto de definição pronto para exibir ao aluno, nunca o placeholder cru. */
export function definicaoExibivel(entrada) {
  return entrada.definicao === DEFINICAO_PENDENTE ? MENSAGEM_PENDENTE : entrada.definicao;
}
