import React, {useRef, useState} from 'react';
import getPyodide from './loadPyodide';
import {traduzirErro} from './erros';
import styles from './styles.module.css';

const CODIGO_PADRAO = `# Escreva Python abaixo e clique em "Rodar".
nome = "mundo"
print(f"Olá, {nome}!")
`;

// Todos os sandboxes da página compartilham uma única instância Pyodide
// (ver loadPyodide.js), que só tem um stdout/stderr global. Se dois
// sandboxes rodassem ao mesmo tempo, o segundo reapontaria o stdout
// antes do primeiro terminar, e a saída do primeiro vazaria para o
// painel do segundo. Esta fila serializa as execuções de qualquer
// sandbox da página, na ordem em que "Rodar" foi clicado.
let filaDeExecucao = Promise.resolve();

function executarComExclusividade(tarefa) {
  const execucao = filaDeExecucao.then(tarefa, tarefa);
  filaDeExecucao = execucao.catch(() => {});
  return execucao;
}

/**
 * Sandbox de Python que roda direto no navegador do aluno via Pyodide —
 * sem servidor, sem instalação, sem depender de assinatura.
 *
 * Limite intencional: só roda Python puro. Código que precise de chaves
 * de API ou rede (ex. os módulos de Agent SDK) não roda aqui — essa
 * prática fica na camada opcional do Claude Code (ver CLAUDE.md).
 *
 * Erros de código nunca aparecem crus para o aluno: são traduzidos para
 * mensagens didáticas por `erros.js`, com a linha destacada quando
 * possível. Falha ao carregar o próprio Python (ex. rede indisponível)
 * é tratada à parte — não é um erro de código, então não passa pela
 * tradução de exceções Python.
 *
 * Quando há mais de um sandbox na mesma lição, rodar um enquanto outro
 * ainda está em execução entra na fila em vez de rodar em paralelo —
 * ambos compartilham a mesma instância Pyodide, então rodar ao mesmo
 * tempo faria a saída de um vazar para o painel do outro.
 *
 * O runtime Pyodide é compartilhado entre todos os sandboxes da página
 * (ver loadPyodide.js), mas cada execução roda num namespace Python
 * novo — variáveis de um sandbox (ou de uma execução anterior do mesmo
 * sandbox) não vazam para a próxima.
 *
 * Uso em uma lição (.mdx):
 *
 *   <SandboxPython code={'print("Olá, mundo!")'} />
 */
export default function SandboxPython({code: initialCode, height}) {
  const [code, setCode] = useState(initialCode ?? CODIGO_PADRAO);
  const [output, setOutput] = useState('');
  const [erro, setErro] = useState(null);
  const [status, setStatus] = useState('ocioso'); // ocioso | carregando | esperando | rodando | sucesso | erro | erro-carregamento
  const pyodideRef = useRef(null);
  const editorRef = useRef(null);

  const rodar = async () => {
    setOutput('');
    setErro(null);

    if (!pyodideRef.current) {
      setStatus('carregando');
      try {
        pyodideRef.current = await getPyodide();
      } catch {
        setStatus('erro-carregamento');
        return;
      }
    }

    setStatus('esperando');
    try {
      await executarComExclusividade(async () => {
        setStatus('rodando');
        // O runtime Pyodide é compartilhado entre todos os sandboxes da
        // página (ver loadPyodide.js) — sempre reapontamos stdout/stderr
        // para este sandbox antes de rodar. A fila acima garante que só
        // uma execução acontece por vez, então esse reapontamento nunca
        // é roubado por outro sandbox no meio do caminho.
        const escrever = (msg) => setOutput((o) => (o ? `${o}\n${msg}` : msg));
        pyodideRef.current.setStdout({batched: escrever});
        pyodideRef.current.setStderr({batched: escrever});

        // Namespace novo a cada execução: sem isso, todos os sandboxes da
        // página rodariam nas mesmas variáveis globais do interpretador
        // compartilhado, e uma variável de um exemplo vazaria para outro
        // (ou para uma reexecução do mesmo código já editado).
        const dictPy = pyodideRef.current.globals.get('dict');
        const namespace = dictPy();
        try {
          await pyodideRef.current.runPythonAsync(code, {globals: namespace});
        } finally {
          namespace.destroy();
          dictPy.destroy();
        }
      });
      setStatus('sucesso');
    } catch (err) {
      setErro(traduzirErro(err?.message ?? String(err), code));
      setStatus('erro');
    }
  };

  const corrigir = () => {
    editorRef.current?.focus();
  };

  const ocupado = status === 'carregando' || status === 'esperando' || status === 'rodando';

  return (
    <div className={styles.sandbox}>
      <textarea
        ref={editorRef}
        className={styles.editor}
        style={height ? {height} : undefined}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        aria-label="Editor de código Python"
      />
      <div className={styles.barra}>
        <button
          type="button"
          className={styles.rodar}
          onClick={rodar}
          disabled={ocupado}
        >
          {status === 'carregando'
            ? 'Carregando Python...'
            : status === 'esperando'
            ? 'Aguardando...'
            : status === 'rodando'
            ? 'Rodando...'
            : 'Rodar'}
        </button>
        {status === 'carregando' && (
          <span className={styles.aviso}>
            Primeira vez nesta página — pode levar alguns segundos.
          </span>
        )}
      </div>

      {status === 'sucesso' && (
        <div className={styles.saidaSucesso}>
          <svg
            className={styles.iconeSucesso}
            viewBox="0 0 16 16"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              d="M3 8.5L6.5 12L13 4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <pre className={styles.saidaTexto}>{output || 'Código executado sem erros.'}</pre>
        </div>
      )}

      {status === 'erro' && erro && (
        <>
          {output && (
            <pre className={styles.saidaParcial}>{output}</pre>
          )}
          <div className={styles.painelErro}>
            <p className={styles.mensagemErro}>{erro.mensagem}</p>
            {erro.trechoLinha != null && (
              <pre className={styles.linhaDestacada}>
                Linha {erro.numeroLinha}: {erro.trechoLinha}
              </pre>
            )}
            <button type="button" className={styles.botaoCorrigir} onClick={corrigir}>
              Corrigir e tentar de novo
            </button>
          </div>
        </>
      )}

      {status === 'erro-carregamento' && (
        <div className={styles.painelErro}>
          <p className={styles.mensagemErro}>
            Não foi possível carregar o Python agora — pode ser a conexão
            com a internet. Isso não tem relação com o seu código.
          </p>
          <button type="button" className={styles.botaoCorrigir} onClick={rodar}>
            Tentar carregar de novo
          </button>
        </div>
      )}
    </div>
  );
}
