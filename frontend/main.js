/*--------------------Login and logout ----------------------------*/

const loginContainer = document.querySelector('#login')
const logoutContainer = document.querySelector('#logout')
const addNewUserContainer = document.querySelector('#newUser')

createHtmlLogin();
createAddNewUserBtn()

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

const loginBtn = document.querySelector('#loginBtn');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');

function createHtmlLogout () {
    const logoutBtn = document.createElement('button');
    logoutBtn.id = "logoutBtn"
    logoutBtn.innerText = "Logga ut";
    logoutContainer.appendChild(logoutBtn)
    console.log(logoutBtn)
}

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
    .then(data => {

        if(data.id){
            localStorage.setItem("userId", data.id)
            loginContainer.removeChild(loginForm);
            createHtmlLogout();
            
            
        } else {
            console.log('inlogg misslyckats');
        }
    })
    .catch(error => console.log(error))
};

document.body.addEventListener('click', function ( event ) {
    if( event.target.id == 'logoutBtn' ) {
        localStorage.clear();
        createHtmlLogin();
        logoutContainer.removeChild(logoutBtn)
    };
});

/*-------------------------------------------------------------*/

/*---------------------Add new user---------------------------*/

function createAddNewUserBtn(){
    const createNewUserBtn = document.createElement('button');
    createNewUserBtn.id = "createNewUserBtn"
    createNewUserBtn.innerText = "Skapa ny användare";
    addNewUserContainer.appendChild(createNewUserBtn);
}

document.body.addEventListener('click', function ( event ) {
    if( event.target.id == 'createNewUserBtn' ) {
        createHtmlAddNewUser();
        loginContainer.removeChild(loginForm);
        addNewUserContainer.removeChild(createNewUserBtn)
    };
});


function createHtmlAddNewUser() {
    const addUserForm = document.createElement('form');
    addUserForm.id = "addUserForm"
    addNewUserContainer.appendChild(addUserForm);

    const nameInput = document.createElement('input');
    nameInput.id = "nameInput"
    nameInput.type = "text";
    nameInput.placeholder = "Namn";
    nameInput.name = "name"
    addUserForm.appendChild(nameInput);

    const emailInput = document.createElement('input');
    emailInput.id = "emailInput"
    emailInput.type = "email";
    emailInput.placeholder = "Email";
    emailInput.name = "email"
    addUserForm.appendChild(emailInput);

    const passwordInput = document.createElement('input');
    passwordInput.id = "passwordInput"
    passwordInput.type = "password";
    passwordInput.placeholder = "Lösenord";
    passwordInput.name = "password"
    addUserForm.appendChild(passwordInput);

    const createUserBtn = document.createElement('button');
    createUserBtn.type = 'submit'
    createUserBtn.id = "createUserBtn"
    createUserBtn.innerText = "Skapa användare";
    addUserForm.appendChild(createUserBtn);
}
