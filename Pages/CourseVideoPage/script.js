import * as courseCarousel from  "../Components/courseCarousel.js";

const accessToken = localStorage.getItem('token');

if (accessToken) {

    const urlParams = new URLSearchParams(window.location.search);
    const idParameter = urlParams.get('id');
    console.log(idParameter); // 42

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
            console.log(data);
            data.cursos.forEach(course => {
                if (course.id == idParameter)
                    buildCoursePage(course);
            })

            let qntItems = 10;
            courseCarousel.buildCardCourse(data.cursos, qntItems);
            courseCarousel.enableCourseCarousel();
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            /* window.location.href = "../LoginPage/Index.html"; */
        });


} else {
    window.location.href = "../LoginPage/Index.html";
}

function buildCoursePage(course) {
    console.log(course)

    /* Construção da descrição */

    const descriptionContent = document.querySelector(".Description");
    const descriptionTitle = document.createElement("h2");
    descriptionTitle.textContent = "Descrição";

    const descriptionText = document.createElement("p");
    descriptionText.textContent = course.descricao;

    /* Construção do conteúdo */

    const courseContent = document.querySelector(".Course-content");

    const contentTitle = document.createElement("h2");
    contentTitle.textContent = "Conteudo";

    const contentFrame = document.createElement("div");
    contentFrame.classList.add("Frame");

    const frameHeader = document.createElement("div");
    frameHeader.classList.add("Frame-header");

    const frameChapter = document.createElement("div");
    frameChapter.classList.add("Chapter");
    frameChapter.innerHTML = `<i class="fa-solid fa-circle-arrow-down"></i><span>INTRODUÇÃO</span>`;

    const contentInfo = document.createElement("div");
    contentInfo.classList.add("Content-info");

    const listContent = document.createElement("ul");

    //forma dinâmica, esperando o back ser implementado
    /* course.conteudo.split(".").forEach((element) => {
        listContent.innerHTML += `<li>${element}</li>`;
        }) */

    listContent.innerHTML += `<li>Aula 1: Introdução ao curso</li>
       <li>Aula 2: Objetivos do curso</li>
       <li>Aula 3: Estrutura do curso</li>`

    descriptionContent.appendChild(descriptionTitle);
    descriptionContent.appendChild(descriptionText);
    courseContent.appendChild(contentTitle);
    frameHeader.appendChild(frameChapter);
    frameHeader.innerHTML += `<p>${course.duracao}</p>`;
    contentFrame.appendChild(frameHeader);
    contentInfo.appendChild(listContent);
    contentFrame.appendChild(contentInfo);
    courseContent.appendChild(contentFrame);

    /* Abrir e recolher a barra de conteúdo */
    contentFrame.addEventListener("click", () => { toggleContent(contentInfo) });
}

function toggleContent(element) {
    console.log(element)
    if (element.style.display === "flex") {
        element.style.display = "none";
    } else {
        element.style.display = "flex";
    }
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
