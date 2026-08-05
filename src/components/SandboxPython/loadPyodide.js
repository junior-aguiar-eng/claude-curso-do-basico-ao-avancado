// Carregamento sob demanda do runtime Pyodide (Python no navegador),
// via CDN oficial jsdelivr — sem hospedar os assets no repositório.
//
// Versão fixada intencionalmente para evitar quebras silenciosas quando
// o Pyodide lançar uma versão nova. Para atualizar, conferir o changelog
// em https://pyodide.org/en/stable/project/changelog.html antes de trocar.
//
// ATENÇÃO: o valor anterior aqui ('314.0.3') não corresponde a nenhuma
// versão real do Pyodide (o projeto nunca saiu do esquema 0.x.y) — muito
// provavelmente um placeholder que nunca chegou a ser testado com rede
// de verdade. Troquei para 0.26.4 (versão estável conhecida), mas isso
// precisa ser confirmado num ambiente com internet normal antes do
// merge: abra o site, rode um sandbox, e confira no changelog do
// Pyodide se já existe uma versão mais recente para usar no lugar.
const PYODIDE_VERSION = '0.26.4';
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodidePromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (window.loadPyodide) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () =>
        reject(new Error('Falha ao carregar o Pyodide.')),
      );
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Falha ao carregar o Pyodide.'));
    document.head.appendChild(script);
  });
}

/**
 * Retorna uma instância Pyodide pronta para uso, carregando o runtime na
 * primeira chamada e reaproveitando a mesma instância depois — inclusive
 * entre vários sandboxes na mesma página.
 */
export default function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = loadScript(`${INDEX_URL}pyodide.js`)
      .then(() => window.loadPyodide({indexURL: INDEX_URL}))
      .catch((err) => {
        // Permite tentar de novo em vez de ficar travado num erro definitivo.
        pyodidePromise = null;
        throw err;
      });
  }
  return pyodidePromise;
}
