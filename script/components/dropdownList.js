export function displayDropdown(id, recipes) {
  const dropdown = document.getElementById(id);
  dropdown.innerHTML = "";

  recipes.sort().forEach((elmt) => {
    const li = document.createElement("li");
    li.textContent = elmt;
    li.addEventListener("click", (event) => {
      const itemDropdown = event.target.textContent;
    });
    dropdown.appendChild(li);
  });
}

export function setupDropdownMenus(recipes) {
  const ingredients = new Set();
  const appliances = new Set();
  const ustensils = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((obj) => {
      ingredients.add(obj.ingredient);
    });

    appliances.add(recipe.appliance);

    recipe.ustensils.forEach((ustensil) => ustensils.add(ustensil));
  });

  displayDropdown("ingredients-dropdown", [...ingredients]);
  displayDropdown("appliances-dropdown", [...appliances]);
  displayDropdown("ustensils-dropdown", [...ustensils]);
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
