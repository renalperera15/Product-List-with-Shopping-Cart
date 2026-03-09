let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    total = 0;

    if(cart.length === 0) {
        cartDiv.innerHTML = '<p>Your cart is empty.</p>';
    }

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

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    displayCart();
}

// Display cart on page load
displayCart();