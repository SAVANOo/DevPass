import * as courseCarousel from  "../Components/courseCarousel.js";
import * as communityCarousel from  "../Components/communityCarousel.js";

const accessToken = localStorage.getItem('token');

if (accessToken) {

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
            let qntItems = 10 //quantidades de cursos na tela        
            courseCarousel.buildCardCourse(data.cursos, qntItems);
            courseCarousel.enableCourseCarousel();
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
        .then(data => { 
            console.log(data[0])
            let qntItems = 10 //Quantidade de comunidades na tela
            communityCarousel.buildCardCommunity(data, qntItems);
            communityCarousel.enableCommunityCarousel();
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            window.location.href = "../LoginPage/Index.html";
        });

} else {
    window.location.href = "../LoginPage/Index.html";
}