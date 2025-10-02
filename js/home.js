// Atualiza o donut de progresso lendo o atributo data-pct
document.querySelectorAll('.progress-ring').forEach(ring => {
  const pct = Number(ring.dataset.pct || 0); // 0–100
  // seta variável CSS --pct usada no conic-gradient
  ring.querySelector('.ring').style.setProperty('--pct', pct);
  // atualiza o texto central
  const pctEl = ring.querySelector('.percent');
  if (pctEl) pctEl.textContent = `${pct}%`;
});
