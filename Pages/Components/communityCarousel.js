export function buildCardCommunity(communityList, numItems) {
    console.log(communityList)
    //Adiciona a quantidade de items escolhida para mostrar na tela
    for (let i = 0; i < numItems; i++) {
        const communityListContainer = document.getElementById("communityList");

        const communityItem = document.createElement('div');
        communityItem.classList.add("CommunityItem");
        communityItem.id = `community-${communityList[i].id}`;

        let bgColor = ["--blue-main", "--orange-main", "--green-main", "--gray-hover-dark-2"]
        communityItem.style.backgroundColor = `var(${bgColor[i % 4]})`

        const communityImage = document.createElement('img');
        communityImage.classList.add("CommunityImage")
        communityImage.src = "Src/Comunidades/Imagens/img1.jpg"; //fixo até mudar para forma dinâmica

        const communityTitle = document.createElement('h3');
        communityTitle.classList.add("CommunityTitle");
        communityTitle.textContent = communityList[i].nome;

        const communityDescription = document.createElement("p");
        communityDescription.classList.add("Description");
        communityDescription.textContent = communityList[i].tema;

        const communityActivities = document.createElement("div");
        communityActivities.classList.add("CommunityActivities");

        let activities = '';
        communityList[i].atividades.forEach(element => {
            activities += `<span class="ActivitiesItem">${element}</span> `;
        })
        communityActivities.innerHTML = activities;

        const communityButton = document.createElement("button");
        communityButton.setAttribute("class", "Community Button2");
        communityButton.textContent = "Saiba Mais";

        communityButton.addEventListener('click', () => {
            let id = communityItem.id.replace("community-", "");
            window.location.href = `../ComunityPage/index.html?id=${id}`;
        })

        communityItem.appendChild(communityImage);
        communityItem.appendChild(communityTitle);
        communityItem.appendChild(communityDescription);
        communityItem.appendChild(communityActivities);
        communityItem.appendChild(communityButton);

        communityListContainer.appendChild(communityItem);
    }
}

export function enableCommunityCarousel() {
    const prevBtn = document.getElementById("btnPrevCommunity");
    const nextBtn = document.getElementById("btnNextCommunity");
    const communityItems = document.getElementById("communityList");
    let transitionWidth = communityItems.children[0].offsetWidth + 15; //width + gap  
    let scrollPosition = 0;

    nextBtn.addEventListener('click', () => {
        if (scrollPosition < (communityItems.children.length - 1) * transitionWidth) {
            scrollPosition += transitionWidth;
            communityItems.style.transform = `translateX(-${scrollPosition}px)`;
        }
    });

    prevBtn.addEventListener('click', () => {
        if (scrollPosition > 0) {
            scrollPosition -= transitionWidth;
            communityItems.style.transform = `translateX(-${scrollPosition}px)`;
        }
    });
};
