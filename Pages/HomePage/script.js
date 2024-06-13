const accessToken = localStorage.getItem('token');

if (accessToken) {

    /* Requisição para receber coleção de cursos*/
    fetch(`${baseUrl}/cursos/cursos`, {
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
            let qntItems = 10 //quantidades de cursos na tela        
            buildCardCourse(data.cursos, qntItems);
            enableCourseCarousel();
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            window.location.href = "../LoginPage/Index.html";
        });


    /* Requisição para receber coleção de comunidades */
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
        .then(data => { /* Consumo das informações de comunidades */

            let qntItems = 10 //Quantidade de comunidades na tela
            buildCardCommunity(data, qntItems)
            enableCommunityCarousel();
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            window.location.href = "../LoginPage/Index.html";
        });

} else {
    window.location.href = "../LoginPage/Index.html";
}

function buildCardCourse(courses, numItems) {
    //Adiciona a quantidade de items escolhida para mostrar na tela
    for (let i = 0; i < numItems; i++) {
        const courseItems = document.querySelector('.CursosItems');

        const courseItem = document.createElement('div');
        courseItem.classList.add("CursoItem");
        courseItem.id = `course-${courses[i].id}`;

        courseItem.addEventListener('click', (element) => {
            let id = courseItem.id.replace("course-", "");
            console.log(id)
            window.location.href = `../CoursePage/Index.html?id=${id}`;
        })

        const courseImage = document.createElement('img');
        courseImage.classList.add("CursoImage")
        courseImage.src = "Src/cursos/tumbnail.png"; //fixo até mudar para forma dinâmica

        const courseTitle = document.createElement('h3');
        courseTitle.classList.add("CursoTitle");
        courseTitle.textContent = courses[i].titulo;

        const courseAuthor = document.createElement("p");
        courseAuthor.classList.add("CursoAuthor");
        courseAuthor.textContent = courses[i].professor

        const courseRating = document.createElement("div");
        courseRating.classList.add("CursoRating");

        const valueRating = document.createElement("span");
        valueRating.classList.add("yellow");
        valueRating.textContent = "5,0 "; //fixo no momento
        courseRating.appendChild(valueRating);

        /* 5 icons estrelas para avaliação, no momento fixos */
        let arrayStar = ['', '', '', '', '']
        arrayStar.forEach(element => {
            element = '<i class="fa-solid fa-star yellow"></i>';
            courseRating.innerHTML += element;
        })

        const coursePrice = document.createElement("h3");
        coursePrice.classList.add("CursoPrice");

        courseItem.appendChild(courseImage);
        courseItem.appendChild(courseTitle);
        courseItem.appendChild(courseAuthor);
        courseItem.appendChild(courseRating);
        courseItem.appendChild(coursePrice);
        courseItems.appendChild(courseItem)
    }

}

function buildCardCommunity(communities, numItems) {

    //Adiciona a quantidade de items escolhida para mostrar na tela
    for (let i = 0; i < numItems; i++) {
        const communityItems = document.querySelector('.CommunityItems');

        const communityItem = document.createElement('div');
        communityItem.classList.add("CommunityItem");
        communityItem.id = `community-${communities[i].id}`;

        let bgColor = ["--blue-main", "--orange-main", "--green-main", "--gray-hover-dark-2"]
        communityItem.style.backgroundColor = `var(${bgColor[i % 4]})`

        const communityImage = document.createElement('img');
        communityImage.classList.add("CommunityImage")
        communityImage.src = "Src/Comunidades/Imagens/img1.jpg"; //fixo até mudar para forma dinâmica

        const communityTitle = document.createElement('h3');
        communityTitle.classList.add("CommunityTitle");
        communityTitle.textContent = communities[i].nome;

        const communityDescription = document.createElement("p");
        communityDescription.classList.add("Description");
        communityDescription.textContent = communities[i].tema;

        const communityActivities = document.createElement("div");
        communityActivities.classList.add("CommunityActivities");

        let activities = '';
        communities[i].atividades.forEach(element => {
            activities += `<span class="ActivitiesItem">${element}</span> `;
        })
        communityActivities.innerHTML = activities;

        const communityButton = document.createElement("button");
        communityButton.setAttribute("class", "Community Button2");
        communityButton.textContent = "Saiba Mais";

        communityItem.appendChild(communityImage);
        communityItem.appendChild(communityTitle);
        communityItem.appendChild(communityDescription);
        communityItem.appendChild(communityActivities);
        communityItem.appendChild(communityButton);

        communityItems.appendChild(communityItem);
    }
}

/* Carrosel de Cursos */
function enableCourseCarousel() {
    const prevBtn = document.querySelector('.CarouselBtn.Prev');
    const nextBtn = document.querySelector('.CarouselBtn.Next');
    const coursesItems = document.querySelector('.CursosItems');
    const transitionWidth = coursesItems.children[0].offsetWidth + 15; //width + gap 
    let scrollPosition = 0;

    nextBtn.addEventListener('click', () => {
        if (scrollPosition < (coursesItems.children.length - 1) * transitionWidth) {
            scrollPosition += transitionWidth;
            coursesItems.style.transform = `translateX(-${scrollPosition}px)`;
        }
    });

    prevBtn.addEventListener('click', () => {
        if (scrollPosition > 0) {
            scrollPosition -= transitionWidth;
            coursesItems.style.transform = `translateX(-${scrollPosition}px)`;
        }
    });
};

/* Carrossel de Comunidades */
function enableCommunityCarousel() {
    const prevBtn = document.querySelector('.CarouselBtn.Prev.Communities');
    const nextBtn = document.querySelector('.CarouselBtn.Next.Communities');
    const communityItems = document.querySelector('.CommunityItems');
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
