import * as courseCarousel from  "../Components/courseCarousel.js";

const accessToken = localStorage.getItem('token');

if (accessToken) {

    const urlParams = new URLSearchParams(window.location.search);
    const idParameter = urlParams.get('id');

    /* Requisição para receber coleção de cursos*/
    fetch(`${baseUrl}/cursos/`, {
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
            window.location.href = "../LoginPage/Index.html";
        });


} else {
    window.location.href = "../LoginPage/Index.html";
}

function buildCoursePage(course) {
    const headerCourse = document.getElementById("headerCourse");
    headerCourse.innerHTML = '';

    const headerContent = document.createElement("div");
    headerContent.classList.add("Content");

    const informationKeyContent = document.createElement("div");
    informationKeyContent.classList.add("InformationKey");

    /* Definição de título, sub-título, autor, avaliação e idioma */
    const courseImage = document.createElement("img");
    courseImage.classList.add("BackgroundImage1");
    courseImage.src = course.thumb; 

    const courseTitle = document.createElement('h1');
    courseTitle.classList.add("Title");
    courseTitle.textContent = course.titulo;

    const courseSubTitle = document.createElement("p")
    courseSubTitle.classList.add("Sub-title");
    courseSubTitle.textContent = course.descricao.split(".")[0] + ".";

    const courseAuthor = document.createElement("p");
    courseAuthor.classList.add("Autor");
    courseAuthor.textContent = `Criado por ${course.professor}`;

    const courseRating = document.createElement("div");
    courseRating.classList.add("Rating");

    const valueRating = document.createElement("span");
    valueRating.classList.add("yellow");
    valueRating.textContent = `${course.rating},0 `; 
    courseRating.appendChild(valueRating);

    let arrayStar = ['', '', '', '', '']
    arrayStar.forEach((element, index) => {
        if (index < course.rating) {
            element = '<i class="fa-solid fa-star yellow"></i>';
        } else {
            element = '<i class="fa-solid fa-star gray"></i>';
        }
        courseRating.innerHTML += element;
    });

    const courseLanguage = document.createElement("div");
    courseLanguage.classList.add("Language");

    const iconLanguage = document.createElement("i");
    iconLanguage.setAttribute("class", "fa-solid fa-globe");

    const nameLanguage = document.createElement("span");
    nameLanguage.textContent = "Português";


    /* Criação do card do curso */
    const courseCard = document.createElement("div");
    courseCard.classList.add("CourseCard");

    const cardImage = document.createElement("img");
    cardImage.src = course.thumb;

    const iconPlay = document.createElement("i");
    iconPlay.setAttribute("class", "fa-regular fa-circle-play fa-2xl");

    const coursePriceContent = document.createElement("div");
    coursePriceContent.classList.add("Value");
    coursePriceContent.innerHTML = `<div id="value">R$ ${course.preco}</div>`

    const cardButtonContent = document.createElement("div");
    cardButtonContent.classList.add("ButtonContent");

    const cardButton = document.createElement("button");
    cardButton.id = "buyButton";
    cardButton.textContent = "Comprar Curso"
    cardButton.addEventListener("click", () => { window.location.href = `../CourseVideoPage/index.html?id=${course.id}` })

    headerCourse.appendChild(courseImage);
    informationKeyContent.appendChild(courseTitle);
    informationKeyContent.appendChild(courseSubTitle);
    informationKeyContent.appendChild(courseAuthor);
    informationKeyContent.appendChild(courseRating);
    courseLanguage.appendChild(iconLanguage);
    courseLanguage.appendChild(nameLanguage);
    informationKeyContent.appendChild(courseLanguage);
    courseCard.appendChild(cardImage);
    courseCard.appendChild(iconPlay);
    courseCard.appendChild(coursePriceContent);
    cardButtonContent.appendChild(cardButton);
    courseCard.appendChild(cardButtonContent)
    headerContent.appendChild(informationKeyContent);
    headerContent.appendChild(courseCard);
    headerCourse.appendChild(headerContent);

    /* Construção da descrição */

    const descriptionContent = document.getElementById("Description");

    const descriptionTitle = document.createElement("h2");
    descriptionTitle.textContent = "Descrição";

    const descriptionText = document.createElement("p");
    descriptionText.textContent = course.descricao;

    /* Construção do conteúdo */

    const courseContent = document.getElementById("courseContent");

    const contentTitle = document.createElement("h2");
    contentTitle.textContent = "Conteudo";

    const contentFrame = document.createElement("div");
    contentFrame.classList.add("Frame");

    const frameHeader = document.createElement("div");
    frameHeader.classList.add("FrameHeader");

    const frameChapter = document.createElement("div");
    frameChapter.classList.add("Chapter");
    frameChapter.innerHTML = `<i class="fa-solid fa-circle-arrow-down"></i><span>INTRODUÇÃO</span>`;

    const contentInfo = document.createElement("div");
    contentInfo.classList.add("ContentInfo");

    const listContent = document.createElement("ul");

    
    //todo: add dynamic form
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
    if (element.style.display === "flex") {
        element.style.display = "none";
    } else {
        element.style.display = "flex";
    }
}
