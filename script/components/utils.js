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
 * @param {Array} selectedIngredients - Selected ingredients.
 * @param {Array} selectedAppliances - Selected appliances.
 * @param {Array} selectedUstensils - Selected utensils.
 * @returns {Array} - Filtered recipes.
 */
export function filterRecipes(
  searchText,
  allRecipes,
  selectedIngredients = [],
  selectedAppliances = [],
  selectedUstensils = []
) {
  const search = searchText.toLowerCase();

  const selectedIngsLower = selectedIngredients.map((ing) => ing.toLowerCase());
  const selectedAppliancesLower = selectedAppliances.map((app) =>
    app.toLowerCase()
  );
  const selectedUstensilsLower = selectedUstensils.map((ust) =>
    ust.toLowerCase()
  );

  return allRecipes.filter((recipe) => {
    const recipeIngredientsLower = recipe.ingredients.map((ing) =>
      ing.ingredient.toLowerCase()
    );

    const matchesSearch =
      recipe.name.toLowerCase().includes(search) ||
      recipe.description.toLowerCase().includes(search) ||
      recipeIngredientsLower.some((ing) => ing.includes(search));

    const matchesIngredient =
      selectedIngsLower.length === 0 ||
      selectedIngsLower.every((selectedIng) =>
        recipeIngredientsLower.includes(selectedIng)
      );

    const matchesAppliance =
      selectedAppliancesLower.length === 0 ||
      selectedAppliancesLower.includes(recipe.appliance.toLowerCase());

    const matchesUstensil =
      selectedUstensilsLower.length === 0 ||
      recipe.ustensils.some((ustensil) =>
        selectedUstensilsLower.includes(ustensil.toLowerCase())
      );

    return (
      matchesSearch && matchesIngredient && matchesAppliance && matchesUstensil
    );
  });
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
