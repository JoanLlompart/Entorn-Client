document.addEventListener("DOMContentLoaded", async () => {
    const breedsSelect = document.getElementById("breeds");
    const imageElement = document.querySelector("img");
    const navLinks = document.querySelectorAll('nav ul li a');
    const breedListElement = document.getElementById("breedsList");
    const catView = document.getElementById("catView");
    const breedsView = document.getElementById("breedsView");

    const breedsPerPageSelect = document.getElementById("breedsPerPage");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    let currentPage = 1;
    let breedsPerPage = parseInt(breedsPerPageSelect.value);

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            changeContent(targetId);
            window.history.pushState({ page: targetId }, null, `/${targetId}`);
        });
    });

    window.addEventListener('popstate', function (event) {
        const targetId = event.state.page;
        const breedId = event.state.breed_id;
        changeContent(targetId, breedId);
    });

    const routes = {
        "/cat": "cat",
        "/breeds": "breeds",
    };

    async function changeContent(targetId, breedId) {
        if (targetId === "cat") {
            catView.style.display = "block";
            breedsView.style.display = "none";
            if (breedId) {
                selectBreedOption(breedId);
            } else {
                await breedsSelect.dispatchEvent(new Event("change"));
            }
        } else if (targetId === "breeds") {
            catView.style.display = "none";
            breedsView.style.display = "block";
            showBreedsList();
        }
    }

    function selectBreedOption(breedId) {
        const selectedOption = document.querySelector(`#breeds option[value="${breedId}"]`);
        if (selectedOption) {
            selectedOption.selected = true;
            breedsSelect.dispatchEvent(new Event("change"));
        }
    }

    async function showBreedsList() {
        breedListElement.innerHTML = "";

        const responseBreeds = await fetch("https://api.thecatapi.com/v1/breeds");
        const breeds = await responseBreeds.json();

        const startIdx = (currentPage - 1) * breedsPerPage;
        const endIdx = startIdx + breedsPerPage;
        const displayedBreeds = breeds.slice(startIdx, endIdx);

        displayedBreeds.forEach(breed => {
            const breedLink = document.createElement("a");
            breedLink.href = `/cat?breed_id=${breed.id}`;
            breedLink.textContent = breed.name;
            breedLink.addEventListener("click", function (event) {
                event.preventDefault();
                const targetId = routes["/cat"];
                const breedId = this.getAttribute('href').split('=')[1];
                changeContent(targetId, breedId);
                window.history.pushState({ page: targetId, breed_id: breedId }, null, this.getAttribute('href'));
            });

            const breedItem = document.createElement("p");
            breedItem.appendChild(breedLink);
            breedListElement.appendChild(breedItem);
        });

        updatePagination();
    }

    function updatePagination() {
        const totalPages = Math.ceil(breeds.length / breedsPerPage);
        document.getElementById("totalPages").textContent = totalPages;
        document.getElementById("currentPage").textContent = currentPage;

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    breedsPerPageSelect.addEventListener("change", () => {
        breedsPerPage = parseInt(breedsPerPageSelect.value);
        currentPage = 1;
        showBreedsList();
    });

    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showBreedsList();
        }
    });

    nextButton.addEventListener("click", () => {
        const totalPages = Math.ceil(breeds.length / breedsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showBreedsList();
        }
    });

    const responseBreeds = await fetch("https://api.thecatapi.com/v1/breeds");
    const breeds = await responseBreeds.json();

    breeds.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedsSelect.appendChild(option);
    });

    breedsSelect.onchange = async (e) => {
        const breedId = e.target.value;
        const url = new URL(location);

        if (breedId) {
            const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`);
            const body = await response.json();
            imageElement.src = body[0].url;
            url.searchParams.set("breed_id", breedId);
        } else {
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            const body = await response.json();
            imageElement.src = body[0].url;
            url.searchParams.delete("breed_id");
        }

        history.pushState({}, "", url.href);
    };

    breedsSelect.dispatchEvent(new Event("change"));
    showBreedsList();
});