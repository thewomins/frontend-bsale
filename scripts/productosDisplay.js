import {ProductCard} from "../component/productCard/productCard";
import {Button} from "../component/button/button";
import {envP} from "../main";
import notFoundImage from "../assets/not-found.webp";

const getProductsByCategory = async (categoryId) => {
  return fetch(envP.API_URL + `category/${categoryId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

const getProductsByName = async (arg) => {
  return fetch(envP.API_URL + `search/products/${arg}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

const getProductsInRange = async (min, max) => {
  return fetch(envP.API_URL + `products/inrange/${min}-${max}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

//calcula el rango de productos a mostar
const batchToShow = (params, range) => {
  if (params[2] === "pages") {
    params[3] = parseInt(params[3]);
    return {min: range * (params[3] - 1), max: range * params[3]};
  }
  return {min: 0, max: range};
};

//renderiza los componentes en el rango dado
const showInRange = (parent, products, range) => {
  for (
    let index = range.min;
    index < range.max && index < products.length;
    index++
  ) {
    if (products[index].url_image === "") {
      products[index].url_image = notFoundImage;
    }
    const product = ProductCard({
      nombre:
        products[index].name.charAt(0).toUpperCase() +
        products[index].name.slice(1).toLowerCase(),
      precio: products[index].price,
      imageUrl: products[index].url_image,
      discount: products[index].discount,
      onClickButton: () => {
        const carrito = sessionStorage.getItem("carrito");
        if (carrito === null) {
          sessionStorage.setItem("carrito", products[index].id);
        } else {
          sessionStorage.setItem("carrito", carrito + "," + products[index].id);
        }
      },
    });
    parent.appendChild(product);
  }
};

//Genera los botones para la paginacion
const setPages = (maxPages) => {
  const pagesContainer = document.getElementById("pages");
  if (pagesContainer.hasChildNodes) {
    pagesContainer.innerHTML = "";
  }
  for (let index = 1; index <= maxPages; index++) {
    pagesContainer.appendChild(
      Button({
        text: index,
        onClick: () => {
          window.location.hash =
            window.location.hash.split("/pages")[0] + "/pages/" + index;
        },
      }),
    );
  }
};

//Renderiza los objetos en la pagina
const showPage = async (parent) => {
  if (parent.hasChildNodes) {
    parent.innerHTML = "";
  }
  const MAX_PROD_BY_PAGE = 12;
  let maxPages = undefined;
  let params = window.location.hash.split("/");
  let range = batchToShow(params, MAX_PROD_BY_PAGE);

  if (params[0] === "#category") {
    const category = await getProductsByCategory(params[1].split("-")[1]);
    console.log(category);
    maxPages = Math.ceil(category.products.length / 12);
    console.log(params, range, maxPages);
    setPages(maxPages);
    showInRange(parent, category.products, range);
    return;
  }

  if (params[0] === "#search") {
    const products = await getProductsByName(params[1]);
    showInRange(parent, products, range);
    return;
  } else {
    const products = await getProductsInRange(0, MAX_PROD_BY_PAGE);
    showInRange(parent, products, {min: 0, max: MAX_PROD_BY_PAGE});
    return;
  }
};

const productContainer = document.getElementById("products");

//renderiza la pagina 1 si no se ah seleccionado ninguna
showPage(productContainer);

window.addEventListener("hashchange", () => {
  showPage(productContainer);
});
