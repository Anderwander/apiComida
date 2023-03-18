import { getRecipes } from "./menuSaver.js";
export function pedido() {
  const cart = document.getElementById("sectionAside");
  const recipes = getRecipes();
  console.log(recipes);
  const cartList = document.createElement("ul");
  cart.innerHTML = "";
  recipes.forEach((object) => {
    let plate = document.createElement("li");
    plate.innerText = object.name;
    cartList.appendChild(plate);
  });
  cart.appendChild(cartList);
}
