export function buildCardCourse(courseList, numItems) {
    console.log(courseList)
    //Adiciona a quantidade de items escolhida para mostrar na tela
    for (let i = 0; i < numItems; i++) {
        const courseListContainer = document.getElementById("courseList");

        const courseItem = document.createElement('div');
        courseItem.classList.add("CourseItem");
        courseItem.id = `course-${courseList[i].id}`;

        courseItem.addEventListener('click', () => {
            let id = courseItem.id.replace("course-", "");
            console.log(id)
            window.location.href = `../CoursePage/Index.html?id=${id}`;
        })

        const courseImage = document.createElement("img");
        courseImage.classList.add("CursoImage")
        courseImage.src = courseList[i].thumb; 
        console.log(courseList[i].thumb)

        const courseTitle = document.createElement("h3");
        courseTitle.classList.add("CursoTitle");
        courseTitle.textContent = courseList[i].titulo;

        const courseAuthor = document.createElement("p");
        courseAuthor.classList.add("CursoAuthor");
        courseAuthor.textContent = courseList[i].professor

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
        });

        const coursePrice = document.createElement("h3");
        coursePrice.classList.add("CursoPrice");

        courseItem.appendChild(courseImage);
        courseItem.appendChild(courseTitle);
        courseItem.appendChild(courseAuthor);
        courseItem.appendChild(courseRating);
        courseItem.appendChild(coursePrice);
        courseListContainer.appendChild(courseItem)
    }
}

export function enableCourseCarousel() {
    const prevBtn = document.getElementById("btnPrevCourse");
    const nextBtn = document.getElementById("btnNextCourse");
    const coursesItems = document.getElementById("courseList");
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
