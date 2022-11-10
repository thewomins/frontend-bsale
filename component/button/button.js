const Button = ({
  text,
  onClick,
  primary = false,
  icon = undefined,
  withState = false,
}) => {
  const container = document.createElement("div");
  const state = document.createElement("div");
  state.className = "button-state";
  container.className =
    "button " + (primary ? "button-primary" : "button-secondary");
  container.addEventListener("click", (e) => onClick(e));
  const texto = document.createElement("p");
  texto.innerHTML = text;
  if (icon !== undefined) {
    const icono = document.createElement("img");
    icono.src = icon;

    container.appendChild(icono);
  }

  //para la animacion al añadir al carro
  if (withState) {
    container.addEventListener("click", function () {
      state.classList.add("button-state-active");
    });
    state.addEventListener("animationend", function () {
      state.classList.remove("button-state-active");
    });

    state.innerHTML = `
    <svg class="animated-check" viewBox="0 0 24 24">
      <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" /> </svg>
    </div>`;

    container.appendChild(state);
  }

  container.appendChild(texto);
  return container;
};

export {Button};
