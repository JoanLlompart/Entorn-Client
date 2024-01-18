document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            changeContent(targetId);
            window.history.pushState({ page: targetId }, null, `#${targetId}`);
        });
    });

    window.addEventListener('popstate', function (event) {
        const targetId = event.state.page;
        changeContent(targetId);
    });

    function changeContent(targetId) {
        if (targetId === 'home') {
            homeCat.style.display = 'block';
        } else {
            homeCat.style.display = 'none';
        }
        console.log(`Changing content for ${targetId}`);
    }

    const razaSelect = document.getElementById('raza');
    const catImage = document.getElementById('catImage');

    // Hacer una solicitud a la API para obtener la lista de razas de gatos
    fetch('https://api.thecatapi.com/v1/breeds')
        .then(response => response.json())
        .then(data => {
            // Rellenar el menú desplegable con las razas obtenidas
            data.forEach(raza => {
                const option = document.createElement('option');
                option.value = raza.id;
                option.text = raza.name;
                razaSelect.appendChild(option);
            });

            // Seleccionar la primera raza 
            const primeraRazaId = data[0].id;
            mostrarImagen(primeraRazaId);
        });

    // Manejar el evento de cambio de la imagen
    razaSelect.addEventListener('change', function () {
        const selectedRazaId = this.value;
        mostrarImagen(selectedRazaId);
    });

    function mostrarImagen(razaId) {
        fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${razaId}`)
            .then(response => response.json())
            .then(data => {
                // Actualizar la imagen en la página
                if (data.length > 0) {
                    const imageUrl = data[0].url;
                    catImage.src = imageUrl;
                } else {
                    alert('No se encontró ninguna imagen para la raza seleccionada.');
                }
            });
    }
});