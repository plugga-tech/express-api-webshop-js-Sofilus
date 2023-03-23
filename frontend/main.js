/*--------------------Login and logout ----------------------------*/

const loginContainer = document.querySelector('#login')
const logoutContainer = document.querySelector('#logout')
const addNewUserContainer = document.querySelector('#newUser')

const loginBtn = document.querySelector('#loginBtn');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const logoutBtn = document.querySelector('#logoutBtn')

const createNewUserBtn = document.querySelector('#createNewUserBtn')

logoutContainer.classList.add('display-none');
addNewUserContainer.classList.add('display-none')

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
            loginContainer.classList.add('display-none');
            logoutContainer.classList.remove('display-none')
            logoutBtn.classList.remove('display-none')

        } else {
            console.log('inlogg misslyckats');
        }
    })
    .catch(error => console.log(error))
};

logoutBtn.addEventListener('click', logout)

 function logout (e) {
        localStorage.clear();
        logoutBtn.classList.add('display-none')
        loginContainer.classList.remove('display-none')
};

/*-------------------------------------------------------------*/

/*---------------------Add new user---------------------------*/

createNewUserBtn.addEventListener('click', showNewUserForm)
function showNewUserForm (e) {
    createNewUserBtn.classList.add('display-none');
    loginContainer.classList.add('display-none')
    addNewUserContainer.classList.remove('display-none')
};