document.addEventListener("DOMContentLoaded", () => {
  // --- Elementos
const progressRing = document.querySelector(".progress-ring");
const percentEl = progressRing.querySelector(".percent");
const ringEl = progressRing.querySelector(".ring");
const bellBtn = document.querySelector(".bell");

const pointsNowEl = document.getElementById("pointsNow");
const pointsGoalEl = document.getElementById("pointsGoal");

// Seleciona todos os itens da navbar inferior
const navItems = document.querySelectorAll(".bottom-nav .nav-item");

// Definição das páginas correspondentes
const pages = [
  "home.html",
  "gamificacao.html",
  "ranking.html",
  "box.html",
  "docs.html",
  "profile.html"
];

// Associação de cada item da navbar a uma página
navItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    window.location.href = pages[index];
  });
});

// --- Cálculo do progresso
function updateProgress() {
    const current = parseInt(pointsNowEl.textContent.replace(/\D/g, ""), 10);
    const goal = parseInt(pointsGoalEl.textContent.replace(/\D/g, ""), 10);

    let pct = Math.round((current / goal) * 100);
    if (pct > 100) pct = 100; 

    // atualiza o atributo e o texto
    progressRing.setAttribute("data-pct", pct);
    percentEl.textContent = pct + "%";

    // aplica visual do círculo
    ringEl.style.background = `conic-gradient(
    orange ${pct}%, 
    #ddd ${pct}% 100%
    )`;
}

  // --- Clique nas notificações (simulação de notificação)
bellBtn.addEventListener("click", () => {
    alert("🔔 Você não tem novas notificações!");
});

  // --- Chama inicial
updateProgress();
});
