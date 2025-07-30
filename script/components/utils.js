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

  // InputSearch
  for (let i = 0; i < allRecipes.length; i++) {
    const recipe = allRecipes[i];

    let matchesSearch = false;

    const nameLower = recipe.name.toLowerCase();
    for (let j = 0; j <= nameLower.length - searchLower.length; j++) {
      let match = true;
      for (let k = 0; k < searchLower.length; k++) {
        if (nameLower[j + k] !== searchLower[k]) {
          match = false;
          break;
        }
      }
      if (match) {
        matchesSearch = true;
        break;
      }
    }

    if (!matchesSearch) {
      const descriptionLower = recipe.description.toLowerCase();
      for (let j = 0; j <= descriptionLower.length - searchLower.length; j++) {
        let match = true;
        for (let k = 0; k < searchLower.length; k++) {
          if (descriptionLower[j + k] !== searchLower[k]) {
            match = false;
            break;
          }
        }
        if (match) {
          matchesSearch = true;
          break;
        }
      }
    }

    if (!matchesSearch) {
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredientLower = recipe.ingredients[j].ingredient.toLowerCase();
        for (let k = 0; k <= ingredientLower.length - searchLower.length; k++) {
          let match = true;
          for (let l = 0; l < searchLower.length; l++) {
            if (ingredientLower[k + l] !== searchLower[l]) {
              match = false;
              break;
            }
          }
          if (match) {
            matchesSearch = true;
            break;
          }
        }
        if (matchesSearch) break;
      }
    }

    // Dropdown ingredient
    const selectedIngsLower = [];
    for (let j = 0; j < selectedIngredients.length; j++) {
      selectedIngsLower.push(selectedIngredients[j].toLowerCase());
    }

    const recipeIngredientsLower = [];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ing = recipe.ingredients[j];
      recipeIngredientsLower.push(ing.ingredient.toLowerCase());
    }

    const matchesIngredient =
      selectedIngredients.length === 0 ||
      selectedIngsLower.every((selectedIng) => {
        let foundIngredient = false;

        for (let j = 0; j < recipeIngredientsLower.length; j++) {
          const recipeIngredient = recipeIngredientsLower[j];

          if (recipeIngredient.length !== selectedIng.length) continue;

          let match = true;
          for (let k = 0; k < selectedIng.length; k++) {
            if (recipeIngredient[k] !== selectedIng[k]) {
              match = false;
              break;
            }
          }

          if (match) {
            foundIngredient = true;
            break;
          }
        }

        return foundIngredient;
      });

    // Dropdown appliance
    const selectedAppliancesLower = [];
    for (let j = 0; j < selectedAppliances.length; j++) {
      selectedAppliancesLower.push(selectedAppliances[j].toLowerCase());
    }

    let matchesAppliance = selectedAppliances.length === 0;

    if (!matchesAppliance) {
      const applianceLower = recipe.appliance.toLowerCase();

      for (let j = 0; j < selectedAppliancesLower.length; j++) {
        const selected = selectedAppliancesLower[j];

        if (selected.length !== applianceLower.length) continue;

        let match = true;
        for (let k = 0; k < selected.length; k++) {
          if (selected[k] !== applianceLower[k]) {
            match = false;
            break;
          }
        }

        if (match) {
          matchesAppliance = true;
          break;
        }
      }
    }

    // Dropdown ustensil
    const selectedUstensilsLower = [];
    for (let j = 0; j < selectedUstensils.length; j++) {
      selectedUstensilsLower.push(selectedUstensils[j].toLowerCase());
    }

    let matchesUstensil = selectedUstensils.length === 0;

    if (!matchesUstensil) {
      for (let j = 0; j < recipe.ustensils.length; j++) {
        const ustensilLower = recipe.ustensils[j].toLowerCase();

        for (let k = 0; k < selectedUstensilsLower.length; k++) {
          const selected = selectedUstensilsLower[k];

          if (selected.length !== ustensilLower.length) continue;

          let match = true;
          for (let l = 0; l < selected.length; l++) {
            if (selected[l] !== ustensilLower[l]) {
              match = false;
              break;
            }
          }

          if (match) {
            matchesUstensil = true;
            break;
          }
        }

        if (matchesUstensil) break;
      }
    }

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
