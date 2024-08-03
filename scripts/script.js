// Cargar SweetAlert
function loadSweetAlert() {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    script.onload = () => console.log("SweetAlert2 loaded!");
    document.head.appendChild(script);
}

loadSweetAlert();

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
        li.textContent = `${ejercicio.nombre} - ${ejercicio.repeticiones} repeticiones`;
        listaEjercicios.appendChild(li);
    });
}

function agregarEjercicio() {
    Swal.fire({
        title: 'Agregar Ejercicio',
        html:
            '<input id="nombre-ejercicio" class="swal2-input" placeholder="Nombre del ejercicio">' +
            '<input id="repeticiones" class="swal2-input" placeholder="Número de repeticiones" type="number">',
        focusConfirm: false,
        preConfirm: () => {
            const nombreEjercicio = document.getElementById('nombre-ejercicio').value;
            const repeticiones = document.getElementById('repeticiones').value;

            if (!nombreEjercicio || !repeticiones) {
                Swal.showValidationMessage(`Por favor ingresa ambos campos`);
                return false;
            }

            return { nombreEjercicio, repeticiones };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { nombreEjercicio, repeticiones } = result.value;
            const dia = document.getElementById('dias').value;
            const usuario = document.getElementById('usuarios').value;

            const ejercicio = { nombre: nombreEjercicio, repeticiones: repeticiones };
            const ejercicios = JSON.parse(localStorage.getItem(`${usuario}-${dia}`)) || [];
            ejercicios.push(ejercicio);

            localStorage.setItem(`${usuario}-${dia}`, JSON.stringify(ejercicios));
            cargarEjercicios(dia);
        }
    });
}
