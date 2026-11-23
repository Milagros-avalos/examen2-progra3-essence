const formulario = document.querySelector("#crearProductoForm");
const mensaje = document.querySelector("#mensaje");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const producto = Object.fromEntries(new FormData(formulario));
    producto.precio = Number(producto.precio);

    try {
        const respuesta = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(producto)
        });
        const resultado = await respuesta.json();

        mensaje.textContent = respuesta.ok
            ? `${resultado.message}. ID: ${resultado.productId}`
            : [resultado.message, ...(resultado.errores || [])].join(". ");

        if (respuesta.ok) formulario.reset();
    } catch {
        mensaje.textContent = "No se pudo conectar con el servidor.";
    }
});
