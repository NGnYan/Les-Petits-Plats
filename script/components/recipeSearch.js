import { createCard } from "./createCards";

export function displaySearchCards(
  inputSearchBar,
  allRecipes,
  cardContainer,
  subtitleClassCard
) {
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

  if (filteredRecipes.length === 0) {
    cardContainer.innerHTML = `
    <p class="absolute flex items-center justify-center w-full text-center text-lg whitespace-nowrap">
      Aucune recette trouvée !
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
