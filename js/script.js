// ==================== CART LOGIC ====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ======== DISPLAY SIDEBAR CART ========
function displaySidebarCart(){
    const container = document.getElementById("cart-container");
    if(!container) return;
    container.innerHTML = "";

    if(cart.length === 0){
        container.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("sidebar-total").innerText = "0";
        document.getElementById("cart-count").innerText = "0";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        const leftDiv = document.createElement("div");
        leftDiv.classList.add("cart-item-left");

        const img = document.createElement("img");
        img.src = item.image;

        const nameDiv = document.createElement("div");
        nameDiv.innerHTML = `<strong>${item.name}</strong><span>Price: $${item.price.toFixed(2)}</span>`;

        // Quantity controls
        const qtyDiv = document.createElement("div");
        qtyDiv.classList.add("quantity-controls");

        const minusBtn = document.createElement("button");
        minusBtn.innerText = "-";
        minusBtn.onclick = () => changeQuantity(item.name, item.quantity - 1);

        const qtySpan = document.createElement("span");
        qtySpan.innerText = item.quantity;

        const plusBtn = document.createElement("button");
        plusBtn.innerText = "+";
        plusBtn.onclick = () => changeQuantity(item.name, item.quantity + 1);

        qtyDiv.append(minusBtn, qtySpan, plusBtn);
        nameDiv.appendChild(qtyDiv);

        leftDiv.append(img, nameDiv);

        const rightDiv = document.createElement("div");
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.onclick = () => removeItem(item.name);

        rightDiv.appendChild(removeBtn);
        itemDiv.append(leftDiv, rightDiv);

        container.appendChild(itemDiv);
    });

    document.getElementById("sidebar-total").innerText = total.toFixed(2);
    document.getElementById("cart-count").innerText = cart.reduce((sum,i)=>sum+i.quantity,0);
}

// ======== CART COUNT ========
function updateCartCount(){
    const count = cart.reduce((sum,i)=>sum+i.quantity,0);
    const cartCount = document.getElementById("cart-count");
    if(cartCount) cartCount.innerText = count;
}

// ======== ADD TO CART FUNCTION ========
function addToCart(button){
    const card = button.closest(".card");
    const name = card.querySelector("h3").innerText;
    const price = parseFloat(card.querySelector(".price").innerText.replace("$",""));
    const image = card.querySelector(".product-img").src;

    // Check if item already in cart
    const existing = cart.find(i => i.name === name);
    if(existing){
        existing.quantity += 1;
    } else {
        cart.push({name, price, image, quantity:1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displaySidebarCart();
    updateCartCount();
}

// ======== CHANGE QUANTITY ========
function changeQuantity(name, newQty){
    const item = cart.find(i => i.name === name);
    if(!item) return;
    if(newQty <= 0) removeItem(name);
    else item.quantity = newQty;

    localStorage.setItem("cart", JSON.stringify(cart));
    displaySidebarCart();
    updateCartCount();
}

// ======== REMOVE ITEM ========
function removeItem(name){
    cart = cart.filter(i => i.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    displaySidebarCart();
    updateCartCount();
}

// ======== CLEAR CART ========
function clearCart(){
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    displaySidebarCart();
    updateCartCount();
}

// ======== SEARCH PRODUCTS ========
function searchProducts(event) {
    const input = (event.target.value || "").toLowerCase().trim();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const name = card.querySelector("h3")?.innerText.toLowerCase().trim() || "";
        const desc = card.querySelector(".description")?.innerText.toLowerCase().trim() || "";
        const sellpoints = (card.dataset.sellpoints || "").toLowerCase().trim();

        // Split product name into words and check if any word starts with input
        const nameMatch = name.split(/\s+/).some(word => word.startsWith(input));
        // Also check description or sellpoints contains input anywhere
        const descMatch = desc.includes(input);
        const sellpointsMatch = sellpoints.includes(input);

        if(nameMatch || descMatch || sellpointsMatch){
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}
// Attach to both top and side search bars
document.getElementById("topSearch")?.addEventListener("keyup", searchProducts);
document.getElementById("sideSearch")?.addEventListener("keyup", searchProducts);



// ======== OPEN PRODUCT PAGE ========

function openProduct(card){
    const name = card.querySelector("h3").innerText;
    const price = parseFloat(card.querySelector(".price").innerText.replace("$",""));
    const stock = parseInt(card.dataset.stock) || 0;
    const images = card.dataset.images ? card.dataset.images.split(",") : [];
    const description = card.dataset.description || "";
    const sellpoints = card.dataset.sellpoints ? card.dataset.sellpoints.split(",") : [];

    const selectedProduct = { name, price, stock, images, description, sellpoints };
    localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));

    window.location.href = "product.html";
}

// Attach click event to all cards
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", function(e){
        // Prevent clicking the Add to Cart button from opening the product page
        if(e.target.tagName.toLowerCase() === "button") return;
        openProduct(card);
    });
});



// ======== SIDEBAR TOGGLE ========
const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("close-cart");

cartBtn?.addEventListener("click", ()=>cartSidebar.classList.add("active"));
closeCartBtn?.addEventListener("click", ()=>cartSidebar.classList.remove("active"));

// ======== INITIAL DISPLAY ========
displaySidebarCart();
updateCartCount();