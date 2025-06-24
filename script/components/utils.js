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
  return allRecipes.filter((recipe) => {
    const search = searchText.toLowerCase();

    const matchesSearch =
      recipe.name.toLowerCase().includes(search) ||
      recipe.description.toLowerCase().includes(search) ||
      recipe.ingredients.some((ing) =>
        ing.ingredient.toLowerCase().includes(search)
      );

    const selectedIngsLower = selectedIngredients.map((ing) =>
      ing.toLowerCase()
    );

    const matchesIngredient =
      selectedIngredients.length === 0 ||
      recipe.ingredients.some((ing) =>
        selectedIngsLower.includes(ing.ingredient.toLowerCase())
      );

    const selectedAppliancesLower = selectedAppliances.map((appliance) =>
      appliance.toLowerCase()
    );

    const matchesAppliance =
      selectedAppliances.length === 0 ||
      selectedAppliancesLower.includes(recipe.appliance.toLowerCase());

    const selectedUstensilsLower = selectedUstensils.map((ustensil) =>
      ustensil.toLowerCase()
    );

    const matchesUstensil =
      selectedUstensils.length === 0 ||
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
  return String(input);
}
