function createBaseUrl() {
  let url = new URL("https://api.edamam.com/api/recipes/v2");
  url.searchParams.set("app_id", "562aebeb");
  url.searchParams.set("app_key", "61e02e121e618a4cac467d86a0082d06");
  url.searchParams.set("type", "public");
  url.searchParams.set("health", "vegan");
  url.searchParams.set("cuisineType", "japanese");
  url.searchParams.set("random", "true");
  url.searchParams.set("limit", "5");
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
            //ingredients: hit.recipe.ingredients,
          };
        })
        .slice(0, 10);
    });
  console.log(recipes);
  return recipes;
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

    recipeArticle.classList.add("recipe");
    recipeName.innerText = hit.name
      .replace(/\srecipe[s]?/gim, "")
      .replace(/,[s]*/g, ", ");
    recipeImage.setAttribute("src", hit.image);

    food.appendChild(recipeArticle);
    recipeArticle.appendChild(recipeName);
    recipeArticle.appendChild(recipeImage);
  });
}

async function menu() {
  await showStarter();
  await showMain();
  await showDrinks();
  await showDessert();
}

menu();
