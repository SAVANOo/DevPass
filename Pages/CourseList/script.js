const accessToken = localStorage.getItem("token");
if (!accessToken) window.location.href = "../LoginPage/Index.html";

document.addEventListener("DOMContentLoaded", () => {
    function fetchCourses() {
        fetch(`${baseUrl}/cursos/cursos`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .then((data) => {
                console.log(data.cursos);
                displayCourses(data.cursos);
                displayCourses2(data.cursos);
                displayCourses3(data.cursos);
                displayCourses4(data.cursos);
            })
            .catch((error) => {
                throw new Error(error.message);
            });
    }

    function renderStars(rating) {
        let stars = "";
        for (let i = 0; i < rating; i++) {
            stars += "★"; // Estrelinha cheia
        }
        for (let i = rating; i < 5; i++) {
            stars += "☆"; // Estrelinha vazia
        }
        return stars;
    }

    function displayCourses(courseList) {
        const videosContainer = document.querySelector("#videos-container1");

        videosContainer.innerHTML = "";

        courseList.map((course) => {
            const courseItem = document.createElement("div");
            courseItem.classList.add("course-item");

            const courseInfoContainer = document.createElement("div");
            courseInfoContainer.classList.add("course-info");

            const courseThumb = document.createElement("img");
            courseThumb.src = course.thumb;

            const courseTitle = document.createElement("h3");
            courseTitle.textContent = course.titulo;

            const courseInstructor = document.createElement("p");
            courseInstructor.textContent = course.professor;

            const courseRating = document.createElement("p");
            courseRating.innerHTML = renderStars(course.rating);

            const coursePrice = document.createElement("p");
            coursePrice.textContent = `R$ ${course.preco.toFixed(2)}`;

            courseInfoContainer.appendChild(courseThumb);
            courseInfoContainer.appendChild(courseTitle);
            courseInfoContainer.appendChild(courseInstructor);
            courseInfoContainer.appendChild(courseRating);
            courseInfoContainer.appendChild(coursePrice);

            courseItem.appendChild(courseInfoContainer);

            videosContainer.appendChild(courseItem);
        });
    }

    function displayCourses2(courseList) {
        const videosContainer2 = document.querySelector("#videos-container2");

        videosContainer2.innerHTML = "";

        courseList.map((course) => {
            const courseItem = document.createElement("div");
            courseItem.classList.add("course-item");

            const courseInfoContainer = document.createElement("div");
            courseInfoContainer.classList.add("course-info");

            const courseThumb = document.createElement("img");
            courseThumb.src = course.thumb;

            const courseTitle = document.createElement("h3");
            courseTitle.textContent = course.titulo;

            const courseInstructor = document.createElement("p");
            courseInstructor.textContent = course.professor;

            const courseRating = document.createElement("p");
            courseRating.innerHTML = renderStars(course.rating);

            const coursePrice = document.createElement("p");
            coursePrice.textContent = `R$ ${course.preco.toFixed(2)}`;

            courseInfoContainer.appendChild(courseThumb);
            courseInfoContainer.appendChild(courseTitle);
            courseInfoContainer.appendChild(courseInstructor);
            courseInfoContainer.appendChild(courseRating);
            courseInfoContainer.appendChild(coursePrice);

            courseItem.appendChild(courseInfoContainer);

            videosContainer2.appendChild(courseItem);
        });
    }

    function displayCourses3(courseList) {
        const videosContainer3 = document.querySelector("#videos-container3");

        videosContainer3.innerHTML = "";

        courseList.map((course) => {
            const courseItem = document.createElement("div");
            courseItem.classList.add("course-item");

            const courseInfoContainer = document.createElement("div");
            courseInfoContainer.classList.add("course-info");

            const courseThumb = document.createElement("img");
            courseThumb.src = course.thumb;

            const courseTitle = document.createElement("h3");
            courseTitle.textContent = course.titulo;

            const courseInstructor = document.createElement("p");
            courseInstructor.textContent = course.professor;

            const courseRating = document.createElement("p");
            courseRating.innerHTML = renderStars(course.rating);

            const coursePrice = document.createElement("p");
            coursePrice.textContent = `R$ ${course.preco.toFixed(2)}`;

            courseInfoContainer.appendChild(courseThumb);
            courseInfoContainer.appendChild(courseTitle);
            courseInfoContainer.appendChild(courseInstructor);
            courseInfoContainer.appendChild(courseRating);
            courseInfoContainer.appendChild(coursePrice);

            courseItem.appendChild(courseInfoContainer);

            videosContainer3.appendChild(courseItem);
        });
    }

    function displayCourses4(courseList) {
        const videosContainer4 = document.querySelector("#videos-container4");

        videosContainer4.innerHTML = "";

        courseList.map((course) => {
            const courseItem = document.createElement("div");
            courseItem.classList.add("course-item");

            const courseInfoContainer = document.createElement("div");
            courseInfoContainer.classList.add("course-info");

            const courseThumb = document.createElement("img");
            courseThumb.src = course.thumb;

            const courseTitle = document.createElement("h3");
            courseTitle.textContent = course.titulo;

            const courseInstructor = document.createElement("p");
            courseInstructor.textContent = course.professor;

            const courseRating = document.createElement("p");
            courseRating.innerHTML = renderStars(course.rating);

            const coursePrice = document.createElement("p");
            coursePrice.textContent = `R$ ${course.preco.toFixed(2)}`;

            courseInfoContainer.appendChild(courseThumb);
            courseInfoContainer.appendChild(courseTitle);
            courseInfoContainer.appendChild(courseInstructor);
            courseInfoContainer.appendChild(courseRating);
            courseInfoContainer.appendChild(coursePrice);

            courseItem.appendChild(courseInfoContainer);

            videosContainer4.appendChild(courseItem);
        });
    }

    fetchCourses();

    // Função para adicionar eventos de clique para as setinhas
    function addScrollEvent(selector, direction) {
        const buttons = document.querySelectorAll(selector);
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const containerId = button.getAttribute("data-container");
                const videosContainer = document.getElementById(containerId);
                const scrollAmount = direction === "right" ? 300 : -300;
                videosContainer.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                });
            });
        });
    }

    addScrollEvent(".scroll-button.right", "right");
    addScrollEvent(".scroll-button.left", "left");
});
