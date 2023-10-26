const conteudos = {
    Comunidades: document.querySelector("#SearchResultados"),
    jsonUrlComunidades: "Src/Comunidades/data.json"
};

// Função para buscar e atualizar os dados
function fetchData(container, jsonUrl) {
    fetch(jsonUrl)
        .then((response) => response.json())
        .then((data) => {
            // Limpar o conteúdo atual da div
            container.innerHTML = "";

            // Iterar sobre os dados e criar elementos HTML
            data.forEach((item) => {
                const ItemsDiv = document.createElement("li");
                ItemsDiv.classList.add("Items");

                const divSearchContent = document.createElement("div");
                divSearchContent.classList.add("SearchContent")

                const divSearchInformation = document.createElement("div")
                divSearchInformation.classList.add("SearchInformation");

                const tipo = document.createElement("h3");
                // tipo.textContent = item.tipo;
                tipo.textContent = item.tipo.toUpperCase();
                tipo.classList.add("TypeSearch");
                
                const img = document.createElement("img");
                img.src = item.imagem;
                img.alt = `${item.titulo} image`;
                img.classList.add("Image")

                const link = document.createElement("a");
                link.href = item.link;
                link.classList.add("VagaTitle");
                link.textContent = item.titulo;
                link.setAttribute("target", "_blank");

                const subtitle = document.createElement("h3");
                subtitle.classList.add("Subtitle");
                subtitle.textContent = item.subtitulo;

                divSearchInformation.appendChild(link)
                divSearchInformation.appendChild(subtitle)

                divSearchContent.appendChild(img)
                divSearchContent.appendChild(divSearchInformation)

                ItemsDiv.appendChild(tipo)
                ItemsDiv.appendChild(divSearchContent)


                container.appendChild(ItemsDiv);
            });
        })
        .catch((error) => {
            console.error("Ocorreu um erro ao buscar os dados: ", error);
        });
}

// Chame a função para buscar e atualizar os dados
fetchData(conteudos.Comunidades, conteudos.jsonUrlComunidades);