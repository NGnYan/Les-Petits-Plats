import "../css/style.css";

// Selectors
const cardContainer = document.querySelector(".card-container");

/**
 * API call to fetch
 * @returns {Promise<Object>} JSON data of the recipes.
 */
async function getRecipes() {
  const response = await fetch("/data/recipes.json");
  if (!response.ok) {
    throw new Error(`Erreur ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// Filters

// Cards
async function displayRecipes() {
  const recipes = await getRecipes();

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "card bg-white h-[450px] w-[300px] rounded-lg mb-[50px]";

    const img = document.createElement("img");
    img.src = recipe.image;
    img.alt = recipe.name;

    const title = document.createElement("h2");
    title.textContent = recipe.name;

    const subtitleRecipe = document.createElement("h3");
    subtitleRecipe.textContent = "RECETTE";

    const description = document.createElement("p");
    description.textContent = recipe.description;

    const subtitleIngredient = document.createElement("h3");
    subtitleIngredient.textContent = "INGRÉDIENTS";

    const ingredient = document.createElement("p");
    ingredient.textContent = recipe.ingredients;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(subtitleRecipe);
    card.appendChild(description);
    card.appendChild(subtitleIngredient);
    card.appendChild(ingredient);

    cardContainer.appendChild(card);
  });
}

displayRecipes();
