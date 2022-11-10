const ProductCardWide = ({nombre, precio, imageUrl, discount, onClickCard}) => {
  precio = parseInt(precio);
  discount = parseInt(discount);
  console.log(precio, discount);
  const templateInner = `
    <div class="card-wide-container-image">
    <img src="${imageUrl}"/> 
    </div>
    <div class="card-wide-details">
    <p class="card-wide-title">${nombre}</p>
        <div class="card-wide-precio-container">
          <p class="card-wide-value">$${precio}</p>
        </div>
    </div>
  `;

  const container = document.createElement("div");
  container.addEventListener("click", onClickCard);
  container.className = "product-wide-card";
  container.innerHTML = templateInner;

  return container;
};

export {ProductCardWide};
