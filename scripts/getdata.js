const getData = async (url) => {
  let res = await fetch(url);
  return res.json();
};
const singleMeal = (meal, searchListBox) => {
  if (searchListBox) searchListBox.style.display = "none";
  localStorage.setItem("singleMeal", JSON.stringify(meal));
  window.location.href = "singleMeal.html";
};

const displaySingleMEal = (meal, container) => {
  let div = document.createElement("div");
  let image = document.createElement("img");
  image.src = meal.strMealThumb;
  let iframe = document.createElement("iframe");
  iframe.src = meal.strYoutube.replace("watch?v=", "embed/");
  iframe.setAttribute("allowfullscreen", true);
  iframe.setAttribute("frameborder", 0);
  div.append(image, iframe);
  let title = document.createElement("h1");
  title.innerText = meal.strMeal;
  let des = document.createElement("p");
  des.textContent = meal.strInstructions;
  container.append(div, title, des);
};

const randomdata = (meal, parent) => {
  let div = document.createElement("div");
  let image = document.createElement("img");
  image.src = meal.strMealThumb;
  let title = document.createElement("h3");
  title.innerText = meal.strMeal;
  let readmore = document.createElement("button");
  readmore.innerText = "Read More";
  readmore.onclick = () => {
    singleMeal(meal);
  };
  div.append(image, title, readmore);
  parent.append(div);
};

export { getData, singleMeal, displaySingleMEal, randomdata };
