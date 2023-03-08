const searchForm = document.getElementById('search-form');
const mealDetails = document.getElementById('meal-details');
const ingredientList = document.getElementById('ingredient-list');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent default form submit behavior

  const mealSelect = document.getElementById('meal-select');
  const mealName = mealSelect.options[mealSelect.selectedIndex].value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.meals === null) {
        mealDetails.innerHTML = `<p>No meal found for '${mealName}'</p>`;
        ingredientList.innerHTML = '';
      } else {
        const meal = data.meals[0];
        /*to display data*/
        mealDetails.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <p><b>Meal Category:</b> ${meal.strCategory}</p>
          <a href="${meal.strYoutube}">Youtube tutorial Click Here!</a>
          <p> Instruction: ${meal.strInstructions}</p>
        `;
        const ingredients = getIngredients(meal);
        ingredientList.innerHTML = `
          <h3>Ingredients:</h3>
          <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
          `;
          
      }
    })
    .catch(error => {
      mealDetails.innerHTML = `<p>Something went wrong: ${error}</p>`;
      ingredientList.innerHTML = '';
    });
});

function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }
  return ingredients;
}