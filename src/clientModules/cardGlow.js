// Glow que segue o cursor nos cards reais do site (réplica do
// onmousemove do mockup aprovado, via listener delegado em vez de
// handler em cada card). Qualquer elemento com a classe
// "curso-glow-card" (ver custom.css) recebe --mx/--my. Só roda no
// navegador — Docusaurus também importa client modules durante o
// build SSR, onde `document` não existe.
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener('mousemove', (evento) => {
    const card = evento.target.closest('.curso-glow-card, .pagination-nav__link');
    if (!card) return;
    const retangulo = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${evento.clientX - retangulo.left}px`);
    card.style.setProperty('--my', `${evento.clientY - retangulo.top}px`);
  });
}
