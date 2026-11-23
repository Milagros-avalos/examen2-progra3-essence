const formulario = document.querySelector("#eliminarProductoForm");
const mensaje = document.querySelector("#mensaje");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = new FormData(formulario).get("id");

    try {
        const respuesta = await fetch(`/api/products/${id}`, { method: "DELETE" });
        const datos = await respuesta.json();
        mensaje.textContent = datos.message;
        if (respuesta.ok) formulario.reset();
    } catch {
        mensaje.textContent = "No se pudo conectar con el servidor.";
    }
});
