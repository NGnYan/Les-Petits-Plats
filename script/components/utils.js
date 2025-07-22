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
 * or in any ingredient that has a defined quantity.
 *
 * @param {HTMLInputElement} inputSearchBar - The input element containing the user's search text.
 * @param {Array} allRecipes - The array of all available recipe objects.
 * @returns {Array} - The filtered array of recipes matching the search text.
 */
export function filterRecipes(
  searchText,
  allRecipes,
  selectedIngredients = [],
  selectedAppliances = [],
  selectedUstensils = []
) {
  const filteredRecipes = [];
  const searchLower = searchText.toLowerCase();
  const nameRecipeLower = recipe.name.toLowerCase();
  const descriptionRecipeLower = recipe.description.toLowerCase();

  for (let i = 0; i < allRecipes.length; i++) {
    const recipe = allRecipes[i];

    const matchesSearch =
      recipe.name.toLowerCase().includes(searchLower) ||
      recipe.description.toLowerCase().includes(searchLower) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(searchLower)
      );

    const selectedIngsLower = [];
    for (let i = 0; i < selectedIngredients.length; i++) {
      selectedIngsLower.push(selectedIngredients[i].toLowerCase());
    }

    const recipeIngredientsLower = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const ing = recipe.ingredients[i];
      recipeIngredientsLower.push(ing.ingredient.toLowerCase());
    }

    const matchesIngredient =
      selectedIngredients.length === 0 ||
      selectedIngsLower.every((selectedIng) =>
        recipeIngredientsLower.includes(selectedIng)
      );

    const selectedAppliancesLower = [];
    for (let i = 0; i < selectedAppliances.length; i++) {
      selectedAppliancesLower.push(selectedAppliances[i].toLowerCase());
    }

    const matchesAppliance =
      selectedAppliances.length === 0 ||
      selectedAppliancesLower.includes(recipe.appliance.toLowerCase());

    const selectedUstensilsLower = [];
    for (let i = 0; i < selectedUstensils.length; i++) {
      selectedUstensilsLower.push(selectedUstensils[i].toLowerCase());
    }

    const matchesUstensil =
      selectedUstensils.length === 0 ||
      recipe.ustensils.some((ustensil) =>
        selectedUstensilsLower.includes(ustensil.toLowerCase())
      );

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
