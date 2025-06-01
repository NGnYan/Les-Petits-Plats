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
export function filterRecipes(inputSearchBar, allRecipes) {
  const searchText = inputSearchBar.value.trim().toLowerCase();

  const filteredRecipes = allRecipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchText) ||
      recipe.description.toLowerCase().includes(searchText) ||
      recipe.ingredients.some(
        (ingredient) =>
          ingredient.ingredient.toLowerCase().includes(searchText) &&
          ingredient.quantity != null &&
          ingredient.quantity != undefined
      )
  );
  return filteredRecipes;
}
