import { createCard } from "./createCards";
import { updateNumberRecipes } from "./utils";
import { inputSearchBar } from "../index.js";
import { sanitizeInput } from "./utils";
/**
 * Displays recipe cards based on the search input.
 * Filters the recipes using the search text, then dynamically generates and displays matching cards.
 *
 * @param {string} searchText - The input field where the user types the search text.
 * @param {Array} allRecipes - The array of all available recipe objects.
 * @param {HTMLElement} cardContainer - The DOM element where recipe cards will be rendered.
 * @param {Array} subtitleClassCard - Array of CSS classes to style the card subtitles.
 */
export function displaySearchCards(
  filteredRecipes,
  cardContainer,
  subtitleClassCard
) {
  updateNumberRecipes(filteredRecipes);

  const searchValue = sanitizeInput(inputSearchBar.value.trim());

  if (filteredRecipes.length === 0) {
    let message;

    if (searchValue.length >= 0) {
      message = `Aucune recette ne contient "${searchValue}". <br> Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    } else {
      message = `Aucune recette ne correspond à vos filtres sélectionnés.`;
    }

    cardContainer.innerHTML = `
      <p class="absolute flex items-center justify-center w-full text-center text-lg whitespace-nowrap text-[#828282] pb-[50px]">
        ${message}
      </p>
    `;
    return;
  }

  cardContainer.innerHTML = "";

  filteredRecipes.forEach((recipe) => {
    const card = createCard(recipe, subtitleClassCard);
    cardContainer.appendChild(card);
  });
}
