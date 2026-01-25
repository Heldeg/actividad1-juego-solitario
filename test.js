// 1. Seleccionamos los elementos del DOM
const item = document.getElementById('item-arrastrable');
const contenedores = document.querySelectorAll('.contenedor');

// 2. Evento cuando EMPIEZA el arrastre
item.addEventListener('dragstart', (ev) => {
    // 'ev' es el objeto de evento que me preguntaste antes
    ev.dataTransfer.setData("text/plain", ev.target.id);
    
    // Opcional: bajar la opacidad para efecto visual
    ev.target.style.opacity = "0.5";
});

// 3. Evento cuando TERMINA el arrastre (opcional)
item.addEventListener('dragend', (ev) => {
    ev.target.style.opacity = "1";
});

// 4. Configurar los contenedores para recibir el objeto
contenedores.forEach(contenedor => {
    
    // Necesario para permitir que algo se suelte aquí
    contenedor.addEventListener('dragover', (ev) => {
        ev.preventDefault();
    });

    // Cuando se suelta el objeto
    contenedor.addEventListener('drop', (ev) => {
        ev.preventDefault();
        
        // Recuperamos el ID que guardamos en la "mochila"
        const idElemento = ev.dataTransfer.getData("text/plain");
        const elementoArrastrado = document.getElementById(idElemento);
        
        // Lo movemos al nuevo contenedor
        ev.target.appendChild(elementoArrastrado);
    });
});