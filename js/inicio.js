let url = createBaseUrl();

//url.searchParams.append("health","plant-based")

function createBaseUrl() {
  let url = new URL("https://api.edamam.com/api/recipes/v2");
  url.searchParams.set("app_id", "562aebeb");
  url.searchParams.set("app_key", "61e02e121e618a4cac467d86a0082d06");
  url.searchParams.set("type", "public");
  url.searchParams.set("health", "vegan");
  url.searchParams.set("cuisineType", "japanese");
  return url;
}

async function getRecipes() {
  let recipes = await fetch(url.toString())
    .then((response) => response.json())
    .then((data) => {
      return data.hits.map((recipe) => {
        return {
          name: recipe.recipe.label,
          image: recipe.recipe.image,
          id: recipe.recipe.uri.split("_")[1],
        };
      });
    });
  return recipes;
}

async function renderRecipe() {
  const recetas = await getRecipes();
  const results = document.getElementById("results");
  results.innerHTML = "";
  recetas.forEach((recetas) => {
    let recipeArticle = document.createElement("article");
    recipeArticle.classList.add("recipe");
    let recipeName = document.createElement("h2");
    recipeName.innerText =
      "Vegan " + recetas.name.replace(/\srecipe[s]?/gim, "");
    let recipeImage = document.createElement("img");
    recipeImage.setAttribute("src", recetas.image);
    recipeArticle.appendChild(recipeName);
    recipeArticle.appendChild(recipeImage);
    results.appendChild(recipeArticle);
  });
}

async function showRecipe() {
  let receta = await renderRecipe();
}
showRecipe();
