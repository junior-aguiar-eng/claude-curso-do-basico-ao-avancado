# Relatório de densidade conceitual e didática

Gerado por leitura e análise automatizada + manual dos 23 módulos do curso
(Bloco 0: M0.1–M0.5, mais M1–M18). **Tarefa somente leitura — nenhum
`.mdx` foi alterado.**

## Metodologia

- **Contagem de palavras** feita por script (`scripts` não versionado,
  descartável) que remove frontmatter, `import`, blocos de código
  (fenced ```` ``` ```` e as props `code={` e `chart={` de
  `<SandboxPython>`/`<Diagrama>`), e tags JSX — mantendo o texto interno
  delas. Duas armadilhas valem registro, porque afetam como ler os
  números abaixo:
  - O componente `<Cards itens={[...]} />` (usado em M0.2–M0.5) guarda
    texto substantivo dentro de uma prop, não como filho de tag — a
    primeira versão do script descartava esse texto por engano,
    subestimando a seção "Na prática" de M0.3–M0.5 em até 7x. Corrigido:
    os literais de string dentro de `itens` agora entram na contagem.
  - M7 embute um exemplo de `CLAUDE.md` dentro de um bloco de código que
    contém, ele mesmo, linhas `## Convenções do projeto` e `## Regra de
    trabalho` — que a primeira versão do script confundia com
    cabeçalhos reais da lição, cortando "Na prática" no meio. Corrigido:
    blocos de código são removidos antes da divisão em seções.
  - **Ressalva que permanece**: a seção "Diagrama" é sistematicamente
    curta em palavras porque o conteúdo dela é visual (Mermaid), não
    textual — um "Diagrama" de 5 palavras não é raso, é uma legenda
    curta para um diagrama que carrega o resto do significado. Não tratar
    a coluna de palavras da seção Diagrama como sinal de profundidade.
- **Termos `<Termo id="..." define>`** contados por regex — só o modo
  `define` (primeira aparição, que abre entrada no glossário).
- **Seções da estrutura fixa** verificadas contra os cabeçalhos `##`
  reais de cada módulo: Abertura, Conceito central, Na prática, Diagrama,
  Lab opcional 🔵, Checkpoint. Nenhum módulo lido tinha seção presente
  mas vazia/placeholder — onde uma seção existe, ela tem conteúdo
  substantivo. As ausências (ex.: sem Diagrama em todo o Eixo B básico
  M4–M9, sem Lab em M4–M6 e M0.1–M0.5) parecem decisões de escopo, não
  lacunas — M4–M6 são nível 1 puro, sem lab por design; Bloco 0 é
  conceitual, sem sandbox técnico por design.
- **Critério aplicado por grupo**, conforme pedido:
  - Bloco 0 (M0.1–M0.5) e Eixo B básico (M4–M6, M9–M10, M15–M17):
    avaliados por clareza para quem nunca programou, não por volume.
  - Eixo A avançado (M11–M14, M18): avaliados por profundidade
    proporcional à complexidade real do conceito.
  - M1–M3, M7–M8 não se encaixam em nenhum dos dois grupos citados no
    prompt original — tratados aqui com um critério intermediário
    (clareza + profundidade proporcional), por serem Eixo A introdutório,
    já além do puramente institucional do Bloco 0 mas ainda não da
    complexidade de M11+.

## Tabela geral

| Módulo | Palavras (corpo) | Termos `define` | Abertura | Conceito central | Na prática | Diagrama | Lab 🔵 | Checkpoint | Profundidade do conceito | Proporção exemplo/explicação | Nota final |
|---|---:|---:|:-:|:-:|:-:|:-:|:-:|:-:|---|---|---|
| M0.1 | 262 | 1 | ✓ | ✓ | — | — | — | ✓ | adequada | N/A (sem lab, por design) | **adequado** |
| M0.2 | 476 | 3 | ✓ | ✓ | ✓ | ✓ | — | ✓ | aprofundada | proporcional | **denso** |
| M0.3 | 281 | 3 | ✓ | ✓ | ✓ | ✓ | — | ✓ | adequada | proporcional | **adequado** |
| M0.4 | 309 | 5 | ✓ | ✓ | ✓ | ✓ | — | ✓ | rasa | proporcional (ambas rasas) | **adequado** ⚠️ |
| M0.5 | 450 | 5 | ✓ | ✓ | ✓ | ✓ | — | ✓ | adequada | proporcional | **denso** |
| M1 | 466 | 5 | ✓ | ✓ | ✓ | ✓ | — | ✓ | aprofundada | proporcional | **denso** |
| M2 | 414 | 3 | ✓ | ✓ | ✓ | — | ✓ | ✓ | adequada | proporcional | **adequado** |
| M3 | 343 | 3 | ✓ | ✓ | ✓ | — | ✓ | ✓ | adequada | proporcional | **adequado** |
| M4 | 345 | 3 | ✓ | ✓ | ✓ | — | — | ✓ | adequada | proporcional | **adequado** |
| M5 | 296 | 2 | ✓ | ✓ | ✓ | — | — | ✓ | adequada | proporcional | **adequado** |
| M6 | 292 | 3 | ✓ | ✓ | ✓ | — | — | ✓ | adequada | proporcional | **adequado** |
| M7 | 432 | 3 | ✓ | ✓ | ✓ | — | ✓ | ✓ | adequada | proporcional | **denso** |
| M8 | 420 | 3 | ✓ | ✓ | ✓ | — | ✓ | ✓ | aprofundada | proporcional | **denso** |
| M9 | 328 | 3 | ✓ | ✓ | ✓ | — | ✓ | ✓ | adequada | proporcional | **adequado** |
| M10 | 326 | 3 | ✓ | ✓ | ✓ | — | ✓ | ✓ | adequada | proporcional | **adequado** |
| M11 | 372 | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **rasa** | abaixo do esperado | **curto** ⚠️ |
| M12 | 400 | 2 | ✓ | ✓ | ✓ | — | ✓ | ✓ | adequada | proporcional | **adequado** |
| M13 | 500 | 4 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | aprofundada | proporcional | **denso** |
| M14 | 513 | 5 | ✓ | ✓ | ✓ | — | ✓ | ✓ | adequada | proporcional (compensa) | **adequado** ⚠️ |
| M15 | 432 | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | adequada | proporcional (forte) | **adequado** |
| M16 | 311 | 2 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | adequada | proporcional | **adequado** |
| M17 | 647 | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | adequada (conceito) / aprofundada (com a prática) | acima do esperado (compensa) | **denso** |
| M18 | 697 | 4 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | aprofundada | proporcional | **denso** |

**Resumo**: 8 densos, 14 adequados, 1 curto. Nenhum módulo teve seção
presente e vazia — as lacunas de estrutura observadas (sem Diagrama, sem
Lab) parecem intencionais, não descuido.

## Notas por módulo

- **M0.1** — Conceito central curto mas com raciocínio real (por que a
  Anthropic existe → por que Claude se comporta assim); ausência de Na
  prática/Diagrama é adequada ao escopo puramente institucional.
- **M0.2** — Explica LLM e seus limites com raciocínio completo, e a
  conversa ilustrativa em "Na prática" devolve exatamente os três pontos
  levantados no conceito — o módulo mais bem equilibrado do Bloco 0.
- **M0.3** — Trade-off capacidade×velocidade bem explicado e mapeado a
  3 cenários concretos; simples, mas proporcional ao nível 0.
- **M0.4** — Cinco ferramentas, uma frase de definição cada — funciona
  como mapa, mas nenhuma ganha desenvolvimento próprio do "porquê"; é o
  módulo mais raso do Bloco 0 (ver "Módulos que merecem atenção").
- **M0.5** — Fecha o Bloco 0 com boa síntese, conecta 6 termos a
  exemplos concretos e faz a ponte explícita para M1.
- **M1** — Conceito central mais desenvolvido da primeira metade do
  curso: a analogia pergunta-vs-delegação sustenta 5 termos com
  raciocínio real, não só definição.
- **M2** — Explica o modo de permissão amarrando-o de volta ao loop
  agêntico de M1 — justifica o "porquê", não só o "o quê".
- **M3** — Slash commands, workflow e PR ganham razão de ser (não só
  definição), e o transcript final amarra os três num fluxo único.
- **M4** — A analogia da caixa com etiqueta é didaticamente sólida para
  quem nunca programou; o sandbox espelha exatamente os 3 termos
  apresentados.
- **M5** — If/else bem explicado e conectado de volta ao comportamento
  do próprio Claude Code ao avaliar testes — bom gancho conceitual.
- **M6** — Fecha o Bloco 3 conectando explicitamente o `while` ao loop
  agêntico de M1 — reforço conceitual bem-vindo, não redundante.
- **M7** — Estrutura problema→solução (sessão esquece tudo → CLAUDE.md
  resolve) é clara; o exemplo de CLAUDE.md real inclusive expôs um
  artefato deste relatório (ver metodologia).
- **M8** — settings.json vs. CLAUDE.md fica bem diferenciado, e a lógica
  da allowlist (negar por padrão, liberar por exceção) é explicada, não
  só nomeada.
- **M9** — Lista, índice e dicionário bem definidos; três sandboxes
  progressivos (lista → dicionário → lista de dicionários) fazem o
  trabalho pesado da parte prática.
- **M10** — A distinção entre função-com-retorno e função-só-efeito
  resolve uma confusão comum de iniciante; exemplos conectam de volta a
  M9.
- **M11** — Seis primitivas, ~30 palavras cada, duas delas explicitamente
  adiadas para outros módulos ("você vai ver isso a fundo em
  M12/M13") — módulo-mapa que ainda não desenvolve nenhuma primitiva por
  conta própria (ver "Módulos que merecem atenção").
- **M12** — Aprofunda o MCP citado de relance em M11 com raciocínio real
  (por que um protocolo comum, o que um servidor MCP expõe) — bom
  exemplo de retomada que efetivamente aprofunda.
- **M13** — Conceito central mais longo do curso, com analogia própria
  (fotocópias de uma pesquisa) que sustenta 4 termos interligados e
  nomeia o trade-off custo/benefício do paralelismo — o módulo de Eixo A
  avançado mais bem resolvido.
- **M14** — Conceito central é eficiente mas enxuto para 5 termos; os
  dois transcripts de "Na prática" (`/goal` vs. `/loop`) compensam bem,
  diferenciando na prática o que o texto só nomeia.
- **M15** — Seis termos, mas hierárquicos e mecânicos
  (módulo→pacote→biblioteca), não conceitos independentes — a "Na
  prática" é a mais completa do eixo técnico, com os três casos (local,
  biblioteca padrão, pip) bem diferenciados.
- **M16** — JSON mapeado com clareza a dicionário/lista já conhecidos;
  os dois sandboxes (`loads`/`dumps`) cobrem as duas direções da
  conversão.
- **M17** — Conceito central é enxuto, mas "Na prática" (a maior do
  curso, 337 palavras) faz o trabalho conceitual pesado com 3 sandboxes
  progressivos que provam empiricamente a diferença entre sequencial e
  concorrente — pedagogia forte para um tema historicamente difícil.
- **M18** — Módulo de fechamento com a maior densidade de referências
  cruzadas do curso (M1, M10, M11–M12, M16, M17), e os 3 exemplos de
  código são os mais sofisticados e progressivos do material —
  proporcional a ser o tema mais complexo do curso.

## Módulos que merecem atenção

Ordenados por tamanho do gap entre complexidade do tema e profundidade
do texto atual — é o resultado mais importante deste relatório para
decidir próximos passos.

### 1. M11 — As Seis Primitivas (prioridade alta)

O módulo tem a estrutura fixa tecnicamente completa (todas as 6 seções
presentes) e é o que mais introduz termos de uma vez (6), mas cada
primitiva recebe apenas uma frase de definição — em média ~30 palavras
por conceito, incluindo duas (Subagents, MCP) cuja explicação real é
explicitamente adiada para M12/M13 ("você vai ver isso a fundo em...").
Um leitor sem conhecimento prévio termina o módulo sabendo que essas seis
coisas existem e como se chamam, mas não por que cada uma importa nem
como elas diferem de fato entre si além de um adjetivo cada. A "Na
prática" reforça o padrão: um único transcript tocando as seis
superficialmente, sem desenvolver nenhuma. Isso é coerente com o próprio
enunciado desta tarefa, que cita M11 como exemplo do risco — seis
primitivas complexas cabendo em texto curto é sinal de possível
superficialidade, mesmo com a estrutura preenchida.

### 2. M0.4 — Ferramentas do Dia a Dia (prioridade moderada)

Mesmo padrão de M11 em escala menor: cinco ferramentas, uma frase cada,
sem desenvolvimento individual do "porquê". A diferença é que o
conteúdo é factualmente mais simples (nomes de recursos de produto, não
mecanismos agênticos), e o próprio módulo se autolimita de propósito
("como configurar cada uma não é escopo deste módulo") — o que atenua,
mas não elimina, o risco de o módulo funcionar mais como lista do que
como explicação.

### 3. M14 — Automação e Autonomia (monitorar)

Cinco termos (automação, routine, `/loop`, `/goal`, sandboxing) num
Conceito central de 222 palavras — eficiente, mas o mais próximo de M11
entre os módulos avançados em termos de "muitos conceitos, pouco espaço
cada". Diferente de M11, aqui a seção "Na prática" compensa com dois
transcripts completos que efetivamente diferenciam `/goal` de `/loop` em
uso real — por isso não entra como prioridade alta, mas vale
acompanhar se o módulo crescer (ex. se um sexto conceito for adicionado)
sem crescer a prática junto.

---

Nenhum outro módulo apresentou gap relevante entre complexidade e
profundidade — em particular, M12, M13 e M18 (também Eixo A avançado)
saíram bem avaliados, com M13 sendo o exemplo mais forte de profundidade
proporcional a um tema de múltiplas partes interligadas.
