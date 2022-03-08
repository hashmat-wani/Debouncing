import navbar from "./components/navbar.js";
import { displaySingleMEal } from "./scripts/getdata.js";
document.querySelector("nav").innerHTML = navbar();

let parent = document.getElementById("container");
let meal = JSON.parse(localStorage.getItem("singleMeal"));
displaySingleMEal(meal, parent);
