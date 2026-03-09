// Load existing cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(button) {
    const card = button.closest('.card'); // get the card element
    const name = card.querySelector('h3').innerText;
    const price = parseFloat(card.querySelector('.price').innerText.replace('$',''));
    let stock = parseInt(card.getAttribute('data-stock'));

    if(stock > 0){
        // Add to cart
        cart.push({ name, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

        // Reduce stock
        stock -= 1;
        card.setAttribute('data-stock', stock);
        card.querySelector('.stock-count').innerText = stock;

        // Disable button if stock 0
        if(stock === 0){
            button.disabled = true;
            button.innerText = 'Out of Stock';
            button.style.background = '#ccc';
            button.style.cursor = 'not-allowed';
        }
    }
}

// Update cart count display
function updateCartCount() {
    const count = cart.length;
    const cartCount = document.getElementById('cart-count');
    if(cartCount) cartCount.innerText = count;
}

// Initialize cart count on page load
updateCartCount();