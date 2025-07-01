import { handleDropdownItemClick } from "../index.js";

// Selectors
export function displayDropdown(id, recipes, category) {
  const dropdown = document.getElementById(id);
  dropdown.innerHTML = "";

  recipes
    .sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }))
    .forEach((elmt) => {
      const li = document.createElement("li");
      li.textContent =
        elmt.charAt(0).toUpperCase() + elmt.slice(1).toLowerCase();
      li.className = `
    cursor-pointer
    mb-1
    py-2
    hover:bg-gray-100
    text-gray-700
    rounded
    mb-1
  `;

      li.addEventListener("click", () => {
        handleDropdownItemClick(category, li.textContent);
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

  displayDropdown("ingredients-dropdown", [...ingredients], "ingredients");
  displayDropdown("appliances-dropdown", [...appliances], "appliances");
  displayDropdown("ustensils-dropdown", [...ustensils], "ustensils");
}

export function expandedDropdown(btn, dropdown) {
  const chevronDown = btn.querySelector(".fa-chevron-down");
  const chevronUp = btn.querySelector(".fa-chevron-up");

  btn.addEventListener("click", () => {
    const isExpanded = btn.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      btn.setAttribute("aria-expanded", "false");
      untoggleDropdown();
    } else {
      btn.setAttribute("aria-expanded", "true");
      toggleDropdown();
    }
  });

  dropdown.addEventListener("mouseleave", () => {
    btn.setAttribute("aria-expanded", "false");
    untoggleDropdown();
  });

  function toggleDropdown() {
    chevronDown.classList.add("invisible");
    chevronUp.classList.remove("invisible");
    dropdown.classList.remove("hidden");
    dropdown.classList.add("block");
    dropdown.classList.add("max-h-[300px]", "overflow-y-auto");
  }

  function untoggleDropdown() {
    chevronDown.classList.remove("invisible");
    chevronUp.classList.add("invisible");
    dropdown.classList.remove("block");
    dropdown.classList.add("hidden");
    dropdown.classList.remove("max-h-[300px]", "overflow-y-auto");
  }
}
