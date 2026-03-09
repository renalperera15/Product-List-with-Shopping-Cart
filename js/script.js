let cart = []
let total = 0

function addToCart(name, price){

cart.push({name, price})

total += price

displayCart()

}

function displayCart(){

let cartDiv = document.getElementById("cart")

cartDiv.innerHTML = ""

cart.forEach((item, index)=>{

let div = document.createElement("div")

div.classList.add("cart-item")
div.innerHTML = `
${item.name} - $${item.price}
<button onclick="removeItem(${index})">Remove</button>
`

cartDiv.appendChild(div)

})

document.getElementById("total").innerText = total

}

function removeItem(index){

total -= cart[index].price

cart.splice(index,1)

displayCart()

}