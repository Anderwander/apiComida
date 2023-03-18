export function getRecipes() {
  const recipes = localStorage.getItem("recipes");
  if (recipes === null || recipes === "undefined") {
    return [];
  }
  return JSON.parse(recipes);
}

function saveRecipes(recipes) {
  const recipesJSON = JSON.stringify(recipes);
  localStorage.setItem("recipes", recipesJSON);
}

export function addRecipe(recipe) {
  const recipes = getRecipes();
  if (inList(recipe, recipes) !== -1) {
    return;
  }
  recipes.push(recipe);
  saveRecipes(recipes);
}

function inList(recipe, recipes) {
  let index = recipes.findIndex((element) => element.id === recipe.id);
  return index;
}

export function deleteRecipe(recipe) {
  const recipes = getRecipes();
  let index = inList(recipe, recipes);
  if (index === -1) {
    return;
  }
  recipes.splice(index, 1);
  saveRecipes(recipes);
}

export function deleteMenu() {
  localStorage.clear();
}
