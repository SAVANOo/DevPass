document.addEventListener('DOMContentLoaded', () => {
    // Define the API endpoint
    const apiEndpoint = 'http://devpass-backend-production.up.railway.app/api/v1/cursos/cursos';

    // Func. de dar fetch na API
    function fetchCourses() {
        fetch(apiEndpoint)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                displayCourses(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    // Manipulação DOM
    function displayCourses(courses) {
        const videosContainer = document.querySelector('.videos-container');

        // Tirar o que tem no HTML
        videosContainer.innerHTML = '';

        courses.forEach(course => {
            // Criar 1 por 1
            const courseItem = document.createElement('div');
            courseItem.classList.add('course-item');

            /* const courseImg = document.createElement('img');
            courseImg.src = course.thumbnail || 'Src/thumbnail.jpg';
            courseImg.alt = course.title; // Ainda não foi implementado as thumbs na API */

            const courseInfo = document.createElement('div');
            courseInfo.classList.add('course-info');

            const courseTitle = document.createElement('h3');
            courseTitle.textContent = course.titulo;

            const courseInstructor = document.createElement('p');
            courseInstructor.textContent = course.professor;

            const courseRating = document.createElement('p');
            courseRating.textContent = `${course.rating} ★★★★☆`; // Rating fixa; ainda não tem implementação de rating dinâmica na API

            const coursePrice = document.createElement('p');
            coursePrice.textContent = `R$ ${course.preco.toFixed(2)}`;

            // Append elements to course info
            courseInfo.appendChild(courseTitle);
            courseInfo.appendChild(courseInstructor);
            courseInfo.appendChild(courseRating);
            courseInfo.appendChild(coursePrice);

            // Append image and course info to course item
            courseItem.appendChild(courseImg);
            courseItem.appendChild(courseInfo);

            // Append course item to videos container
            videosContainer.appendChild(courseItem);
        });
    }

    // Pegar todos os cursos com o botão de verTudo
    document.querySelector('.verTudo').addEventListener('click', () => {
        fetchCourses();
    });

    // Fetch-ar os cursos
    fetchCourses();
});
