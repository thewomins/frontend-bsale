import {Item} from "../component/item";

const getCategories = async () => {
  const response = await fetch("http://127.0.0.1:8000/categories-only")
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

/*

const a = Item("epep", () => {
  history.pushState(null, "epep", "epep");
});
const b = Item("epe3333p", () => {
  history.pushState(null, "epe3333p", "epe3333p");
});
itemContainer.appendChild(a);
itemContainer.appendChild(b);
*/
