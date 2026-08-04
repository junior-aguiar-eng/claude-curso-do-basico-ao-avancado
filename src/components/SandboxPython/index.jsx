import React, {useRef, useState} from 'react';
import getPyodide from './loadPyodide';
import {traduzirErro} from './erros';
import styles from './styles.module.css';

const CODIGO_PADRAO = `# Escreva Python abaixo e clique em "Rodar".
nome = "mundo"
print(f"Olá, {nome}!")
`;

/**
 * Sandbox de Python que roda direto no navegador do aluno via Pyodide —
 * sem servidor, sem instalação, sem depender de assinatura.
 *
 * Limite intencional: só roda Python puro. Código que precise de chaves
 * de API ou rede (ex. os módulos de Agent SDK) não roda aqui — essa
 * prática fica na camada opcional do Claude Code (ver CLAUDE.md).
 *
 * Erros nunca aparecem crus para o aluno: são traduzidos para mensagens
 * didáticas por `erros.js`, com a linha do código destacada quando possível.
 *
 * Uso em uma lição (.mdx):
 *
 *   <SandboxPython code={'print("Olá, mundo!")'} />
 */
export default function SandboxPython({code: initialCode, height}) {
  const [code, setCode] = useState(initialCode ?? CODIGO_PADRAO);
  const [output, setOutput] = useState('');
  const [erro, setErro] = useState(null);
  const [status, setStatus] = useState('ocioso'); // ocioso | carregando | rodando | sucesso | erro
  const pyodideRef = useRef(null);
  const editorRef = useRef(null);

  const rodar = async () => {
    setOutput('');
    setErro(null);
    try {
      if (!pyodideRef.current) {
        setStatus('carregando');
        const py = await getPyodide();
        const escrever = (msg) =>
          setOutput((o) => (o ? `${o}\n${msg}` : msg));
        py.setStdout({batched: escrever});
        py.setStderr({batched: escrever});
        pyodideRef.current = py;
      }
      setStatus('rodando');
      await pyodideRef.current.runPythonAsync(code);
      setStatus('sucesso');
    } catch (err) {
      setErro(traduzirErro(err?.message ?? String(err), code));
      setStatus('erro');
    }
  };

  const corrigir = () => {
    editorRef.current?.focus();
  };

  const ocupado = status === 'carregando' || status === 'rodando';

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
      )}
    </div>
  );
}
