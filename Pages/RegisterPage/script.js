const enterButton = document.getElementById("enterButton");

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    document.body.removeChild(toast);
  }, 3000);
}

enterButton.addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    showToast("Por favor, preencha todos os campos.");
    return;
  }

  document.getElementById("loader").style.display = "block";

  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Cadastro realizado com sucesso:", data);
      window.location.href = "../LoginPage/Index.html";
    } else {
      const errorData = await response.json();
      if (
        errorData.errors &&
        errorData.errors.email &&
        errorData.errors.email.includes("The email has already been taken.")
      ) {
        showToast("Este e-mail já está sendo utilizado.");
      } else {
        showToast("Falha no cadastro. Verifique os dados fornecidos.");
      }
    }
  } catch (error) {
    console.error("Erro durante o cadastro:", error);
    showToast(
      "Ocorreu um erro durante o cadastro. Tente novamente mais tarde."
    );
  }

  document.getElementById("loader").style.display = "none";
});
