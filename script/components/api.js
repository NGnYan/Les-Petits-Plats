/**
 * API call to fetch
 * @returns {Promise<Object>} JSON data of the recipes.
 */
export async function getRecipes() {
  const response = await fetch("/data/recipes.json");
  if (!response.ok) {
    throw new Error(`Erreur ${response.status}`);
  }
  const data = await response.json();
  return data.recipes;
}
