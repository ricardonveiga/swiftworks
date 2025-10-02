// pega o formulário e a área de mensagem
const form = document.getElementById("loginForm");
const mensagem = document.getElementById("mensagem");

// escuta o evento de "submit" do formulário
form.addEventListener("submit", function(event) {
  event.preventDefault(); // evita que a página recarregue

const cpf = document.getElementById("cpf").value;
const senha = document.getElementById("senha").value;

  // valores de teste (mock)
const cpfCorreto = "12345678900";
const senhaCorreta = "1234";

if (cpf === cpfCorreto && senha === senhaCorreta) {
    mensagem.textContent = "Login bem-sucedido!";
        console.log("✅ Vai redirecionar agora...");
    setTimeout(() => {
    window.location.href = "home.html"; // redireciona
    }, 1000);
} else {
    mensagem.textContent = "CPF ou senha incorretos.";
}
});
