const searchBtn = document.querySelector('.search-btn');
const mealList = document.querySelector('#meals');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


searchBtn.addEventListener('click', showMealList);
mealList.addEventListener('click',getRecipe);
recipeCloseBtn.addEventListener('click', closeRecipe);

function showMealList() {
  let searchInputTxt = document.getElementById('search-input').value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
  .then(response => response.json())
  .then(data => {
    let html = "";
    if (data.meals){
      data.meals.forEach(meal => {
        html += `<div class="meal-item" id="${meal.idMeal}">
          <img class="meal-img" src="${meal.strMealThumb}" alt="food">
          <h2 class="meal-name">${meal.strMeal}</h2>
          <a class="recipe-btn" href="#">Get Recipe</a>
        </div>`;
      });
      mealList.classList.remove("notFound");
    } else {
      html = "Sorry, we didn't find any meal!";

      mealList.classList.add("notFound");
    }
    mealList.innerHTML = html;
  });
}

function getRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`)
      .then(response => response.json())
      .then(data => mealRecipeModal(data.meals));
  }
}

function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `
  <h2 class="recipe-title">${meal.strMeal}</h2>
  <p class="recipe-category">${meal.strCategory}</p>
  <h3 class="instructions">Instructions:</h3>
  <p>${meal.strInstructions}</p>
  <div class="recipe-end">
  <img class="recipe-meal-img" src="${meal.strMealThumb}" alt="">
  <a href="${meal.strYoutube}" class="recipe-link">Watch Video</a>
  </div>`;

  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.remove('hidden');
}

function closeRecipe() {
  mealDetailsContent.parentElement.classList.add('hidden');
}
