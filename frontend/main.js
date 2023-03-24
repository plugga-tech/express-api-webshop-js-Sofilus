/*--------------------Login and logout ----------------------------*/

const loginContainer = document.querySelector('#login')
const logoutContainer = document.querySelector('#logout')
const addNewUserContainer = document.querySelector('#newUser')
const userCreatedContainer = document.querySelector('#userCreated')

const loginBtn = document.querySelector('#loginBtn');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const logoutBtn = document.querySelector('#logoutBtn')

const createNewUserBtn = document.querySelector('#createNewUserBtn')
const createUserBtn = document.querySelector('#createUserBtn')
const newNameInput = document.querySelector('#newNameInput');
const newEmailInput = document.querySelector('#newEmailInput');
const newPasswordInput = document.querySelector('#newPasswordInput');

const createNewUserMessage = document.querySelector('#createNewUserMessage')
const gotoLoginBtn = document.querySelector('#goToLoginBtn');


logoutContainer.classList.add('display-none');
addNewUserContainer.classList.add('display-none')
userCreatedContainer.classList.add('display-none')

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

createUserBtn.addEventListener('click', createNewUser)

function createNewUser(e) {
    e.preventDefault();
        let typedName = newNameInput.value
        let typedPassword = newPasswordInput.value
        let typedEmail = newEmailInput.value

        let newUser = {name: typedName, email: typedEmail, password: typedPassword}

    
    fetch('http://localhost:3000/api/users/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.name){
        createNewUserMessage.innerHTML = ""    
        createNewUserMessage.innerText = "Du har skapat en användare"
        userCreatedContainer.classList.remove('display-none')
        addNewUserContainer.classList.add('display-none')
        userCreatedMessage.classList.add('display-none')
        gotoLoginBtn.classList.remove('display-none')
        } else {
        createNewUserMessage.innerHTML =""
        createNewUserMessage.innerText = data.message
        userCreatedContainer.classList.remove('display-none')
        gotoLoginBtn.classList.add('display-none')
        }
        
    })
    .catch(error => console.log(error))
};

gotoLoginBtn.addEventListener('click', goToLogin)

function goToLogin(){
    userCreatedContainer.classList.add('display-none');
    loginContainer.classList.remove('display-none');
    createNewUserBtn.classList.remove('display-none')
}