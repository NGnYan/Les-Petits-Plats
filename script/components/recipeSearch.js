import { createCard } from "./createCards";
import { updateNumberRecipes } from "./utils";
import { inputSearchBar } from "../index.js";
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

  if (filteredRecipes.length === 0) {
    cardContainer.innerHTML = `
    <p class="absolute flex items-center justify-center w-full text-center text-lg whitespace-nowrap text-[#828282] pb-[50px]">
      Aucune recette ne contient "${inputSearchBar.value}". <br> Vous pouvez chercher « tarte aux pommes », « poisson », etc.
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
