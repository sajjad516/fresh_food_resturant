const searchFood = () => {
  const searchfield = document.getElementById("search-field");
  const searchText = searchfield.value;
  //  clear data
  searchfield.value = "";

  //show error message
  const divERR = document.getElementById("error-message");
  if (searchText == "") {
    divERR.innerText = "Please write something in input box";
  } else {
    divERR.innerText = "";

    const loadData = () => {
      //   load data
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => displaySearchResult(data.meals))
        .catch((error) => displayError(error));
    };
    const displayError = (error) => {
      searchText.value = "";
      let errorMessage = "No result found 😔";
      const resultCount = document.getElementById("error-msg");
      resultCount.innerText = errorMessage;
    };
    loadData();
  }
};

const displaySearchResult = (meals) => {
  const resultCount = document.getElementById("error-msg");
  const divERR = document.getElementById("error-message");
  divERR.innerText = "";
  resultCount.innerText = "";

  const searchResult = document.getElementById("search-result");
  //data clear before data for other meal search
  searchResult.textContent = " ";

  // console.log(meals);
  meals.forEach((meal) => {
    // console.log(meal);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
          <div onclick="loadMealdetail(${meal.idMeal})" class="card h-100">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
              <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">
                      ${meal.strInstructions.slice(0, 200)}
                  </p>
              </div>
          </div>
      `;
    searchResult.appendChild(div);
  });
};

const loadMealdetail = (mealId) => {
  // console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data.meals[0]));
};

const displayMealDetail = (meal) => {
  // console.log(meal);
  const mealDetail = document.getElementById("meal-detail");
  mealDetail.textContent = " ";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
      <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title text-danger">${meal.strMeal}</h5>
        <p class="card-text">
        ${meal.strInstructions.slice(0, 150)}
        </p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Go video</a>
      </div>
  `;
  mealDetail.appendChild(div);
};
