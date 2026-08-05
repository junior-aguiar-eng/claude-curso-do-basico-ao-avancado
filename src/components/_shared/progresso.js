// Armazenamento local de progresso do aluno (quais módulos/checkpoints já
// foram concluídos). Usa apenas localStorage do navegador — sem backend,
// sem login. Isso significa que o progresso NÃO sincroniza entre
// dispositivos ou navegadores: é local a cada um.
//
// Ponto único de leitura/escrita para que outros componentes (Checkpoint,
// e futuramente SidebarLicao/MapaTrilha) consumam o mesmo estado em vez de
// cada um reimplementar sua própria chave de localStorage.

const PREFIXO = 'curso:checkpoint:';

function chave(id) {
  return `${PREFIXO}${id}`;
}

/** Marca (ou desmarca) um módulo/checkpoint como concluído. */
export function marcarConcluido(id, concluido = true) {
  try {
    if (concluido) {
      localStorage.setItem(chave(id), '1');
    } else {
      localStorage.removeItem(chave(id));
    }
  } catch (e) {
    /* localStorage indisponível (ex. modo privado): segue sem persistir. */
  }
}

/** Consulta se um módulo/checkpoint específico está concluído. */
export function estaConcluido(id) {
  try {
    return localStorage.getItem(chave(id)) === '1';
  } catch (e) {
    return false;
  }
}

/**
 * Retorna o estado de todos os módulos/checkpoints já registrados, como
 * `{ [id]: true }`. Ids nunca marcados simplesmente não aparecem no mapa.
 */
export function obterProgresso() {
  const progresso = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const chaveArmazenada = localStorage.key(i);
      if (chaveArmazenada && chaveArmazenada.startsWith(PREFIXO)) {
        progresso[chaveArmazenada.slice(PREFIXO.length)] = true;
      }
    }
  } catch (e) {
    /* localStorage indisponível: retorna o que já tiver sido acumulado. */
  }
  return progresso;
}
