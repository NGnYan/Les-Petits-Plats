import DOMPurify from "dompurify";

// Selectors
const numberRecipes = document.querySelector(".number-recipes");

/**
 * Updates the numberRecipes text content.
 * @param {Array} recipes - An array of recipes objects.
 */
export function updateNumberRecipes(recipes) {
  numberRecipes.textContent = `${recipes.length} recettes`;
  console.log(numberRecipes.textContent);
}

/**
 * Filters recipes based on search bar input.
 * Matches if the search text is found in the recipe name, description,
 * or in any ingredient.
 *
 * @param {string} searchText - The user's search input.
 * @param {Array} allRecipes - The array of all available recipe objects.
 * @param {Array} selectedIngredients - Selected ingredients (optional).
 * @param {Array} selectedAppliances - Selected appliances (optional).
 * @param {Array} selectedUstensils - Selected utensils (optional).
 * @returns {Array} - Filtered recipes.
 */
export function filterRecipes(
  searchText,
  allRecipes,
  selectedIngredients = [],
  selectedAppliances = [],
  selectedUstensils = []
) {
  const filteredRecipes = [];
  const search = searchText.toLowerCase();

  for (let i = 0; i < allRecipes.length; i++) {
    const recipe = allRecipes[i];

    // Vérifie si le texte recherché est dans le nom, la description ou les ingrédients
    const matchesSearch =
      recipe.name.toLowerCase().includes(search) ||
      recipe.description.toLowerCase().includes(search) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(search)
      );

    // Remplace .map() par une boucle for pour selectedIngredients
    const selectedIngsLower = [];
    for (let j = 0; j < selectedIngredients.length; j++) {
      selectedIngsLower.push(selectedIngredients[j].toLowerCase());
    }

    const recipeIngredientsLower = [];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      recipeIngredientsLower.push(
        recipe.ingredients[j].ingredient.toLowerCase()
      );
    }

    const matchesIngredient =
      selectedIngredients.length === 0 ||
      selectedIngsLower.every((selectedIng) =>
        recipeIngredientsLower.includes(selectedIng)
      );

    // Remplace .map() par boucle for pour selectedAppliances
    const selectedAppliancesLower = [];
    for (let j = 0; j < selectedAppliances.length; j++) {
      selectedAppliancesLower.push(selectedAppliances[j].toLowerCase());
    }

    const matchesAppliance =
      selectedAppliances.length === 0 ||
      selectedAppliancesLower.includes(recipe.appliance.toLowerCase());

    // Remplace .map() par boucle for pour selectedUstensils
    const selectedUstensilsLower = [];
    for (let j = 0; j < selectedUstensils.length; j++) {
      selectedUstensilsLower.push(selectedUstensils[j].toLowerCase());
    }

    const matchesUstensil =
      selectedUstensils.length === 0 ||
      recipe.ustensils.some((ustensil) =>
        selectedUstensilsLower.includes(ustensil.toLowerCase())
      );

    // Si tous les filtres passent, on ajoute la recette
    if (
      matchesSearch &&
      matchesIngredient &&
      matchesAppliance &&
      matchesUstensil
    ) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
}

/**
 * Sanitizes the input string to prevent attacks.
 *
 * @param {string} input - The input string to be sanitized.
 * @returns {string} The sanitized input string with harmful characters removed or escaped.
 */
export function sanitizeInput(input) {
  return DOMPurify.sanitize(input);
}
