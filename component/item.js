const Item = (text, onClick) => {
  const container = document.createElement("div");
  container.addEventListener("click", onClick);
  container.className = "category-item";
  const texto = document.createElement("p");
  texto.innerHTML = text;

  container.appendChild(texto);
  return container;
};

export {Item};
