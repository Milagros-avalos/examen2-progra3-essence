const formulario = document.querySelector("#consultarProductoForm");
const mensaje = document.querySelector("#mensaje");
const resultado = document.querySelector("#resultadoProducto");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    resultado.replaceChildren();

    try {
        const id = new FormData(formulario).get("id");
        const respuesta = await fetch(`/api/products/${id}`);
        const datos = await respuesta.json();

        if (!respuesta.ok) throw new Error(datos.message);

        const producto = datos.payload[0];
        const titulo = document.createElement("h2");
        titulo.textContent = producto.nombre;
        const detalles = document.createElement("p");
        detalles.textContent = `ID: ${producto.id} · Precio: $${producto.precio} · Categoría: ${producto.categoria} · Estado: ${producto.estado ? "Activo" : "Inactivo"}`;
        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        imagen.width = 120;

        resultado.append(titulo, detalles, imagen);
        mensaje.textContent = "Producto encontrado.";
    } catch (error) {
        mensaje.textContent = error.message || "No se pudo conectar con el servidor.";
    }
});
