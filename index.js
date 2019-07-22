//This is an example of an Amazon type online store.

//here is an objec that can be used for dot notation(plus toggle home page to details page) around the search bar text
let state = {
    searchText: "", //<---the empty string for the text that the user types in
    currentProductToAdd: null  //this will actually toggle user from all product list to detail view
}
//below are a bunch of variables that will be used they are just being set to null,
//Set to null is identifying something as undefined.  You could just say 'let cart;'  and that would show as undefined
let cart = []; //this will hold items in shopping cart
let addCartButton = null; 
//the next four will be used on the sign-in screen
let txtEmail = null; 
let txtPassword = null; 
let btnSignUp = null;
let signup = null;
//the main divs 
let home = null;
let mainDiv = null;
// last is the empty array to hold all the products
let products = [];

//this is using a fetch via an api
function getProducts(){
    fetch('https://acastore.herokuapp.com/products')
    .then(function(response){
        return response.json();
    })
    .then(function(productsFromServer){
        //this is putting the products from the server into the products array
        products = productsFromServer;
        //calling the function that puts the products into the html
        listProducts(products);
    });
}

//this is basicaly what will show up the moment the window loads
window.onload = function(){
    mainDiv = document.getElementById("main");
    signup = document.getElementById("signup");
    home = document.getElementById("home");
//assinging values to some null varialbes
addCartButton = document.getElementById("btnAddToCart");
txtEmail = document.getElementById("email");
txtPassword = documnet.getElementById("password");
btnSignUp = document.getElementById("btnSignUp");
btnSignUp.onclick = signUp;
listProducts(products); //lists products on home page
getProducts(); //gets products from the server

}
function signUp(){
    let email = txt.Email.value;
    let password = txt.Password.value;
    home.style.display = "block"; //this makes the home page visible
    signup.style.display = "none"; //this hids the sign-in page
}
function searchTextChanged(event){
    state.searchText = event.value; //when someone starts to type in the search bar "event is just that"
    listProducts(filteredProducts); //just show products that match to the text being typed
}
function showProductDetail(id){
    addCartButton.style.display = "block"; //now you can see the button to add to the cart
    let product = products.find(p=>p.id === id); //searching the product list by id.
    state.currentProductToAdd = product;
        mainDiv.innerHTML = product.name + product.description; //fills in the page with product detail
}
//this will show the products on the home page and when you click on the text it will activate the detail funciton 
//the .join is used to put the json into a string 
function listProducts(products){
    let proDivs = products.map(p=>{
        return '<hr><div onclick="showProductDetails(${p.id})">${p.name}</div>'
    });
    mainDiv.innerHTML = prodDivs.join("");
}
//add a product to the cart and then return to the home screen(full product list)
functionaddToCart(prod){
    cart.push(prod);
    showHome();
}
function showHome(){
    addCartButton.style.display = "none"; //hide the add to cart button
    state.currentProductToAdd = null; //reset to empty until next product to add to cart is selected
    listProducts(products); //show all products again
}
function placeOrder(){
    //does not really do anything as this does not actually make sales
}
//displays items in the cart and a button to make purchase now
function showCart(){
    listProducts(cart);
    var button = document.createElement('div');
    button.innerHTML = "<button onclick='placeOrder()'>Place Order</button>";
    mainDiv.appendChild(button);
}

