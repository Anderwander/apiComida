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

  console.log(recipes);
  return recipes;
}

async function renderRecipe(url) {
  const recipe = await getRecipes(url);
  console.log(recipe);

  const results = document.getElementById("recipeResult");
  const title = document.createElement("h1"); //esto quiero que sea el nombre de la receta: "Receta de "+nombre;
  const recipeArticle = document.createElement("article");
  const recipeIngredients = document.createElement("article");
  const recipeCautions = document.createElement("article");
  const recipeImage = document.createElement("img");
  const ingredientList = document.createElement("ul");
  const cautionList = document.createElement("ul");

  recipeArticle.classList.add("recipe");
  title.innerText = recipe.name
    .replace(/\srecipe[s]?/gim, "")
    .replace(/,[s]*/g, ", ");
  recipeImage.setAttribute("src", recipe.image);
  recipeIngredients.setAttribute("id", "ingredients");
  recipeCautions.setAttribute("id", "cautions");

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

  results.appendChild(title);
  results.appendChild(recipeArticle);
  recipeArticle.appendChild(title);
  recipeArticle.appendChild(recipeImage);
  recipeIngredients.appendChild(ingredientList);
  recipeCautions.appendChild(cautionList);
  results.appendChild(recipeIngredients);
  results.appendChild(recipeCautions);
}

let url = createBaseUrl();

/* async function resultRecipe() {
  await renderRecipe(url);
}

resultRecipe(); */
renderRecipe(url);
