const accessToken = localStorage.getItem("token");
if (!accessToken) window.location.href = "../LoginPage/Index.html";

function addConteudo() {
    const conteudoContainer = document.getElementById("conteudoContainer");
    const newConteudo = document.createElement("div");
    newConteudo.classList.add("conteudo");
    newConteudo.innerHTML = `
       
        <input type="text" class="conteudoTitulo form-input" placeholder="Título da aula" name="conteudoTitulo[]" required>
        <input type="text" class="conteudoUrl form-input" placeholder="URL" name="conteudoUrl[]" required>
    `;
    conteudoContainer.appendChild(newConteudo);
}

document.getElementById("courseForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const conteudoTitulos = formData.getAll("conteudoTitulo[]");
    const conteudoUrls = formData.getAll("conteudoUrl[]");

    let conteudo = [];
    for (let i = 0; i < conteudoTitulos.length; i++) {
        conteudo.push({
            titulo: conteudoTitulos[i],
            url: conteudoUrls[i],
        });
    }
    formData.append("conteudo", JSON.stringify(conteudo));

    fetch(`${baseUrl}/cursos`, {
        method: "POST",
        body: {
            
        },
        headers: {
          
            'Authorization': `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else if (
                !contentType ||
                !contentType.includes("application/json")
            ) {
                throw new Error("Não recebemos JSON!");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
