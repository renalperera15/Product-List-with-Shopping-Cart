// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

// Display cart items
function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            ${item.name} - $${item.price}
            <button onclick="removeItem(${index})">Remove</button>
        `;
        cartDiv.appendChild(div);
    });

    document.getElementById('total').innerText = total;
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
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