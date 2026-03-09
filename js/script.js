let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(button) {
    const card = button.closest('.card');
    const name = card.querySelector("h3").innerText;
    const price = parseFloat(card.querySelector(".price").innerText.replace("$", ""));
    const imgSrc = card.querySelector(".product-img").src;

    let stock = parseInt(card.getAttribute("data-stock"));
    const existingProduct = cart.find(item => item.name === name);

    if (stock <= 0) {
        alert("Out of stock!");
        return;
    }

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, image: imgSrc, quantity: 1 });
    }

    stock -= 1;

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    card.setAttribute("data-stock", stock);
    card.querySelector(".stock-count").innerText = stock;

    if (stock === 0) {
        button.disabled = true;
        button.innerText = "Out of Stock";
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
function searchProducts() {

    const input = document.getElementById("searchInput").value.toLowerCase();
    const products = document.querySelectorAll(".card");

    products.forEach((product) => {

        const productName = product.querySelector("h3").innerText.toLowerCase();

        if (productName.includes(input)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

}
// Initialize cart count on page load
updateCartCount();

