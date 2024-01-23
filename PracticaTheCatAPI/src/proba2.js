document.addEventListener("DOMContentLoaded", async () => {
    const selectBreeds = document.getElementById("breeds");
    const imageElement = document.querySelector("img");
    const navigationLinks = document.querySelectorAll('nav ul li a');
    const breedListElement = document.getElementById("breedsList");
    const catView = document.getElementById("catView");
    const breedsView = document.getElementById("breedsView");

    const breedsPerPageSelect = document.getElementById("breedsPerPage");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    let currentPage = 1;
    let breedsPerPage = parseInt(breedsPerPageSelect.value);

    // Recorre los enlaces de la página para manejar la navegación
    navigationLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            changeContent(targetId);
            // Actualiza el historial del navegador con la nueva URL
            window.history.pushState({ page: targetId }, null, `/${targetId}`);
        });
    });

    // Maneja los cambios en el historial del navegador
    window.addEventListener('popstate', function (event) {
        const targetId = event.state.page;
        const breedId = event.state.breed_id;
        changeContent(targetId, breedId);
    });

    // Defino rutas de las páginas
    const routes = {
        "/cat": "cat",
        "/breeds": "breeds",
    };

    // Cambia el contenido de la vista
    async function changeContent(targetId, breedId) {
        if (targetId === "cat") {
            catView.style.display = "block";
            breedsView.style.display = "none";
            if (breedId) {
                selectBreedOption(breedId);
            } else {
                // Actualiza la vista
                await selectBreeds.dispatchEvent(new Event("change"));
            }
        } else if (targetId === "breeds") {
            catView.style.display = "none";
            breedsView.style.display = "block";
            // Muestra la lista de razas
            showBreedsList();
        }
    }

    // Selecciona una opción en selectBreeds
    function selectBreedOption(breedId) {
        const selectedOption = document.querySelector(`#breeds option[value="${breedId}"]`);
        if (selectedOption) {
            selectedOption.selected = true;
            // Actualiza la imagen directamente
            updateCatImage(breedId);
        }
    }

    // Nueva función para actualizar la imagen directamente
    async function updateCatImage(breedId) {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`);
        const body = await response.json();
        imageElement.src = body[0].url;
    }

    // Muestra la lista de razas
    async function showBreedsList() {
        // Limpia el contenido actual del elemento de la lista de razas
        breedListElement.innerHTML = "";

        // Obtiene la lista completa de razas desde la API
        const responseBreeds = await fetch("https://api.thecatapi.com/v1/breeds");
        const breeds = await responseBreeds.json();

        // Calcula los índices de inicio y fin para mostrar las razas
        const startIdx = (currentPage - 1) * breedsPerPage;
        const endIdx = startIdx + breedsPerPage;
        const displayedBreeds = breeds.slice(startIdx, endIdx);

        // Itera sobre las razas a mostrar y crea enlaces para cada una
        displayedBreeds.forEach(breed => {
            // Crea un enlace <a> para cada raza
            const breedLink = document.createElement("a");
            breedLink.href = `/cat?breed_id=${breed.id}`;
            breedLink.textContent = breed.name;

            // Agrega un evento de clic al enlace para manejar la navegación
            breedLink.addEventListener("click", function (event) {
                event.preventDefault();
                const targetId = routes["/cat"];
                const breedId = this.getAttribute('href').split('=')[1];
                changeContent(targetId, breedId);

                // Actualiza el historial del navegador con la nueva URL
                window.history.pushState({ page: targetId, breed_id: breedId }, null, this.getAttribute('href'));
            });

            // Crea un elemento <p> para contener el enlace de la raza
            const breedItem = document.createElement("p");
            breedItem.appendChild(breedLink);

            breedListElement.appendChild(breedItem);
        });

        // Actualiza la paginación para reflejar los cambios en la lista de razas
        updatePagination();
    }

    // Actualiza los elementos de paginación en la interfaz de usuario
    function updatePagination() {
        const totalPages = Math.ceil(breeds.length / breedsPerPage);
        document.getElementById("totalPages").textContent = totalPages;
        document.getElementById("currentPage").textContent = currentPage;

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    // Escucha el evento de cambio en breedsPerPageSelect
    breedsPerPageSelect.addEventListener("change", () => {
        breedsPerPage = parseInt(breedsPerPageSelect.value);
        currentPage = 1;
        showBreedsList();
    });

    // Escucha el evento de clic en el botón de anterior
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showBreedsList();
        }
    });

    // Escucha el evento de clic en el botón de siguiente
    nextButton.addEventListener("click", () => {
        const totalPages = Math.ceil(breeds.length / breedsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showBreedsList();
        }
    });

    // Obtiene la lista completa de razas al cargar la página
    const responseBreeds = await fetch("https://api.thecatapi.com/v1/breeds");
    const breeds = await responseBreeds.json();

    // Llena el elemento selectBreeds con las opciones de razas
    breeds.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        selectBreeds.appendChild(option);
    });

    // Escucha el evento de cambio en selectBreeds para actualizar la vista
    selectBreeds.onchange = async (e) => {
        const breedId = e.target.value;
        const url = new URL(location);

        // Actualiza la imagen directamente
        updateCatImage(breedId);

        // Actualiza el historial del navegador con la nueva URL
        url.searchParams.set("breed_id", breedId);
        history.pushState({}, "", url.href);
    };

    // Despacha un evento de cambio en selectBreeds al cargar la página para inicializar la vista
    selectBreeds.dispatchEvent(new Event("change"));

    // Muestra la lista de razas al cargar la página
    showBreedsList();
});
