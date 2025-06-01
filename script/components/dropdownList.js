export function displayDropdown(id, recipes) {
  const dropdown = document.getElementById(id);
  dropdown.innerHTML = "";

  recipes.sort().forEach((elmt) => {
    const li = document.createElement("li");
    li.textContent = elmt;
    dropdown.appendChild(li);
  });
}

export function setupDropdownMenus(recipes) {
  const ingredients = new Set();
  const appareils = new Set();
  const ustensiles = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((obj) => {
      ingredients.add(obj.ingredient);
    });

    appareils.add(recipe.appliance);

    recipe.ustensils.forEach((ustencil) => ustensiles.add(ustencil));
  });

  displayDropdown("ingredients-dropdown", [...ingredients]);
  displayDropdown("appliances-dropdown", [...appareils]);
  displayDropdown("ustensils-dropdown", [...ustensiles]);
}
