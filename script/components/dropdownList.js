export function displayDropdown(id, recipes) {
  const dropdown = document.getElementById(id);
  dropdown.innerHTML = "";

  recipes.sort().forEach((elmt) => {
    const li = document.createElement("li");
    li.textContent = elmt;
    li.className = `
    cursor-pointer
    mb-1
    py-2
    hover:bg-gray-100
    text-gray-700
    rounded
    mb-1
  `;

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
    recipe.ingredients.forEach((objet) => {
      ingredients.add(objet.ingredient);
    });

    appliances.add(recipe.appliance);

    recipe.ustensils.forEach((ustensil) => ustensils.add(ustensil));
  });

  displayDropdown("ingredients-dropdown", [...ingredients]);
  displayDropdown("appliances-dropdown", [...appliances]);
  displayDropdown("ustensils-dropdown", [...ustensils]);
}

export function expandedDropdown(btn, dropdown) {
  const isExpanded = btn.getAttribute("aria-expanded") === "true"; // Pourquoi pas mis à jour ?
  const chevronDown = btn.querySelector(".fa-chevron-down");
  const chevronUp = btn.querySelector(".fa-chevron-up");

  btn.addEventListener("click", () => {
    btn.setAttribute("aria-expanded", String(!isExpanded));
    toggleDropdown(!isExpanded);
  });

  dropdown.addEventListener("mouseleave", () => {
    btn.setAttribute("aria-expanded", "false");
    toggleDropdown(false);
  });

  function toggleDropdown(isExpanded) {
    if (isExpanded) {
      chevronDown.classList.add("invisible");
      chevronUp.classList.remove("invisible");
      dropdown.classList.remove("hidden");
      dropdown.classList.add("block");
    } else {
      chevronDown.classList.remove("invisible");
      chevronUp.classList.add("invisible");
      dropdown.classList.remove("block");
      dropdown.classList.add("hidden");
    }
  }
}
