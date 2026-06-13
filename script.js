const revealElements = document.querySelectorAll(
  '.hero, .timeline-item, .skill-card, .project-card'
);

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }

  });

},{
  threshold:0.15
});

revealElements.forEach((element)=>{
  observer.observe(element);
});
/* PROJECT FILTERING */

const filterButtons =
document.querySelectorAll(".filter-btn");

const cards =
document.querySelectorAll(".gallery-card");

const projectCount =
document.querySelector("#project-count");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
        button.dataset.filter;

        let visibleCount = 0;

        cards.forEach(card => {

            const categories =
            card.dataset.category.split(" ");

            const shouldShow =
            filter === "all" ||
            categories.includes(filter);

            if(shouldShow){

                card.style.display = "block";

                setTimeout(() => {
                    card.classList.remove("hide");
                },50);

                visibleCount++;

            }

            else{

                card.classList.add("hide");

                setTimeout(() => {
                    card.style.display = "none";
                },400);

            }

        });

        projectCount.textContent =
        `Showing ${visibleCount} Project${visibleCount > 1 ? "s" : ""}`;

    });

});
async function loadGithubProjects() {

    try {

        const response =
        await fetch("projects.json");

        const projects =
        await response.json();

        const container =
        document.getElementById(
            "github-projects"
        );

        container.innerHTML = "";

        projects.forEach(project => {

            const card =
            document.createElement("div");

            card.className =
            "gallery-card";

            card.innerHTML = `
                <h3>${project.name}</h3>

                <p>${project.description}</p>

                <a href="${project.url}"
                   target="_blank">
                   View Repository
                </a>
            `;

            container.appendChild(card);

        });

    }

    catch(error){

        console.error(error);

    }

}

loadGithubProjects();
