import "../css/style.css";

// Selectors
const cardContainer = document.querySelector(".card-container");
const numberRecipes = document.querySelector(".number-recipes");

let recipesData = [];

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
  return data.recipes;
}

// Filters

/**
 * Updates the text content
 * @param {Array} recipes - An array of recipes objects.
 */
function updateNumberRecipes(recipes) {
  numberRecipes.textContent = `${recipes.length} recettes`;
}

// Cards

/**
 * Display the recipe cards
 */
async function displayRecipes() {
  const recipes = await getRecipes();

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className =
      "card bg-white h-[700px] w-full rounded-xl mb-[50px] mx-auto overflow-hidden";

    const imgRecipe = document.createElement("img");
    imgRecipe.src = `./assets/recipes/${recipe.image}`;
    imgRecipe.alt = recipe.name;
    imgRecipe.classList.add(
      "img-card-recipe",
      "w-full",
      "h-48",
      "object-cover",
      "rounded-t-lg"
    );

    const titleRecipe = document.createElement("h2");
    titleRecipe.textContent = recipe.name;
    titleRecipe.classList.add(
      "font-anton",
      "font-bold",
      "text-[1.2em]",
      "pl-[30px]",
      "pt-[40px]",
      "pb-[40px]"
    );

    const subtitleRecipe = document.createElement("h3");
    subtitleRecipe.textContent = "RECETTE";

    const description = document.createElement("p");
    description.textContent = recipe.description;

    const subtitleIngredient = document.createElement("h3");
    subtitleIngredient.textContent = "INGRÉDIENTS";

    const ingredient = document.createElement("p");
    ingredient.textContent = recipe.ingredients.join(", ");

    card.appendChild(imgRecipe);
    card.appendChild(titleRecipe);
    card.appendChild(subtitleRecipe);
    card.appendChild(description);
    card.appendChild(subtitleIngredient);
    card.appendChild(ingredient);

    cardContainer.appendChild(card);
  });
}

/**
 * Initializes the index page
 */
async function init() {
  try {
    recipesData = await getRecipes();
    updateNumberRecipes(recipesData);
    displayRecipes(recipesData);
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error);
  }
}

init();
