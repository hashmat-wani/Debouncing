function navbar() {
  return ` <div onclick="window.location.href='index.html'" class="brand">Recipe</div>
    <div class="options">
      <center>
        <li class="latest">Recipe of Day</li>
        <div class="dropdown recipeOfDay">Recipe of day</div>
      </center>

      <center>
      <li class="navLogin">Login</li>
        <div class="dropdown loginForm">
          <small id="loginVal"></small>
          <input id="loginUsername" placeholder="Username" type="email" />
          <input id="loginPassword" placeholder="Password" type="password" /> <br />
          <button id="login">Login</button>
        </div>
      </center>

      <center>
      <li class="navSignup">Signup</li>
        <div class="dropdown signupForm">
          <small id="signupVal"></small>
          <input id="name" placeholder="Name" type="text" />
          <input id="email" placeholder="Email" type="email" />
          <input id="password" placeholder="Password" type="password" />
          <input id="username" placeholder="Username" type="text" />
          <input id="mobile" placeholder="Mobile" type="number" />
          <textarea id="description" placeholder="Description..."></textarea>
          <button id="register">Signup</button>
        </div>
      </center>

      <center>
      <li class="showProfile"></li>
      <div class="dropdown profile"></div>
    </center>

    </div>`;
}

export default navbar;
