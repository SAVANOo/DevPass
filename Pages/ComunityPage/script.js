const accessToken = localStorage.getItem('token');

if (!accessToken) window.location.href = "../LoginPage/Index.html";

function buildComunityItem(mapData, bgColor) {
    const comunidadeCardsContainer = document.querySelector(".comunity-cards");
    const comunidadeCardItem = document.createElement('div');
    comunidadeCardItem.classList.add("card");
    comunidadeCardItem.classList.add(`${bgColor}-background`);
    comunidadeCardItem.innerHTML = `
                        <div class="card-content">
                            <img class="icon-card" src="/Pages/ComunityPage/Src/Comunidades/Imagens/iconcomunidade.png">
                            <h1 class="card-title">${mapData.nome}</h1>
                            <p class="card-text">${mapData.tema}</p>
                            <button class="saiba-mais">Saiba Mais</button>
                        </div>
                    `
    comunidadeCardsContainer.appendChild(comunidadeCardItem);
}


fetch(`${baseUrl}/comunidades`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
})
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Falha ao acessar o recurso protegido. Por favor, faça login novamente.');
        }
    })
    .then(data => {
        let colors = ["blue", "orange", "green", "grey"]
        for (i = 0; i < 4; i++) {
            buildComunityItem(data[i], colors[i]);
        }

    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        window.location.href = "../LoginPage/Index.html";
    });
