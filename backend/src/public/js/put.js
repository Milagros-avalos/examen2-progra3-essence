const formularioBuscar = document.querySelector("#buscarProductoForm");
const formularioModificar = document.querySelector("#formularioModificar");
const mensaje = document.querySelector("#mensaje");

formularioBuscar.addEventListener("submit", async (event) => {
    event.preventDefault();
    formularioModificar.hidden = true;

    try {
        const id = new FormData(formularioBuscar).get("id");
        const respuesta = await fetch(`/api/products/${id}`);
        const datos = await respuesta.json();

        if (!respuesta.ok) throw new Error(datos.message);

        const producto = datos.payload[0];
        document.querySelector("#idModificar").value = producto.id;
        document.querySelector("#nombreModificar").value = producto.nombre;
        document.querySelector("#precioModificar").value = producto.precio;
        document.querySelector("#categoriaModificar").value = producto.categoria;
        document.querySelector("#imagenModificar").value = producto.imagen;
        document.querySelector("#estadoModificar").value = producto.estado;
        formularioModificar.hidden = false;
        mensaje.textContent = "Producto encontrado. Modificá los datos y guardá.";
    } catch (error) {
        mensaje.textContent = error.message || "No se pudo conectar con el servidor.";
    }
});

formularioModificar.addEventListener("submit", async (event) => {
    event.preventDefault();

    const producto = Object.fromEntries(new FormData(formularioModificar));
    const id = producto.id;
    producto.precio = Number(producto.precio);
    producto.estado = Number(producto.estado);

    try {
        const respuesta = await fetch("/api/products", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        });
        const datos = await respuesta.json();
        mensaje.textContent = respuesta.ok
            ? datos.message
            : [datos.message, ...(datos.errores || [])].join(". ");
    } catch {
        mensaje.textContent = "No se pudo conectar con el servidor.";
    }
});
