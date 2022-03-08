import { getData, randomdata } from "/scripts/getdata.js";
let recipe = document.querySelector(".recipeOfDay");
let navLogin = document.querySelector(".navLogin");
let navSignup = document.querySelector(".navSignup");
let navProfile = document.querySelector(".showProfile");
let logindropdown = document.querySelector(".loginForm");
let signupdropdown = document.querySelector(".signupForm");
let profiledropdown = document.querySelector(".profile");
let loginVal = document.getElementById("loginVal");
let signupVal = document.getElementById("signupVal");

document.querySelector(".latest").addEventListener("click", async () => {
  if (recipe.style.display == "block") {
    recipe.style.display = "none";
  } else {
    logindropdown.style.display = "none";
    signupdropdown.style.display = "none";
    profiledropdown.style.display = "none";
    recipe.style.display = "block";
    recipe.innerHTML = null;
  }
  let data = await getData(
    `https://themealdb.com/api/json/v1/1/lookup.php?i=${
      Math.ceil(Math.random() * 300) + 52760
    }`
  );
  if (data.meals) {
    randomdata(data.meals[0], recipe);
  }
});
document.querySelector(".navLogin").addEventListener("click", () => {
  if (logindropdown.style.display == "block")
    logindropdown.style.display = "none";
  else {
    recipe.style.display = "none";
    signupdropdown.style.display = "none";
    logindropdown.style.display = "block";
  }
});
document.querySelector(".navSignup").addEventListener("click", () => {
  if (signupdropdown.style.display == "block")
    signupdropdown.style.display = "none";
  else {
    recipe.style.display = "none";
    logindropdown.style.display = "none";
    signupdropdown.style.display = "block";
  }
});
document.querySelector(".showProfile").addEventListener("click", () => {
  if (profiledropdown.style.display == "block")
    profiledropdown.style.display = "none";
  else {
    recipe.style.display = "none";
    profiledropdown.style.display = "block";
  }
});

document.getElementById("register").addEventListener("click", async () => {
  let register_data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim(),
    username: document.getElementById("username").value.trim(),
    mobile: document.getElementById("mobile").value.trim(),
    description: document.getElementById("description").value.trim(),
  };
  if (
    register_data.name == "" ||
    register_data.email == "" ||
    register_data.password == "" ||
    register_data.username == "" ||
    register_data.mobile == ""
  ) {
    signupVal.innerText = "Empty fields not allowed";
    return;
  }
  register_data = JSON.stringify(register_data);
  let res = await fetch(
    "https://masai-api-mocker.herokuapp.com/auth/register",
    {
      method: "POST",
      body: register_data,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = await res.json();
  // console.log(data);
  signupVal.innerText = data.message;
});

document.getElementById("login").addEventListener("click", async () => {
  let login_data = {
    username: document.getElementById("loginUsername").value.trim(),
    password: document.getElementById("loginPassword").value.trim(),
  };
  if (login_data.username == "" && login_data.password == "") {
    loginVal.innerText = "Empty fields not allowed";
    return;
  }
  let login_data_json = JSON.stringify(login_data);
  let res = await fetch("https://masai-api-mocker.herokuapp.com/auth/login", {
    method: "POST",
    body: login_data_json,
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();
  if (data.error) loginVal.innerText = data.message;
  else showProfile(data.token, login_data.username);
});

let showProfile = async (token, username) => {
  logindropdown.style.display = "none";
  navLogin.style.display = "none";
  navSignup.style.display = "none";
  // navProfile.style.display = "block";
  navProfile.innerText = username;
  let res = await fetch(
    `https://masai-api-mocker.herokuapp.com/user/${username}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  let data = await res.json();
  displayProfile(data);
};
let displayProfile = (data) => {
  let name = document.createElement("h3");
  name.innerHTML = `<b>Name:</b> ${data.name}`;
  let username = document.createElement("p");
  username.innerHTML = `<b>UserName:</b> ${data.username}`;
  let email = document.createElement("p");
  email.innerHTML = `<b>Email:</b> ${data.email}`;
  let mobile = document.createElement("p");
  mobile.innerHTML = `<b>Mobile:</b> ${data.mobile}`;
  let des = document.createElement("p");
  des.innerHTML = `<b>Description:</b> ${data.description}`;
  profiledropdown.append(name, username, email, mobile, des);
};
