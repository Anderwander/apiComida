import { getRecipes } from "./menuSaver.js";
import { deleteRecipe } from "./menuSaver.js";

function pedido() {
  const cart = document.getElementById("sectionAside");
  const recipes = getRecipes();
  console.log(recipes);
  const cartList = document.createElement("ul");
  cart.innerHTML = "";
  recipes.forEach((savedRecipe) => {
    const borrar = document.createElement("button");
    const textPlato = document.createElement("p");
    borrar.innerText = "Quitar del pedido";
    borrar.setAttribute("class", "deleteButon");
    let plate = document.createElement("li");
    plate.setAttribute("class", "plateJoder");
    borrar.addEventListener("click", () => {
      deleteRecipe(savedRecipe);
      plate.remove();
    });
    textPlato.innerText = savedRecipe.name;
    plate.appendChild(textPlato);
    plate.appendChild(borrar);
    cartList.appendChild(plate);
  });

  cart.appendChild(cartList);
}

pedido();
