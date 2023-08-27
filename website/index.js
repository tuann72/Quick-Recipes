const search = document.querySelector("form");
const result = document.querySelector(".search-results");
const container = document.querySelector(".lower-container");

const APP_ID = "37b9193e";
const APP_KEY = "1fa331765c11fb78d29f16af73b65be5";


let searchValue = "";

search.addEventListener("submit", (e) => {
  e.preventDefault();
  searchValue = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI(){
    const baseURL =
  `https://api.edamam.com/api/recipes/v2?type=public&q=${searchValue}&app_id=${APP_ID}&app_key=${APP_KEY}&random=True`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results){
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
        `
        <div class="item-container">
            <div class="item-img">
              <img src="${result.recipe.image}">
            </div>
            <div class="item-header">
              <h1>${result.recipe.label}</h1>
              <a class="btn" href="${result.recipe.url}" target="_blank">View Recipe</a>
            </div>
            <div class="item-body">
              Calories: ${result.recipe.calories.toFixed(1)} <br>
              Fat: ${result.recipe.digest[0].total.toFixed(1)} <br>
              Carbs: ${result.recipe.digest[1].total.toFixed(1)} <br>
              Protein: ${result.recipe.digest[2].total.toFixed(1)} <br>
              Cholesterol: ${result.recipe.digest[3].total.toFixed(1)} <br>
              Sodium: ${result.recipe.digest[4].total.toFixed(1)} <br>  
            </div>
          </div>
        
        `;
    })
    result.innerHTML = generatedHTML;
}
