import {Item} from "../component/item";
import {envP} from "../main";

const getCategories = async () => {
  const response = await fetch(envP.API_URL + "categories-only")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
  return response;
};

const categories = await getCategories();
const itemContainer = document.getElementById("items-container");

categories.map((category) => {
  itemContainer.appendChild(
    Item(
      category.name.charAt(0).toUpperCase() +
        category.name.slice(1).toLowerCase(),
      () => {
        window.location.hash = "category/" + category.name + "-" + category.id;
      },
    ),
  );
});
