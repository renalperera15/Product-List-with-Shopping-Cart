// Load existing cart or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Show number of items in cart
function updateCartCount() {
    const count = cart.length;
    const cartCount = document.getElementById('cart-count');
    if(cartCount) cartCount.innerText = count;
}

// Update count on page load
updateCartCount();