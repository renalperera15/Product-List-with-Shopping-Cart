// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

// Display cart items
function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    total = 0;

    if(cart.length === 0){
        cartDiv.innerHTML = '<p>Your cart is empty.</p>';
    }

    cart.forEach((item, index) => {
        total += item.price * (item.quantity || 1);
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <div class="cart-item-left">
                <img src="images/${item.name.toLowerCase().replace(/ /g,'')}.jpg" alt="${item.name}" class="cart-img">
                <div>
                    <p class="cart-name">${item.name}</p>
                    <p class="cart-price">$${item.price}</p>
                </div>
            </div>
            <div class="cart-item-right">
                <input type="number" min="1" value="${item.quantity || 1}" onchange="updateQuantity(${index}, this.value)">
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        cartDiv.appendChild(div);
    });

    document.getElementById('total').innerText = total.toFixed(2);
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Update quantity
function updateQuantity(index, value) {
    cart[index].quantity = parseInt(value);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Clear cart
function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    displayCart();
}

displayCart();