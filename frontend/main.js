const loginContainer = document.querySelector('#login')

createHtmlLogin();

function createHtmlLogin (){

    const loginForm = document.createElement('form');
    loginContainer.appendChild(loginForm);

    const emailInput = document.createElement('input');
    emailInput.type = "email";
    emailInput.placeholder = "Email";
    loginForm.appendChild(emailInput);

    const passwordInput = document.createElement('input');
    passwordInput.type = "password";
    passwordInput.placeholder = "Lösenord";
    loginForm.appendChild(passwordInput);

    const loginBtn = document.createElement('button');
    loginBtn.type = "submit";
    loginBtn.innerText = "Logga in";
    loginForm.appendChild(loginBtn);
}