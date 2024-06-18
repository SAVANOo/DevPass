const accessToken = localStorage.getItem('token');


/* if (!accessToken) window.location.href = "../LoginPage/Index.html"; */

const urlParams = new URLSearchParams(window.location.search);
const idParameter = urlParams.get('id');

function buildComunityItem(mapData, bgColor) {
    const comunidadeCardsContainer = document.querySelector(".comunity-cards");
    const comunidadeCardItem = document.createElement('div');
    comunidadeCardItem.classList.add("card");
    comunidadeCardItem.id = `community-${mapData.id}`;
    comunidadeCardItem.classList.add(`${bgColor}-background`);
    comunidadeCardItem.innerHTML = `
                        <div class="card-content">
                            <img class="icon-card" src="Src/Comunidades/Imagens/iconcomunidade.png">
                            <h1 class="card-title">${mapData.nome}</h1>
                            <p class="card-text">${mapData.tema}</p>
                            <button class="saiba-mais">Saiba Mais</button>
                        </div>
                        
                    `

    const buttonSaibaMais = comunidadeCardItem.children[0].children[3];

    buttonSaibaMais.addEventListener("click", () => {
        console.log("oi")
        let id = comunidadeCardItem.id.replace("community-", "");
        window.location.href = `./index.html?id=${id}`
    });

    console.log(buttonSaibaMais);
    comunidadeCardsContainer.appendChild(comunidadeCardItem);
}


function buildComunityItemBar(mapData, bgColor) {
    const comunidadeBarsContainer = document.querySelector(".discussion-bars");
    const comunidadeBarItem = document.createElement('div');
    comunidadeBarItem.classList.add("bar");
    comunidadeBarItem.classList.add(`${bgColor}-background`);
    comunidadeBarItem.innerHTML = `
                     <div class="info-discussion">
                        <div class="acess-discussion">
                            <img class="arrow-bar" src="Src/Comunidades/Imagens/arrowcom.png">
                            <p class="theme-discussion">${mapData.tema}</p>
                        </div>
                        <div class="participants">
                            <p class="members-numbers">${mapData.membros}</p>
                        </div>
                    </div>
                    `
    comunidadeBarsContainer.appendChild(comunidadeBarItem);
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
            buildComunityItemBar(data[i], colors[i]);


        }

    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        /* window.location.href = "../LoginPage/Index.html"; */
    });










function buildComunityBanner(mapData) {
    const comunidadeBannerContainer = document.querySelector(".banner-comunity-container");
    const comunidadeBannerItem = document.createElement('div');
    comunidadeBannerItem.classList.add('banner');
    comunidadeBannerItem.innerHTML = `
      
        `
    comunidadeBannerContainer.appendChild(comunidadeBannerItem);
}

fetch(`${baseUrl}/comunidades/${idParameter}`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer  ${accessToken}`,
    }
}
)

    .then(response => response.json())
    .then(data => {
        document.querySelector('.name-comunity').textContent = data.nome;
        document.querySelector('.description-comunity').textContent = data.tema;
        document.querySelector('.criation-comunity').textContent = `Criado por ${data.creator}`;
        document.querySelector('.language-comunity').textContent = data.language;


        buildComunityBanner(data);
    })
    .catch(error => {
        console.error('Erro ao buscar dados da comnunidade', error);
    });



