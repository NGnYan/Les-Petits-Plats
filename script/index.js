import "../css/style.css";

// Class

const subtitleClassCard = ["text-[#ababab]", "pl-[30px]", "pt-[30px]"];

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
      "card relative bg-white h-full w-full rounded-2xl mb-[50px] mx-auto overflow-hidden";

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
      "pt-[40px]"
    );

    const subtitleRecipe = document.createElement("h3");
    subtitleRecipe.textContent = "RECETTE";
    subtitleRecipe.classList.add(...subtitleClassCard);

    const description = document.createElement("p");
    description.textContent = recipe.description;
    description.classList.add(
      "text-[0.9em]",
      "pl-[30px]",
      "pt-[20px]",
      "pr-[30px]"
    );

    const subtitleIngredient = document.createElement("h3");
    subtitleIngredient.textContent = "INGRÉDIENTS";
    subtitleIngredient.classList.add(...subtitleClassCard);

    const ingredients = document.createElement("ul");
    ingredients.classList.add(
      "grid",
      "grid-cols-2",
      "gap-x-[50px]",
      "gap-y-[20px]",
      "text-sm",
      "ml-[30px]",
      "mr-[30px]"
    );

    // Display ingredient, quantity and unit in the card
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.classList.add("flex", "flex-col", "gap-[5px]", "pt-[20px]");

      const ingredientName = document.createElement("span");
      ingredientName.textContent = ingredient.ingredient;

      const ingredientQuantity = document.createElement("span");
      if (ingredient.quantity) {
        ingredientQuantity.textContent = ` ${ingredient.quantity}`;
        if (ingredient.unit) {
          ingredientQuantity.textContent += ` ${ingredient.unit}`;
        }
        ingredientQuantity.classList.add("text-[#ababab]");
      }

      li.appendChild(ingredientName);
      li.appendChild(ingredientQuantity);
      ingredients.appendChild(li);
    });

    const boxTime = document.createElement("div");
    boxTime.textContent = `${recipe.time} min`;
    boxTime.classList.add(
      "bg-[#FFD15B]",
      "absolute",
      "w-200px",
      "py-[5px]",
      "px-[15px]",
      "rounded-[100px]",
      "top-2",
      "right-2"
    );

    card.appendChild(imgRecipe);
    card.appendChild(titleRecipe);
    card.appendChild(subtitleRecipe);
    card.appendChild(description);
    card.appendChild(subtitleIngredient);
    card.appendChild(ingredients);
    card.appendChild(boxTime);

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
