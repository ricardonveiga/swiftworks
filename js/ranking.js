// Seleciona os botões
const backButton = document.querySelector(".back-button");
const filterButton = document.querySelector(".filter-button");

// Evento do botão "voltar"
backButton.addEventListener("click", () => {
window.history.back();
});

// Evento do botão "filtro"
filterButton.addEventListener("click", () => {
alert("Aqui pode abrir um modal ou menu de filtros!");
});

// Navegação inferior
const navItems = document.querySelectorAll(".bottom-nav .nav-item");
navItems.forEach((item, index) => {
item.addEventListener("click", () => {
    // Remove a classe 'active' de todos
    navItems.forEach(nav => nav.classList.remove("active"));
    // Adiciona 'active' no item clicado
    item.classList.add("active");

    // Redirecionamentos
    switch (index) {
    case 0:
        window.location.href = "home.html";
        break;
    case 1:
        window.location.href = "game.html";
        break;
    case 2:
        window.location.href = "ranking.html"; 
        break;
    case 3:
        window.location.href = "box.html";
        break;
    case 4:
        window.location.href = "docs.html";
        break;
    case 5:
        window.location.href = "profile.html";
        break;
    }
});
});
