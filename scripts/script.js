const ejerciciosPorDia = {
    lunes: ["Press de banca", "Press de Banca Inclinado", "Press militar", "Elevaciones Laterales", "Triceps con Mancuernas", "Triceps con Barra", "Paralelas"],
    martes: ["Remo con Barra", "Dorsales con Mancuernas", "Jalon al Pecho", "Curl de Biceps con Barra", "Biceps con Mancuernas", "Antebrazo"],
    miercoles: ["Sentadillas con Barra", "Zancadas con mancuernas", "Sentadillas frontales", "Peso muerto"],
    jueves: ["Press de banca", "Press de Banca Inclinado", "Press militar", "Elevaciones Laterales", "Triceps con Mancuernas", "Triceps con Barra", "Paralelas"],
    viernes: ["Remo con Barra", "Dorsales con Mancuernas", "Jalon al Pecho", "Curl de Biceps con Barra", "Biceps con Mancuernas", "Antebrazo"],
    sabado: ["Sentadillas con Barra", "Zancadas con mancuernas", "Sentadillas frontales", "Peso muerto"],
    domingo: []
};

function cargarRutina() {
    const usuarioSelect = document.getElementById('usuarios');
    const usuario = usuarioSelect.value;
    const nombreUsuario = usuarioSelect.options[usuarioSelect.selectedIndex].text;

    if (usuario) {
        document.getElementById('rutina').style.display = 'block';
        document.getElementById('nombre-usuario').innerText = nombreUsuario;
    } else {
        document.getElementById('rutina').style.display = 'none';
    }
}

function mostrarEjercicios() {
    const diaSelect = document.getElementById('dias');
    const dia = diaSelect.value;

    if (dia) {
        document.getElementById('ejercicios').style.display = 'block';
        document.getElementById('dia-seleccionado').innerText = dia;
        cargarEjercicios(dia);
    } else {
        document.getElementById('ejercicios').style.display = 'none';
    }
}

function cargarEjercicios(dia) {
    const listaEjercicios = document.getElementById('lista-ejercicios');
    listaEjercicios.innerHTML = '';

    const usuario = document.getElementById('usuarios').value;
    const ejercicios = JSON.parse(localStorage.getItem(`${usuario}-${dia}`)) || [];

    ejercicios.forEach((ejercicio, index) => {
        const li = document.createElement('li');
        li.textContent = `${ejercicio.nombre} - ${ejercicio.series} series de ${ejercicio.repeticiones} repeticiones`;
        listaEjercicios.appendChild(li);
    });
}

function agregarEjercicio() {
    const dia = document.getElementById('dias').value;

    if (!dia) {
        Swal.fire('Selecciona un día', '', 'warning');
        return;
    }

    Swal.fire({
        title: 'Agregar Ejercicio',
        html: `
            <label for="ejercicio">Ejercicio:</label>
            <select id="ejercicio" class="swal2-input">
                ${ejerciciosPorDia[dia].map(ejercicio => `<option value="${ejercicio}">${ejercicio}</option>`).join('')}
            </select>
            <input id="series" class="swal2-input" placeholder="Número de series" type="number">
            <input id="repeticiones" class="swal2-input" placeholder="Número de repeticiones" type="number">
        `,
        focusConfirm: false,
        preConfirm: () => {
            const nombreEjercicio = document.getElementById('ejercicio').value;
            const series = document.getElementById('series').value;
            const repeticiones = document.getElementById('repeticiones').value;

            if (!nombreEjercicio || !series || !repeticiones) {
                Swal.showValidationMessage('Por favor ingresa todos los campos');
                return false;
            }

            return { nombreEjercicio, series, repeticiones };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { nombreEjercicio, series, repeticiones } = result.value;
            const usuario = document.getElementById('usuarios').value;

            const ejercicio = { nombre: nombreEjercicio, series: series, repeticiones: repeticiones };
            const ejercicios = JSON.parse(localStorage.getItem(`${usuario}-${dia}`)) || [];
            ejercicios.push(ejercicio);

            localStorage.setItem(`${usuario}-${dia}`, JSON.stringify(ejercicios));
            cargarEjercicios(dia);
        }
    });
}

// Llamar la función cargarRutina para asegurarse de que el botón de "Agregar Ejercicio" esté visible o no según la selección del usuario
cargarRutina();
