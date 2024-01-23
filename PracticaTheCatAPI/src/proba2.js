document.addEventListener("DOMContentLoaded", async () => {
    // Se espera a que el DOM esté completamente cargado para ejecutar el código

    // Declaración y asignación de variables para elementos HTML relevantes
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

    // Se añaden event listeners a los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            // Evitar el comportamiento predeterminado del enlace
            event.preventDefault();
            // Obtener el ID de la sección desde el atributo href del enlace
            const targetId = this.getAttribute('href').substring(1);
            // Cambiar el contenido de la página
            changeContent(targetId);
            // Actualizar el historial de navegación
            window.history.pushState({ page: targetId }, null, `/${targetId}`);
        });
    });

    // Event listener para el evento popstate (cambio en el historial de navegación)
    window.addEventListener('popstate', function (event) {
        const targetId = event.state.page;
        const breedId = event.state.breed_id;
        // Cambiar el contenido de la página según la URL actual
        changeContent(targetId, breedId);
    });

    // Rutas definidas para la aplicación
    const routes = {
        "/cat": "cat",
        "/breeds": "breeds",
    };

    // Función para cambiar el contenido de la página según la sección seleccionada
    async function changeContent(targetId, breedId) {
        if (targetId === "cat") {
            catView.style.display = "block";
            breedsView.style.display = "none";
            // Si hay una raza seleccionada, seleccionarla en el selector de razas
            if (breedId) {
                selectBreedOption(breedId);
            } else {
                // Si no hay raza seleccionada, desencadenar el evento de cambio en el selector de razas
                await breedsSelect.dispatchEvent(new Event("change"));
            }
        } else if (targetId === "breeds") {
            catView.style.display = "none";
            breedsView.style.display = "block";
            // Mostrar la lista de razas
            showBreedsList();
        }
    }

    // Función para seleccionar una opción en el selector de razas
    function selectBreedOption(breedId) {
        const selectedOption = document.querySelector(`#breeds option[value="${breedId}"]`);
        if (selectedOption) {
            selectedOption.selected = true;
            // Desencadenar el evento de cambio en el selector de razas
            breedsSelect.dispatchEvent(new Event("change"));
        }
    }

    // Función para mostrar la lista de razas
    async function showBreedsList() {
        // Limpiar la lista de razas actual
        breedListElement.innerHTML = "";

        // Obtener la lista completa de razas desde la API
        const responseBreeds = await fetch("https://api.thecatapi.com/v1/breeds");
        const breeds = await responseBreeds.json();

        // Calcular el índice inicial y final para la paginación
        const startIdx = (currentPage - 1) * breedsPerPage;
        const endIdx = startIdx + breedsPerPage;
        // Obtener las razas que se mostrarán en la página actual
        const displayedBreeds = breeds.slice(startIdx, endIdx);

        // Crear elementos HTML para cada raza y añadirlos a la lista
        displayedBreeds.forEach(breed => {
            const breedLink = document.createElement("a");
            breedLink.href = `/cat?breed_id=${breed.id}`;
            breedLink.textContent = breed.name;
            // Event listener para el clic en la raza
            breedLink.addEventListener("click", function (event) {
                event.preventDefault();
                const targetId = routes["/cat"];
                const breedId = this.getAttribute('href').split('=')[1];
                // Cambiar el contenido de la página al hacer clic en una raza
                changeContent(targetId, breedId);
                // Actualizar el historial de navegación
                window.history.pushState({ page: targetId, breed_id: breedId }, null, this.getAttribute('href'));
            });

            const breedItem = document.createElement("p");
            breedItem.appendChild(breedLink);
            breedListElement.appendChild(breedItem);
        });

        // Actualizar la información de paginación
        updatePagination();
    }

    // Función para actualizar la información de paginación en la interfaz de usuario
    function updatePagination() {
        const totalPages = Math.ceil(breeds.length / breedsPerPage);
        // Actualizar el texto que muestra el número total de páginas
        document.getElementById("totalPages").textContent = totalPages;
        // Actualizar el número de página actual
        document.getElementById("currentPage").textContent = currentPage;

        // Deshabilitar botones de página previa y siguiente según la posición actual
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    // Event listener para cambios en la cantidad de razas por página
    breedsPerPageSelect.addEventListener("change", () => {
        breedsPerPage = parseInt(breedsPerPageSelect.value);
        currentPage = 1;
        // Mostrar la lista de razas actualizada
        showBreedsList();
    });

    // Event listener para el botón de página previa
    prevButton.addEventListener("click", () => {
        // Cambiar a la página anterior si no estamos en la primera página
        if (currentPage > 1) {
            currentPage--;
            // Mostrar la lista de razas actualizada
            showBreedsList();
        }
    });

    // Event listener para el botón de página siguiente
    nextButton.addEventListener("click", () => {
        const totalPages = Math.ceil(breeds.length / breedsPerPage);
        // Cambiar a la página siguiente si no estamos en la última página
        if (currentPage < totalPages) {
            currentPage++;
            // Mostrar la lista de razas actualizada
            showBreedsList();
        }
    });

    // Obtener la lista completa de razas desde la API y agregar opciones al selector de razas
    const responseBreeds = await fetch("https://api.thecatapi.com/v1/breeds");
    const breeds = await responseBreeds.json();

    breeds.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedsSelect.appendChild(option);
    });

    // Event listener para cambios en la selección del selector de razas
    breedsSelect.onchange = async (e) => {
        const breedId = e.target.value;
        const url = new URL(location);

        if (breedId) {
            // Obtener una imagen aleatoria de la raza seleccionada desde la API
            const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`);
            const body = await response.json();
            // Mostrar la imagen en la página
            imageElement.src = body[0].url;
            // Actualizar la URL con el parámetro de la raza seleccionada
            url.searchParams.set("breed_id", breedId);
        } else {
            // Obtener una imagen aleatoria de cualquier raza desde la API
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            const body = await response.json();
            // Mostrar la imagen en la página
            imageElement.src = body[0].url;
            // Eliminar el parámetro de la raza seleccionada de la URL
            url.searchParams.delete("breed_id");
        }

        // Actualizar el historial de navegación
        history.pushState({}, "", url.href);
    };

    // Desencadenar manualmente el evento de cambio en el selector de razas al cargar la página
    breedsSelect.dispatchEvent(new Event("change"));
    // Mostrar la lista de razas al cargar la página
    showBreedsList();
});
