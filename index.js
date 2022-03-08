import { getData, randomdata, singleMeal } from "./scripts/getdata.js";
import navbar from "./components/navbar.js";
document.querySelector("nav").innerHTML = navbar();
let searchListBox = document.querySelector(".searchList");
let interval;
let search = document.getElementById("search");
search.addEventListener("input", debounce);

document.querySelector(".inputSearch").addEventListener("click", () => {
  searchListBox.style.display = "none";
  search.value = "";
});

function debounce() {
  if (interval) clearInterval(interval);
  interval = setTimeout(fetchData, 1000);
}

const fetchData = async () => {
  searchListBox.style.display = "block";
  let searchValue = search.value.trim();
  let data = await getData(
    `https://themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
  );
  displaySearchList(data.meals);
};

const displaySearchList = (meals) => {
  searchListBox.innerHTML = null;
  if (meals)
    meals.forEach((meal) => {
      let mealname = document.createElement("p");
      mealname.textContent = meal.strMeal;
      mealname.addEventListener("click", () => {
        singleMeal(meal, searchListBox);
      });
      searchListBox.style.padding = "0";
      searchListBox.append(mealname);
    });
  else {
    searchListBox.style.padding = "20px 0";
    searchListBox.style.fontSize = "large";
    searchListBox.style.display = "flex";
    searchListBox.style.justifyContent = "center";
    searchListBox.style.alignItems = "center";

    searchListBox.innerText = "No results Found";
  }
};

const HomePageData = async () => {
  let parent = document.querySelector(".randomData");
  for (let i = 1; i <= 30; i++) {
    let data = await getData(
      `https://themealdb.com/api/json/v1/1/lookup.php?i=${
        Math.ceil(Math.random() * 300) + 52760
      }`
    );
    if (data.meals) {
      randomdata(data.meals[0], parent);
    }
  }
};
HomePageData();

