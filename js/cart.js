let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Helper: consolidate duplicates and sum quantities
function consolidateCart() {
    const consolidated = [];
    cart.forEach(item => {
        const existing = consolidated.find(i => i.name === item.name);
        if (existing) {
            existing.quantity += item.quantity || 1;
        } else {
            consolidated.push({ ...item, quantity: item.quantity || 1 });
        }
    });
    return consolidated;
}

// Get stock available from the product list
function getStock(name) {
    const productCard = Array.from(document.querySelectorAll(".card"))
        .find(card => card.querySelector("h3").innerText === name);
    if (productCard) {
        return parseInt(productCard.getAttribute("data-stock")) + getCartQuantity(name);
    }
    return Infinity; // fallback if not found
}

// Get current cart quantity of a product
function getCartQuantity(name) {
    const productInCart = cart.find(item => item.name === name);
    return productInCart ? productInCart.quantity : 0;
}

function displayCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartDiv.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("total").innerText = "0";
        return;
    }

    const displayCartData = consolidateCart();

    displayCartData.forEach((item) => {
        total += item.price * item.quantity;

        // Main container
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        // Left: image + name
        const leftDiv = document.createElement("div");
        leftDiv.classList.add("cart-item-left");

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        img.classList.add("cart-img");

        const nameDiv = document.createElement("div");
        const nameP = document.createElement("p");
        nameP.classList.add("cart-name");
        nameP.innerText = item.name;

        nameDiv.appendChild(nameP);
        leftDiv.appendChild(img);
        leftDiv.appendChild(nameDiv);

        // Right: quantity + price + remove button
        const rightDiv = document.createElement("div");
        rightDiv.classList.add("cart-item-right");

        // Quantity input
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = 1;
        quantityInput.value = item.quantity;
        quantityInput.style.width = "50px";
        quantityInput.onchange = (e) => {
            let newQty = parseInt(e.target.value);
            const stockAvailable = getStock(item.name);
            if (newQty > stockAvailable) {
                newQty = stockAvailable;
                alert(`Only ${stockAvailable} items available in stock!`);
            }
            updateQuantity(item.name, newQty);
        };

        // Price
        const priceP = document.createElement("p");
        priceP.classList.add("cart-price");
        priceP.style.margin = "0 10px";
        priceP.innerText = `$${(item.price * item.quantity).toFixed(2)}`;

        // Remove button
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.classList.add("clear-btn");
        removeBtn.onclick = () => removeItem(item.name);

        rightDiv.appendChild(quantityInput);
        rightDiv.appendChild(priceP);
        rightDiv.appendChild(removeBtn);

        // Combine
        itemDiv.appendChild(leftDiv);
        itemDiv.appendChild(rightDiv);

        cartDiv.appendChild(itemDiv);
    });

    document.getElementById("total").innerText = total.toFixed(2);
}

// Update quantity of a product
function updateQuantity(name, newQty) {
    if (newQty < 1) return;

    // Update only up to stock limit
    const stockAvailable = getStock(name);
    if (newQty > stockAvailable) newQty = stockAvailable;

    cart.forEach(item => {
        if (item.name === name) item.quantity = newQty;
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Remove a product completely
function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Clear cart completely
function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    displayCart();
}

// Initialize
displayCart();