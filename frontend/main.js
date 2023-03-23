const loginContainer = document.querySelector('#login')

function createHtmlLogin (){

    const loginForm = document.createElement('form');
    loginForm.id = "loginForm"
    loginContainer.appendChild(loginForm);

    const emailInput = document.createElement('input');
    emailInput.id = "emailInput"
    emailInput.type = "email";
    emailInput.placeholder = "Email";
    emailInput.name = "email"
    loginForm.appendChild(emailInput);

    const passwordInput = document.createElement('input');
    passwordInput.id = "passwordInput"
    passwordInput.type = "password";
    passwordInput.placeholder = "Lösenord";
    passwordInput.name = "password"
    loginForm.appendChild(passwordInput);

    const loginBtn = document.createElement('button');
    loginBtn.type = 'submit'
    loginBtn.id = "loginBtn"
    loginBtn.innerText = "Logga in";
    loginForm.appendChild(loginBtn);
    
}

createHtmlLogin();

const loginBtn = document.querySelector('#loginBtn');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const loginForm = document.querySelector('#loginForm');

loginBtn.addEventListener('click', tryToLogin)

function tryToLogin(e) {
    e.preventDefault();
     let typedPassword = passwordInput.value
     let typedEmail = emailInput.value

     let user = {email: typedEmail, password: typedPassword}

    
    fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))

};