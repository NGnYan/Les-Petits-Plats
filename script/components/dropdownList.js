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

export function expandedDropdown(btn, dropdown) {
  btn.addEventListener("click", () => {
    const isExpanded = btn.getAttribute("aria-expanded") === "true";
    const chevronDown = btn.querySelector(".fa-chevron-down");
    const chevronUp = btn.querySelector(".fa-chevron-up");

    btn.setAttribute("aria-expanded", String(!isExpanded));

    if (isExpanded) {
      chevronDown.classList.remove("invisible");
      chevronUp.classList.add("invisible");
      dropdown.classList.remove("block");
      dropdown.classList.add("hidden");
    } else {
      chevronDown.classList.add("invisible");
      chevronUp.classList.remove("invisible");
      dropdown.classList.remove("hidden");
      dropdown.classList.add("block");
    }
  });
}
