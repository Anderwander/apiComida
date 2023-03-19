import {
  addRecipe as menuAddRecipe,
  deleteRecipe as menuDeleteRecipe,
} from "./menuSaver.js";

function createBaseUrl() {
  let url = new URL("https://api.edamam.com/api/recipes/v2");
  url.searchParams.set("app_id", "562aebeb");
  url.searchParams.set("app_key", "61e02e121e618a4cac467d86a0082d06");
  url.searchParams.set("type", "public");
  url.searchParams.set("health", "vegan");
  url.searchParams.set("cuisineType", "japanese");
  url.searchParams.set("random", "true");
  return url;
}

async function showStarter() {
  let url = createBaseUrl();
  url.searchParams.append("dishType", "starter");
  await renderRecipe(url, "Starters");
}

async function showMain() {
  let url = createBaseUrl();
  url.searchParams.append("dishType", "Main course");
  await renderRecipe(url, "Main Courses");
}

async function showDessert() {
  let url = createBaseUrl();
  url.searchParams.append("dishType", "desserts");
  await renderRecipe(url, "Desserts");
}

async function showDrinks() {
  let url = createBaseUrl();
  url.searchParams.append("dishType", "Drinks");
  await renderRecipe(url, "Drinks");
}

async function getRecipes(url) {
  let recipes = await fetch(url.toString())
    .then((response) => response.json())
    .then((data) => {
      return data.hits
        .map((hit) => {
          return {
            name: hit.recipe.label,
            image: hit.recipe.image,
            id: hit.recipe.uri.split("_")[1],
          };
        })
        .slice(0, 10);
    });
  return recipes;
}

function createModal(recipeText, recipeImgSource, onSave, linkId) {
  const modal = document.getElementById("modal");
  const resultModal = document.getElementById("modalObjects");
  const guardar = document.getElementById("botonGuardar");

  const modalContent = document.createElement("div");
  const recipeName = document.createElement("h2");
  const recipeImage = document.createElement("img");
  const recipeLink = document.createElement("a");

  recipeName.innerText = recipeText;
  recipeLink.innerText = "Ver receta";
  recipeImage.setAttribute("src", recipeImgSource);
  recipeLink.setAttribute("href", "recipes.html?id=" + linkId);
  modalContent.setAttribute("id", "divWithItems");
  recipeLink.setAttribute("target", "_blank");

  modalContent.appendChild(recipeName);
  modalContent.appendChild(recipeImage);
  modalContent.appendChild(recipeLink);

  const handleModalRemoval = () => {
    modalContent.remove();
    modal.style.display = "none";
  };

  guardar.addEventListener("click", () => {
    onSave();
    handleModalRemoval();
  });

  const span = document.getElementsByClassName("close")[0];
  span.onclick = () => handleModalRemoval();

  resultModal.appendChild(modalContent);
}

async function renderRecipe(url, nombre) {
  const recipes = await getRecipes(url);
  const results = document.getElementById("results");
  const food = document.createElement("section");
  const title = document.createElement("h1");
  title.innerText = nombre;
  food.setAttribute("id", "sectionFood");
  results.appendChild(title);
  results.appendChild(food);

  recipes.forEach((hit) => {
    let recipeArticle = document.createElement("article");
    recipeArticle.style.display = "none";
    let recipeName = document.createElement("h2");
    let recipeImage = document.createElement("img");
    recipeImage.onload = function () {
      recipeArticle.style.display = "block";
    };

    const recipeText = hit.name
      .replace(/\srecipe[s]?/gim, "")
      .replace(/,[s]*/g, ", ");

    recipeArticle.classList.add("recipe");
    recipeName.innerText = recipeText;

    recipeImage.setAttribute("src", hit.image);

    food.appendChild(recipeArticle);

    recipeImage.onclick = function () {
      document.getElementById("modal").style.display = "block";

      const handleAddToCart = () => menuAddRecipe(hit);
      createModal(recipeText, hit.image, handleAddToCart, hit.id);
    };

    recipeArticle.appendChild(recipeImage);
    recipeArticle.appendChild(recipeName);
  });
}

function loading() {
  const loadImage = document.getElementById("loading");
  let logoLoading = document.createElement("img");
  logoLoading.setAttribute("src", "../media/yinYang.gif");
  loadImage.appendChild(logoLoading);
}

function loaded() {
  const endImage = document.getElementById("loading");
  endImage.remove();
}

export async function menu() {
  loading();
  await showStarter();
  await showMain();
  await showDrinks();
  await showDessert();
  loaded();
}
