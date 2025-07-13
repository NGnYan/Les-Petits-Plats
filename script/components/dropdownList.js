import { handleDropdownItemClick } from "../index.js";

// Selectors

/**
 * Displays and manages a dynamic dropdown list (ingredients, appliances, or utensils).
 *
 * @param {string} id - The HTML element ID of the dropdown container.
 * @param {Array<string>} recipes - The array of items to display in the dropdown.
 * @param {string} category - The category of items (ingredients, appliances, or ustensils).
 */
export function displayDropdown(id, recipes, category) {
  const dropdownContainer = document.getElementById(id);
  dropdownContainer.innerHTML = "";

  const searchContainer = document.createElement("div");
  searchContainer.className = `
    sticky
    top-0
    left-0
    w-full
    z-50
    bg-white
    px-2
    pt-2
    pb-2
  `;

  const inputDropdown = document.createElement("input");
  inputDropdown.type = "text";
  inputDropdown.placeholder = "Rechercher";
  inputDropdown.className = `
    w-full
    pl-3 pr-10
    py-2
    border
    border-gray-300
    rounded
    text-sm
    focus:outline-none
    box-border
  `;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  deleteBtn.className = `
    absolute
    right-10
    top-7
    -translate-y-1/2
    text-gray-500
    hover:text-black
    text-sm
    cursor-pointer
    hidden
    z-10
  `;

  const searchIcon = document.createElement("span");
  searchIcon.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
  searchIcon.className = `
   absolute
    right-4
    top-7
    -translate-y-1/2
    text-gray-400
    z-10
  `;

  searchContainer.appendChild(inputDropdown);
  searchContainer.appendChild(deleteBtn);
  searchContainer.appendChild(searchIcon);
  dropdownContainer.appendChild(searchContainer);

  const list = document.createElement("ul");
  list.className = `
    max-h-[300px]
    overflow-y-auto
    bg-white
    text-black
    rounded-b-lg
    w-full
    z-40
    shadow-md
  `;

  const listItems = [];

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
        px-5
        hover:bg-[#FFD15B]
        text-gray-700
        block
        w-full
        box-border
      `;

      li.addEventListener("click", () => {
        handleDropdownItemClick(category, li.textContent);
      });

      list.appendChild(li);
      listItems.push(li);
    });

  dropdownContainer.appendChild(list);

  deleteBtn.addEventListener("click", () => {
    inputDropdown.value = "";
    deleteBtn.classList.add("hidden");
    inputDropdown.focus();

    listItems.forEach((li) => {
      li.style.display = "block";
    });
  });

  inputDropdown.addEventListener("input", () => {
    const value = inputDropdown.value.toLowerCase();

    if (value.length > 0) {
      deleteBtn.classList.remove("hidden");
    } else {
      deleteBtn.classList.add("hidden");
    }

    listItems.forEach((li) => {
      const item = li.textContent.toLowerCase();
      li.style.display = item.includes(value) ? "block" : "none";
    });
  });
}

/**
 * Sets up the dropdown menus (ingredients, appliances, and utensils) by extracting unique values from the list of recipes and displaying them.
 *
 * @param {Array<Object>} recipes - Array of recipe objects.
 */
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

  document.addEventListener("click", (event) => {
    const isClickInside =
      dropdown.contains(event.target) || btn.contains(event.target);

    if (!isClickInside) {
      btn.setAttribute("aria-expanded", "false");
      untoggleDropdown();
    }
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
