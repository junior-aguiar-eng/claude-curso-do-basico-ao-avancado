import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import Mascote from '@site/src/components/Mascote';
import {IconeEstado, ESTADOS} from '@site/src/components/_shared/EstadoModulo';
import {estaConcluido} from '@site/src/components/_shared/progresso';
import {modulosCurso} from '@site/src/data/modulosCurso';
import styles from './styles.module.css';

// Número de blocos da trilha (Bloco 0 a Bloco 9) — não dá pra derivar de
// modulosCurso.length / 2 porque o Bloco 0 tem 5 módulos, não 2.
const TOTAL_BLOCOS = 10;

/**
 * Marco de conclusão do curso inteiro — não um certificado, uma tela de
 * fechamento: resumo dos módulos percorridos e o mascote no estágio
 * mais evoluído. Sem geração de PDF, sem qualquer elemento que pareça
 * certificação formal.
 *
 * Diferente de <Checkpoint>, este componente não recebe estado por
 * prop: ele mesmo consulta `_shared/progresso.js` (a mesma fonte de
 * verdade em localStorage) e decide se todos os checkpoints de
 * `modulosCurso` já foram marcados. Ele se atualiza sozinho, no mesmo
 * carregamento de página,
 * ouvindo o evento `curso:progresso` disparado por
 * `marcarConcluido()` — assim, marcar o checkpoint de M18 na mesma
 * página já revela esta tela, sem precisar recarregar.
 *
 * Uso: uma única vez, na última lição (m18-agent-sdk.mdx), depois do
 * `<Checkpoint id="m18">`.
 */
export default function ConclusaoCurso() {
  const [concluido, setConcluido] = useState(false);

  useEffect(() => {
    const verificar = () => {
      setConcluido(modulosCurso.every((modulo) => estaConcluido(modulo.id)));
    };
    verificar();
    window.addEventListener('curso:progresso', verificar);
    return () => window.removeEventListener('curso:progresso', verificar);
  }, []);

  if (!concluido) {
    return null;
  }

  return (
    <div className={styles.tela}>
      <span className={styles.selo}>Curso concluído</span>

      <Mascote estagio={3} tamanho={96} />

      <h2 className={styles.titulo}>Você concluiu o curso inteiro</h2>
      <p className={styles.mensagem}>
        Do panorama sobre a Anthropic e Claude até o Agent SDK, você
        percorreu todos os módulos do curso e programou Python no
        caminho. O que vem a seguir é seu: revisitar qualquer lição,
        aprofundar no lab opcional do Claude Code, ou simplesmente usar o
        que aprendeu.
      </p>

      <dl className={styles.resumo}>
        <div className={styles.resumoItem}>
          <dt>Módulos</dt>
          <dd>{modulosCurso.length}</dd>
        </div>
        <div className={styles.resumoItem}>
          <dt>Blocos</dt>
          <dd>{TOTAL_BLOCOS}</dd>
        </div>
      </dl>

      <ul className={styles.lista}>
        {modulosCurso.map((modulo) => (
          <li key={modulo.id} className={styles.item}>
            <IconeEstado estado={ESTADOS.CONCLUIDO} />
            <span>{modulo.titulo}</span>
          </li>
        ))}
      </ul>

      <div className={styles.acoes}>
        <Link className={styles.botaoPrimario} to="/">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
