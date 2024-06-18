import * as courseCarousel from  "../Components/courseCarousel.js";

const accessToken = localStorage.getItem('token');

if (accessToken) {

    const urlParams = new URLSearchParams(window.location.search);
    const idParameter = urlParams.get('id');

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
    /* Construção da descrição */

    const descriptionContent = document.getElementById("description");
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
