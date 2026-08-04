import React, {useRef, useState} from 'react';
import clsx from 'clsx';
import getPyodide from './loadPyodide';
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
 * Uso em uma lição (.mdx):
 *
 *   <SandboxPython code={'print("Olá, mundo!")'} />
 */
export default function SandboxPython({code: initialCode, height}) {
  const [code, setCode] = useState(initialCode ?? CODIGO_PADRAO);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('ocioso'); // ocioso | carregando | rodando | erro
  const pyodideRef = useRef(null);

  const rodar = async () => {
    setOutput('');
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
      setStatus('ocioso');
    } catch (err) {
      setOutput((o) => (o ? `${o}\n` : '') + String(err?.message ?? err));
      setStatus('erro');
    }
  };

  const ocupado = status === 'carregando' || status === 'rodando';

  return (
    <div className={styles.sandbox}>
      <textarea
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
      {output && (
        <pre className={clsx(styles.saida, status === 'erro' && styles.saidaErro)}>
          {output}
        </pre>
      )}
    </div>
  );
}
