const accessToken = localStorage.getItem('token');

if (!accessToken) window.location.href = "../LoginPage/Index.html";

function buildComunity(titulo, descricao){
  const comunidadeItem = document.createElement('div'); 
  const comunidadeItens = document.querySelector(".comunity-cards");
  
      comunidadeItem.classList.add("card");
          comunidadeItem.innerHTML=`
                            <div class="card-content">
                                <img class="icon-card" src="/Pages\ComunityPage\Src\Comunidades\Imagens\iconcomunidade.png">
                                <h1 class="card-title">Xeloguers</h1>
                                <p class="card-text">Comunidade dos Xeloguers. O Ruan sempre tá errado.</p>
                          
                            <button class="saiba-mais">Saiba Mais</button>
                        </div>
                    `

            comunidadeItens.appendChild(comunidadeItem);

            console.log(comunidadeItem);
}


fetch(`${baseUrl}/comunidades`,{
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
        console.log('Comunidades', data);
        let qntCards = 4;  // Number of cards to display
        let colors = ["blue", "orange", "green", "grey"];
        let bgColor = {
            blue: "#0500ff",
            orange: "#ff8a00",
            green: "#05ff00",
            grey: "#8a8a8a"
        };

        data.forEach((element, index) => {
            if (qntCards > 0) {
                let color = colors[index % 4];  // Cycle through the colors
                buildComunity(element.nome, element.descricao);
                qntCards--;
            }
            console.log(element);
        });
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        // window.location.href = "../LoginPage/Index.html";
    });