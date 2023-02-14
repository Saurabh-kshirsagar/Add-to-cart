let products = [
  {
    id: 0,
    image: "./img/shoe-1.jpg",
    btn: 'Add-to-cart',
    price: 1395,
    title: "Nike Air Jordan-1 (Chicago red)",
    stock: 10,
  },
  {
    id: 1,
    image: "./img/shoe-8.jpg",
    btn: 'Add-to-cart',
    price: 3000,
    title: "rdan-1 (Chicago red)",
    stock: 9,
  },
  
  {
    id: 2,
    image: "./img/shoe-7.jpg",
    btn: 'Add-to-cart',
    price: 3000,
    title: "rdan-1 (Chicago red)",
    stock: 9,
  },
  {
    id: 3,
    image: "./img/shoe-6.jpg",
    btn: 'Add-to-cart',
    price: 3000,
    title: "rdan-1 (Chicago red)",
    stock: 9,
  },
  {
    id: 4,
    image: "./img/shoe-2.jpg",
    btn: 'Add-to-cart',
    price: 3000,
    title: "rdan-1 (Chicago red)",
    stock: 9,
  }
]
let cart1=[]

const userprofile = document.querySelector('#items-container');
// document.getElementsByClassName('items-container').innerHTML = 
products.map((item) => {
  var { image, title, price, stock, btn } = item;
  var element =  
    `
         <div>
         <p class="product-id">${item.id}</p>
        <img class="product-image" src=${image} alt="">
        <button class="add-to-cart" onclick='addToCartClicked(${item})'>"${btn}  "</button>
         <span class="product-price">${price}</span>
        <p>${title}</p>
        <span class="total-Quantity">${stock}</span>
      </div>
      `

  
  var divElement = document.createElement('div')
  divElement.innerHTML = element;
  divElement.className = 'card-1 card';
  userprofile.appendChild(divElement)
})



// open cart modal
const cart = document.querySelector('#cart');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');

cart.addEventListener('click', () => {
  if (cartModalOverlay.style.transform === 'translateX(-200%)'){
    cartModalOverlay.style.transform = 'translateX(0)';
  } else {
    cartModalOverlay.style.transform = 'translateX(-200%)';
  }
})
// end of open cart modal

// close cart modal
const closeBtn = document.querySelector ('#close-btn');

closeBtn.addEventListener('click', () => {
  cartModalOverlay.style.transform = 'translateX(-200%)';
});

cartModalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-modal-overlay')){
    cartModalOverlay.style.transform = 'translateX(-200%)'
  }
})
// end of close cart modal

// add products to cart
const addToCart = document.getElementsByClassName('add-to-cart');
const productRow = document.getElementsByClassName('product-row');

for (var i = 0; i < addToCart.length; i++) {
  button = addToCart[i];
  button.addEventListener('click', addToCartClicked)
}

function addToCartClicked (event) {
  button = event.target;
  var cartItem = button.parentElement;
  var price = cartItem.getElementsByClassName('product-price')[0].innerText;
  
  var imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
  addItemToCart (price, imageSrc);
  updateCartPrice()
}

function addItemToCart (price, imageSrc,incPrice,productId, quantity) {
  var productRow = document.createElement('div');
  productRow.classList.add('product-row');
  var productRows = document.getElementsByClassName('product-rows')[0];
  var cartImage = document.getElementsByClassName('cart-image');
  const product = products.find(p => p.id ===productId );

  if (!product) {
    console.error("Product not found.");
    return;
  }

  if (quantity > product.stock) {
    console.error("Not enough stock available.");
    return;
  }

  // Update the stock quantity in the product object
  product.stock -= quantity;

  // Add the item to the cart
  cart1.push({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: quantity
  });

  for (var i = 0; i < cartImage.length; i++){
    if (cartImage[i].src == imageSrc){
      alert ('This item has already been added to the cart')
      return;
    }
  }
  
  var cartRowItems = `
  <div class="product-row">
        <img class="cart-image" src="${imageSrc}" alt="">
        <span class ="cart-price">${price}</span>
        <input class="product-quantity" type="number" value="1">
        <button class="remove-btn">Remove</button>
        <span class ="product-total-price">${incPrice}</span>
        </div>
        
      `
  productRow.innerHTML = cartRowItems;
  productRows.append(productRow);
  productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
  productRow.getElementsByClassName('product-quantity')[0].addEventListener('change', changeQuantity)
  updateCartPrice()
}
// end of add products to cart

// Remove products from cart
const removeBtn = document.getElementsByClassName('remove-btn');
for (var i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i]
  button.addEventListener('click', removeItem)
}

function removeItem (event) {
  btnClicked = event.target
  btnClicked.parentElement.parentElement.remove()
  updateCartPrice()
}

// update quantity input
var quantityInput = document.getElementsByClassName('product-quantity')[0];

for (var i = 0; i < quantityInput; i++){
  input = quantityInput[i]
  input.addEventListener('change', changeQuantity)
}

function changeQuantity(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1
  }
  updateCartPrice()
}
// end of update quantity input

// update total price
function updateCartPrice() {
   window.total = 0
  for (var i = 0; i < productRow.length; i += 2) {
    cartRow = productRow[i]
  var priceElement = cartRow.getElementsByClassName('cart-price')[0]
  var quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
  var price = parseFloat(priceElement.innerText.replace('$', ''))
  var quantity = quantityElement.value
  var incPrice = price * quantity;
  cartRow.getElementsByClassName('product-total-price')[0].innerHTML = 'Total :' + ' ' + '$' + incPrice;
  total = total + (price * quantity )
  var temp = cartRow.getElementsByClassName('total-Quantity')[0]

  }
  document.getElementsByClassName('total-price')[0].innerText =  '$' + total

document.getElementsByClassName('cart-quantity')[0].textContent = i /= 2
}
// end of update total price

// purchase items
const purchaseBtn = document.querySelector('.purchase-btn');

const closeCartModal = document.querySelector('.cart-modal');

purchaseBtn.addEventListener('click', purchaseBtnClicked)

function purchaseBtnClicked () {
  alert ('Thank you for your purchase');
  cartModalOverlay.style.transform= 'translateX(-100%)'
 var cartItems = document.getElementsByClassName('product-rows')[0]
 while (cartItems.hasChildNodes()) {
   cartItems.removeChild(cartItems.firstChild)
   
 }
  updateCartPrice()
}
// end of purchase items

//alert user if cart is empty