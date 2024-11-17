document.addEventListener('DOMContentLoaded', () => {

    
    const apiKey = '5afJGtucaoV2lbnJuWGIIgJzuWIHa6IucbEgkbPn'; // Tu API Key
    const dateInput = document.getElementById('date-input');
    const fetchButton = document.getElementById('fetch-button');
    const titleElement = document.getElementById('title');
    const explanationElement = document.getElementById('explanation');
    const imageElement = document.getElementById('image');
    const loadingElement = document.getElementById('loading');

     // Función para obtener datos de la API según la fecha
     async function fetchNasaData(date) {
        try {
            // Mostrar indicador de carga
            loadingElement.style.display = 'block';
            imageElement.style.display = 'none'; // Ocultar imagen hasta que se cargue

            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            updateDOM(data);
        } catch (error) {
            console.error('Hubo un error:', error);
            alert('Por favor, ingrese una fecha posterior al 1995-06-16.');
        } finally {
            // Ocultar indicador de carga
            loadingElement.style.display = 'none';
        }
    }

    // Función para actualizar el DOM con los datos obtenidos
    function updateDOM(data) {
        titleElement.textContent = data.title || 'Sin título';
        explanationElement.textContent = data.explanation || 'Sin descripción disponible.';
        imageElement.src = data.url || '';
        imageElement.alt = 'Imagen no disponible';
        
        // Mostrar la imagen después de cargarla
        if (data.url) {
            imageElement.style.display = 'block';
        }
    }

    // Agregar evento al botón
    fetchButton.addEventListener('click', () => {
        const selectedDate = dateInput.value; // Obtener la fecha ingresada
        if (selectedDate) {
            fetchNasaData(selectedDate); // Llamar a la función con la fecha
        } else {
            alert('Por favor, ingrese una fecha posterior al 1995-06-16.');
        }
    });

});
