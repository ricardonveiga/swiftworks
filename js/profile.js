document.addEventListener("DOMContentLoaded", () => {

// --- elementos
const backBtn = document.querySelector(".btn-back");
const shareBtn = document.querySelector(".btn-share");
const editBtn = document.querySelector(".btn-edit");
const infoItems = Array.from(document.querySelectorAll(".info-item"));
const infoValues = Array.from(document.querySelectorAll(".info-value"));
const profileNameEl = document.querySelector(".profile-name");

const msgEl = document.createElement("div");
msgEl.id = "profile-msg";

Object.assign(msgEl.style, {
position: "fixed",
bottom: "90px",
left: "50%",
transform: "translateX(-50%)",
background: "rgba(0,0,0,0.8)",
color: "#fff",
padding: "8px 12px",
borderRadius: "8px",
display: "none",
zIndex: 9999,
fontSize: "14px"
});
document.body.appendChild(msgEl);

function showMessage(text, timeout = 2500) {
msgEl.textContent = text;
msgEl.style.display = "block";
clearTimeout(msgEl._t);
msgEl._t = setTimeout(() => (msgEl.style.display = "none"), timeout);
}

// --- Botão Voltar (volta para a página anterior)
if (backBtn) {
backBtn.addEventListener("click", () => {
window.history.back();
});
}

// --- Compartilhar (botão)
if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
    const title = `Perfil — ${profileNameEl ? profileNameEl.textContent : "Usuário"}`;
    const url = location.href;
    try {
        if (navigator.share) {
        await navigator.share({ title, text: "Veja meu perfil", url });
        } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        showMessage("Link copiado para a área de transferência");
        } else {
        showMessage("Compartilhamento não disponível neste navegador");
        }
    } catch (err) {
        console.error("share error:", err);
        showMessage("Erro ao tentar compartilhar");
    }
    });
}

// --- NAV
const navItems = Array.from(document.querySelectorAll(".bottom-nav .nav-item"));

//Redirecionamentos
const navTargets = [
"home.html",
"gamificacao.html",
"ranking.html",
"premios.html",
"documentos.html",
"profile.html"
];

navItems.forEach((navEl, i) => {
navEl.addEventListener("click", (e) => {
    e.preventDefault();
    const target = navTargets[i];

    if (!target) {
    showMessage("Página não configurada");
    return;
    }

    if (location.pathname.endsWith(target) || location.href.endsWith(target)) {
    navItems.forEach(n => n.classList.remove("active"));
    navEl.classList.add("active");
    return;
    }

    // redirecionamento
    window.location.href = target;
});
});

//Edição e salvamento dos dados
let editing = false;

function loadProfileFromStorage() {
    try {
    const raw = localStorage.getItem("profile");
    if (!raw) return;
    const data = JSON.parse(raw);
    infoItems.forEach(item => {
        const labelEl = item.querySelector(".info-label");
        const valueEl = item.querySelector(".info-value");
        if (!labelEl || !valueEl) return;
        const key = labelEl.textContent.replace(":", "").trim().toLowerCase().replace(/\s+/g, "_");
        if (data[key] !== undefined) valueEl.textContent = data[key];
    });
    if (data.nome) {
        const nameEl = document.querySelector(".profile-name");
        if (nameEl) nameEl.textContent = data.nome;
    }
    } catch (err) {
    console.error("Erro ao carregar profile do storage", err);
    }
}

function enterEditMode() {
    editing = true;
    editBtn.textContent = "Salvar";
    infoValues.forEach((v, idx) => {
    v.setAttribute("contenteditable", "true");
      v.classList.add("editing"); // você pode estilizar .editing no CSS
    if (idx === 0) v.focus();
    });
    showMessage("Modo edição ativado");
}

function saveProfile() {
    editing = false;
    editBtn.textContent = "Editar";
    infoValues.forEach(v => {
    v.removeAttribute("contenteditable");
    v.classList.remove("editing");
    });

// Objeto a partir dos labels/values
    const profileObj = {};
    infoItems.forEach(item => {
    const labelEl = item.querySelector(".info-label");
    const valueEl = item.querySelector(".info-value");
    if (!labelEl || !valueEl) return;
    const key = labelEl.textContent.replace(":", "").trim().toLowerCase().replace(/\s+/g, "_");
    profileObj[key] = valueEl.textContent.trim();
    });

// salvar no localStorage
    try {
    localStorage.setItem("profile", JSON.stringify(profileObj));

// atualiza o nome no header (se existir)
    if (profileObj.nome) {
        const nameEl = document.querySelector(".profile-name");
        if (nameEl) nameEl.textContent = profileObj.nome;
    }
    showMessage("Perfil salvo com sucesso");
    } catch (err) {
    console.error("Erro ao salvar profile", err);
    showMessage("Erro ao salvar perfil");
    }
}

if (editBtn) {
// inicializa texto do botão (caso estivesse vazio)
    editBtn.textContent = "Editar";
    editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!editing) enterEditMode();
    else saveProfile();
    });
}

// load inicial
loadProfileFromStorage();
});
