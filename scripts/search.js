const buscadorContainer = document.getElementById("search");
const carritoContainer = document.getElementById("carrito");
const icon = buscadorContainer.getElementsByTagName("img")[0];
const input = buscadorContainer.getElementsByTagName("input")[0];

//cambia el hash de la url lo cual inicia el render de productos
icon.addEventListener("click", () => {
  if (window.location.pathname !== "/") {
    window.location.href =
      window.location.origin + "#search/" + input.value.replace(" ", "-");
  } else {
    window.location.hash = "search/" + input.value.replace(" ", "-");
  }
});

carritoContainer.addEventListener("click", () => {
  window.location.href = "../pages/carrito.html";
});
