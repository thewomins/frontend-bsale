import {Button} from "../component/button/button";
import {ProductCardWide} from "../component/productCardWide/productCardWide";

const content = document.getElementById("productos");
const resumen = document.getElementById("resumen");

let precio = 0,
  descuento = 0;

const getProductsById = (listIds) => {
  let string = "";
  listIds.map((id) => {
    if (string === "") {
      string += "ids=" + id;
    }
    string += "&ids=" + id;
  });
  //http://127.0.0.1:8000/products/?ids=7&ids=8&ids=9
  return fetch("http://127.0.0.1:8000/products/?" + string)
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

/*
 * AÑADE PRODUCTOS
 */
const carrito = sessionStorage.getItem("carrito").split(",");
console.log(carrito);

const products = await getProductsById(carrito);
console.log(products);

products.map(({name, discount, url_image, price}) => {
  precio += parseInt(price);
  console.log(parseInt(price));
  descuento += parseInt(price) * (parseInt(discount) / 100);
  content.appendChild(
    ProductCardWide({
      nombre: name,
      discount: discount,
      imageUrl: url_image,
      precio: price,
    }),
  );
});

/*
 * AÑADE DATOS EN RESUMEN
 */
const createP = (text) => {
  const precioHTML = document.createElement("p");
  precioHTML.innerHTML = text;
  return precioHTML;
};

resumen.appendChild(Button({text: "Comprar", primary: true}));

const productosPrecio = resumen.getElementsByClassName("productos-precio")[0];
const productosDescuento =
  resumen.getElementsByClassName("descuentos-precio")[0];
const productosTotal = resumen.getElementsByClassName("total-precio")[0];

productosPrecio.appendChild(createP(precio));
productosDescuento.appendChild(createP(descuento));
productosTotal.appendChild(createP(precio - descuento));
