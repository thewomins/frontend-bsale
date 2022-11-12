import {Button} from "../button/button";

const ProductCard = ({
  nombre,
  precio,
  imageUrl,
  discount,
  onClickCard,
  onClickButton,
}) => {
  precio = parseInt(precio);
  discount = parseInt(discount);
  const templateInner = `
    <div class="card-container-image">
    <img src="${imageUrl}"/> 
    </div>
    <div class="card-details">
        <p class="card-title">${nombre}</p>
        <div class="card-precio-container">
        </div>
        <div class="divisor"></div>
        <div class="card-button-container"></div>
    </div>
  `;

  const container = document.createElement("div");
  container.addEventListener("click", onClickCard);
  container.className = "product-card";
  container.innerHTML = templateInner;

  const precioContainer = container.getElementsByClassName(
    "card-precio-container",
  )[0];

  /*
   * genera esto
   * <p class="card-value-prev">${valor anterior descuento}</p>
   * <div class="card-value-cont">
   *   <p class="card-value">${valor actual}</p>
   *   <p class="card-discount"> -{descuento aplicado}%</p>
   * </div>
   */
  if (discount > 0) {
    const precioPrev = document.createElement("p");
    const precioActContainer = document.createElement("div");
    const precioText = document.createElement("p");
    const discountText = document.createElement("p");
    precioPrev.className = "card-value-prev";
    precioActContainer.className = "card-value-cont";
    precioText.className = "card-value";
    discountText.className = "card-discount";
    precioPrev.innerHTML = "$" + (precio + precio * (discount / 100));
    precioText.innerHTML = "$" + precio;
    discountText.innerHTML = " -" + discount + "%";
    precioActContainer.appendChild(precioText);
    precioActContainer.appendChild(discountText);
    precioContainer.appendChild(precioPrev);
    precioContainer.appendChild(precioActContainer);
  } else {
    precioContainer.innerHTML = `<p class="card-value">$${precio}</p>`;
  }

  const buttonContainer = container.getElementsByClassName(
    "card-button-container",
  )[0];

  const buy = Button({
    text: "Comprar",
    onClick: (e) => {
      e.stopPropagation();
      onClickButton();
    },
    primary: true,
    withState: true,
    icon: "https://img.icons8.com/material-outlined/24/null/add-shopping-cart.png",
  });

  buttonContainer.appendChild(buy);

  return container;
};

export {ProductCard};
