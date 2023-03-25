/*--------------------Login and logout ----------------------------*/

const loginContainer = document.querySelector('#login')
const logoutContainer = document.querySelector('#logout')
const addNewUserContainer = document.querySelector('#newUser')
const userCreatedContainer = document.querySelector('#userCreated')
const productsContainer = document.querySelector('#products')
const basketContainer = document.querySelector('#basket')

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

/*------------------------------------------------------------*/

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

/*------------------------------------------------------------*/

/*----------------------- Print products ---------------------*/

function printProducts() {
    fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(products => {

        for (let i = 0; i < products.length; i++) {
            
            const productCard = document.createElement('div')
            productsContainer.appendChild(productCard)

            const productTitle = document.createElement('h3')
            productTitle.innerText = products[i].name
            productCard.appendChild(productTitle)

            const productImg = document.createElement('img')
            productCard.appendChild(productImg)

            const productDescription = document.createElement('p');
            productDescription.innerText = products[i].description;
            productCard.appendChild(productDescription)

            const productPrice = document.createElement('p')
            productPrice.innerText = products[i].price;
            productCard.appendChild(productPrice);

            const removeProductBtn = document.createElement('button');
            removeProductBtn.innerText = "-"
            removeProductBtn.id = i
            productCard.appendChild(removeProductBtn);

            const choosenAmountOfProduct = document.createElement('input');
            choosenAmountOfProduct.type = "number";
            choosenAmountOfProduct.value = 0
            productCard.appendChild(choosenAmountOfProduct);
            
            const addProductBtn = document.createElement('button');
            addProductBtn.innerText = "+"
            addProductBtn.id = i
            productCard.appendChild(addProductBtn);

            addProductBtn.addEventListener('click', addAmount);
            removeProductBtn.addEventListener('click', removeAmount);
            choosenAmountOfProduct.addEventListener('input', updateAmount)
        }
    })
}

/*------------------------------------------------------------*/

/*--------- Print basket and Create & send order -------------*/

function printbasket (){
    const sendOrderBtn = document.createElement('button');
    sendOrderBtn.innerText = "Skicka order"
    basketContainer.appendChild(sendOrderBtn);

    sendOrderBtn.addEventListener('click', () => {
        sendOrder();
    })
}

const basket = []

fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(products => {
        for (let i = 0; i < products.length; i++) {
            basket.push({productId: products[i]._id, quantity: 0})
        }
    })

function addAmount(e){
    
    let clickedBtnId = e.target.id
    basket[clickedBtnId].quantity += 1
}

function removeAmount(e){
    let clickedBtnId = e.target.id

    if(basket[clickedBtnId].quantity > 0){
       basket[clickedBtnId].quantity -= 1 
    }
}

function updateAmount(){
    console.log("Updatera")
}

function sendOrder (){
    let userId = localStorage.getItem("userId") 
    console.log(userId)
    let newOrder = {user: userId, products: basket}
    console.log(newOrder)

    fetch('http://localhost:3000/api/orders/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)})
}

printProducts();
printbasket();

/*------------------------------------------------------------*/