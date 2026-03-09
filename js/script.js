let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add product to cart
function addToCart(button) {
    const card = button.closest('.card');
    const name = card.querySelector("h3").innerText;
    const price = parseFloat(card.querySelector(".price").innerText.replace("$", ""));
    const imgSrc = card.querySelector(".product-img").src;
    let stock = parseInt(card.getAttribute("data-stock"));

    // Check if product is already in the cart
    const existingProduct = cart.find(item => item.name === name);

    if (stock > 0) {
        if (existingProduct) {
            // Increase quantity but not exceed stock
            if (existingProduct.quantity < stock) {
                existingProduct.quantity += 1;
                stock -= 1;
            } else {
                alert("You have reached the maximum stock for this item!");
            }
        } else {
            cart.push({ name, price, image: imgSrc, quantity: 1 });
            stock -= 1;
        }

        // Update local storage and UI
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();

        card.setAttribute("data-stock", stock);
        card.querySelector(".stock-count").innerText = stock;

        if (stock === 0) {
            button.disabled = true;
            button.innerText = "Out of Stock";
        }
    }
}

// Update cart count in header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = count;
    }
}

// Initialize cart count on page load
updateCartCount();