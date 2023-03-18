import {
  getRecipes as menuGetRecipes,
  addRecipe as menuAddRecipe,
  deleteRecipe as menuDeleteRecipe,
  deleteMenu,
} from "./menuSaver.js";
import { pedido } from "./carrito.js";

function createBaseUrl() {
  let params = new URL(document.location).searchParams;
  let id = params.get("id");
  let url = new URL("https://api.edamam.com/api/recipes/v2/" + id);
  url.searchParams.set("app_id", "562aebeb");
  url.searchParams.set("app_key", "61e02e121e618a4cac467d86a0082d06");
  url.searchParams.set("type", "public");
  return url;
}

async function getRecipes(url) {
  let recipes = await fetch(url.toString())
    .then((response) => response.json())
    .then((hit) => {
      console.log(hit);
      return {
        name: hit.recipe.label,
        image: hit.recipe.image,
        id: hit.recipe.uri.split("_")[1],
        ingredients: hit.recipe.ingredientLines,
        cautions: hit.recipe.cautions,
      };
    });
  return recipes;
}

export async function cardResult() {
  let url = createBaseUrl();
  let recipeSection = document.getElementById("recipeResult");
  recipeSection.innerHTML = "";
  let recipe = await getRecipes(url.href);
  renderRecipe(recipe);
}
function renderRecipeButtons(cautionList, ingredientList) {
  const botonesReceta = document.createElement("div");
  const ingredientsBoton = document.createElement("button");
  const cautionsBoton = document.createElement("button");

  botonesReceta.setAttribute("class", "buttonContainer");

  ingredientsBoton.setAttribute("class", "fa-solid fa-angle-down");
  ingredientsBoton.addEventListener("click", () => {
    ingredientList.classList.toggle("hidden");
  });
  ingredientsBoton.innerText = "Ingredientes";

  cautionsBoton.setAttribute("class", "fa-solid fa-angle-down");
  cautionsBoton.addEventListener("click", () => {
    cautionList.classList.toggle("hidden");
  });
  cautionsBoton.innerText = "Alergias";

  botonesReceta.appendChild(ingredientsBoton);
  botonesReceta.appendChild(cautionsBoton);

  return botonesReceta;
}

function renderRecipe(recipe) {
  const results = document.getElementById("recipeResult");
  const resultModal = document.getElementById("modalObjects");
  const title = document.createElement("h1"); //esto quiero que sea el nombre de la receta: "Receta de "+nombre;
  const recipeArticle = document.createElement("article");
  const recipeIngredients = document.createElement("article");
  const recipeCautions = document.createElement("article");
  const recipeImage = document.createElement("img");
  const ingredientList = document.createElement("ul");
  const cautionList = document.createElement("ul");
  const guardar = document.createElement("button");
  const borrar = document.createElement("button");

  ingredientList.classList.add("hidden");

  recipeArticle.id = recipe.id;
  recipeArticle.setAttribute("data-name", recipe.name);
  recipeArticle.setAttribute("data-image", recipe.image);
  recipeArticle.setAttribute(
    "data-ingredients",
    JSON.stringify(recipe.ingredients)
  );

  recipeArticle.classList.add("recipe");
  title.innerText = recipe.name
    .replace(/\srecipe[s]?/gim, "")
    .replace(/,[s]*/g, ", ");
  recipeImage.setAttribute("src", recipe.image);
  recipeIngredients.setAttribute("id", "ingredients");
  recipeArticle.setAttribute("class", "recipeCard");
  recipeCautions.setAttribute("id", "cautions");
  guardar.setAttribute("id", "botonGuardar");
  borrar.setAttribute("id", "botonBorrar");
  guardar.innerText = "Añadir";
  borrar.innerText = "Quitar del pedido";
  guardar.addEventListener("click", () => {
    menuAddRecipe(recipe);
    pedido();
    document.getElementById("modal").style.display = "none";
  });
  borrar.addEventListener("click", () => {
    menuDeleteRecipe(recipe);
    pedido();
    document.getElementById("modal").style.display = "none";
  });

  recipe.ingredients.forEach((element) => {
    let ingredient = document.createElement("li");
    ingredient.innerText = element.replace("*", "");
    ingredientList.appendChild(ingredient);
  });

  recipe.cautions.forEach((element) => {
    let caution = document.createElement("li");
    caution.innerText = element.toUpperCase();
    cautionList.appendChild(caution);
  });

  const titleModal = title.cloneNode(true);
  const imageModal = recipeImage.cloneNode(true);
  resultModal.appendChild(titleModal);
  resultModal.appendChild(imageModal);
  results.appendChild(recipeArticle);
  recipeArticle.appendChild(title);
  recipeArticle.appendChild(recipeImage);

  const botonesReceta = renderRecipeButtons(cautionList, ingredientList);
  recipeArticle.appendChild(botonesReceta);
  resultModal.appendChild(guardar);
  resultModal.appendChild(borrar);
  recipeIngredients.appendChild(ingredientList);
  recipeCautions.appendChild(cautionList);
  results.appendChild(recipeIngredients);
  results.appendChild(recipeCautions);
}
