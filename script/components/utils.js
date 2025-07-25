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
    for (let i = 0; i <= nameLower.length - searchLower.length; i++) {
      let match = true;
      for (let j = 0; j < searchLower.length; j++) {
        if (nameLower[i + j] !== searchLower[j]) {
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
      for (let i = 0; i <= descriptionLower.length - searchLower.length; i++) {
        let match = true;
        for (let j = 0; j < searchLower.length; j++) {
          if (descriptionLower[i + j] !== searchLower[j]) {
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
      for (let i = 0; i < recipe.ingredients.length; i++) {
        const ingredientLower = recipe.ingredients[i].ingredient.toLowerCase();
        for (let k = 0; k <= ingredientLower.length - searchLower.length; k++) {
          let match = true;
          for (let j = 0; j < searchLower.length; j++) {
            if (ingredientLower[k + j] !== searchLower[j]) {
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

    const selectedIngsLower = [];
    for (let i = 0; i < selectedIngredients.length; i++) {
      selectedIngsLower.push(selectedIngredients[i].toLowerCase());
    }

    const recipeIngredientsLower = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const ing = recipe.ingredients[i];
      recipeIngredientsLower.push(ing.ingredient.toLowerCase());
    }

    // Dropdown ingredient
    const matchesIngredient =
      selectedIngredients.length === 0 ||
      selectedIngsLower.every((selectedIng) => {
        let foundIngredient = false;

        for (let i = 0; i < recipeIngredientsLower.length; i++) {
          const recipeIngredient = recipeIngredientsLower[i];

          if (recipeIngredient.length !== selectedIng.length) continue;

          let match = true;
          for (let j = 0; j < selectedIng.length; j++) {
            if (recipeIngredient[j] !== selectedIng[j]) {
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

    const selectedAppliancesLower = [];
    for (let i = 0; i < selectedAppliances.length; i++) {
      selectedAppliancesLower.push(selectedAppliances[i].toLowerCase());
    }

    // Dropdown appliance
    let matchesAppliance = selectedAppliances.length === 0;

    if (!matchesAppliance) {
      const applianceLower = recipe.appliance.toLowerCase();

      for (let i = 0; i < selectedAppliancesLower.length; i++) {
        const selected = selectedAppliancesLower[i];

        if (selected.length !== applianceLower.length) continue;

        let match = true;
        for (let j = 0; j < selected.length; j++) {
          if (selected[j] !== applianceLower[j]) {
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

    const selectedUstensilsLower = [];
    for (let i = 0; i < selectedUstensils.length; i++) {
      selectedUstensilsLower.push(selectedUstensils[i].toLowerCase());
    }

    // Dropdown ustensil
    let matchesUstensil = selectedUstensils.length === 0;

    if (!matchesUstensil) {
      for (let i = 0; i < recipe.ustensils.length; i++) {
        const ustensilLower = recipe.ustensils[i].toLowerCase();

        for (let j = 0; j < selectedUstensilsLower.length; j++) {
          const selected = selectedUstensilsLower[j];

          if (selected.length !== ustensilLower.length) continue;

          let match = true;
          for (let k = 0; k < selected.length; k++) {
            if (selected[k] !== ustensilLower[k]) {
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
