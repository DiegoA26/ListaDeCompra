const nuevoProductoInput = document.querySelector("#nuevoProducto");
const btnAgregar = document.querySelector("#btnAgregar");
const listaComprasUL = document.querySelector("#listaCompras");
const resumen = document.querySelector("#resumen");

const btnFiltroTodos = document.getElementById("btnFiltroTodos");
const btnFiltroPendientes = document.getElementById("btnFiltroPendientes");
const btnFiltroComprados = document.getElementById("btnFiltroComprados");

let filtroPendientesActivado = false;
let filtroCompradosActivado = false;

// Array que almacena la lista de productos
let listaCompras = [];

// TODO: Función agregarProducto(nombre)
// - Añade { nombre, comprado: false } al array con push
// - Llama a renderizarLista()
// - Devuelve true

btnAgregar.addEventListener("click", () => {
    if (nuevoProductoInput.value != "") {
        console.log("Click Agregar producto " + nuevoProductoInput.value);
        AgregarProducto(nuevoProductoInput.value);
    }
});

function AgregarProducto(nombre) {
    listaCompras.push({ nombre, comprado: false });
    RenderizarLista(listaCompras);
}

function RenderizarLista() {
    listaComprasUL.innerHTML = "";
    let productosPendientes = 0;
    listaCompras.forEach((producto, index) => {
        //Filtros de salida temprana
        //Filtro pendientes
        if (filtroPendientesActivado && producto.comprado == true) {
            return;
        }
        if (filtroCompradosActivado && producto.comprado == false) {
            return;
        }

        let nuevoLi = document.createElement("li");

        if (producto.comprado === true) {
            nuevoLi.classList.add("comprado");
        } else {
            productosPendientes++;
        }

        //BOTON CHEK
        let botonChek = document.createElement("button");
        botonChek.textContent = "Check";
        botonChek.classList.add("btn-check");
        botonChek.addEventListener("click", () => ToggleComprado(index));
        nuevoLi.appendChild(botonChek);

        //TEXTO PRODUCTO
        let nuevoSpan = document.createElement("span");
        nuevoSpan.classList.add("nombre-producto");
        nuevoSpan.textContent = producto.nombre;
        nuevoLi.appendChild(nuevoSpan);

        //BOTON ELIMINAR
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "X";
        botonEliminar.classList.add("btn-eliminar");
        botonEliminar.addEventListener("click", () => EliminarProducto(index));
        nuevoLi.appendChild(botonEliminar);

        listaComprasUL.appendChild(nuevoLi);
    });

    resumen.textContent = `${listaCompras.length} productos (${productosPendientes} pendientes)`;
}

function ToggleComprado(indice) {
    console.log(
        `Click boton comprado del producto ${listaCompras[indice].nombre}`,
    );

    listaCompras[indice].comprado = !listaCompras[indice].comprado;
    RenderizarLista();
}

function EliminarProducto(indice) {
    console.log(
        `Click boton eliminar del producto ${listaCompras[indice].nombre}`,
    );

    listaCompras.splice(indice, 1);
    RenderizarLista();
}

btnFiltroTodos.addEventListener("click", () => {
    //Desactivar visualmente los otros botones
    btnFiltroTodos.classList.add("filtroActivo");
    btnFiltroPendientes.classList.remove("filtroActivo");
    btnFiltroComprados.classList.remove("filtroActivo");

    filtroPendientesActivado = false;
    filtroCompradosActivado = false;

    RenderizarLista();
});

btnFiltroPendientes.addEventListener("click", () => {
    //Desactivar visualmente los otros botones
    btnFiltroTodos.classList.remove("filtroActivo");
    btnFiltroPendientes.classList.add("filtroActivo");
    btnFiltroComprados.classList.remove("filtroActivo");

    filtroPendientesActivado = true;
    filtroCompradosActivado = false;
    RenderizarLista();
});

btnFiltroComprados.addEventListener("click", () => {
    //Desactivar visualmente los otros botones
    btnFiltroTodos.classList.remove("filtroActivo");
    btnFiltroPendientes.classList.remove("filtroActivo");
    btnFiltroComprados.classList.add("filtroActivo");

    filtroPendientesActivado = false;
    filtroCompradosActivado = true;
    RenderizarLista();
});

// TODO: Función toggleComprado(indice)
// - Cambia la propiedad "comprado" del producto en la posición indice
// - Llama a renderizarLista()

// TODO: Función eliminarProducto(indice)
// - Elimina el producto del array con splice(indice, 1)
// - Llama a renderizarLista()

// TODO: Función renderizarLista()
// - Vacía el <ul> (innerHTML = "")
// - Recorre listaCompras con forEach (elemento, indice):
//   - Crea un <li>
//   - Si elemento.comprado === true, añade clase "comprado" al <li>
//   - Crea un <span> con la clase "nombre-producto" y textContent = elemento.nombre
//   - Crea un botón "check" que llame a toggleComprado(indice)
//   - Crea un botón "X" que llame a eliminarProducto(indice)
//   - Añade todo al <li>, y el <li> al <ul>
// - Actualiza #resumen con: "X productos (Y pendientes)"
//   Pista: usa filter para contar los pendientes

// TODO: Event listener para btnAgregar:
//   - Lee el valor del input
//   - Si no está vacío, llama a agregarProducto(valor)
//   - Vacía el input y haz focus

// TODO: Event listener para keydown en el input:
//   - Si la tecla es "Enter", misma acción que btnAgregar

console.log("Inicia");
