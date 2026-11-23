const formulario = document.querySelector("#crearUsuarioForm");
const mensaje = document.querySelector("#mensaje");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const respuesta = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(formulario)))
        });
        const datos = await respuesta.json();
        mensaje.textContent = respuesta.ok
            ? datos.message
            : [datos.message, ...(datos.errores || [])].join(". ");
        if (respuesta.ok) formulario.reset();
    } catch {
        mensaje.textContent = "No se pudo conectar con el servidor.";
    }
});
