document.addEventListener("DOMContentLoaded", function () {
    fetchWines();
    setupCartButton();
});

// Fetch wine data from the server and display it
function fetchWines() {
    fetch("/wines")
        .then(response => response.json())
        .then(wines => displayWines(wines))
        .catch(error => console.error("Error loading wines:", error));
}

// Display the items in the cart
function displayCartItems(cartItems) {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = ""; // Clear previous content

    if (cartItems.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty!</p>";
    } else {
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <h3>${item.title}</h3>
                <p><strong>Variety:</strong> ${item.variety}</p>
                <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
                <button onclick="removeItem(${index})">Remove Item</button>
            `;
            cartList.appendChild(cartItem);
        });
    }
}


// Display wines on the page
function displayWines(wines) {
    const wineList = document.getElementById("wine-list");
    wineList.innerHTML = ""; // Clear previous content

    wines.forEach(wine => {
        const wineCard = document.createElement("div");
        wineCard.className = "wine-card";
        wineCard.innerHTML = `
            <h3>${wine.title}</h3>
            <p><strong>Variety:</strong> ${wine.variety}</p>
            <p><strong>Region:</strong> ${wine.region_1}</p>
            <p><strong>Winery:</strong> ${wine.winery}</p>
            <p><strong>Price:</strong> $${wine.price.toFixed(2)}</p>
            <button onclick="addToCart(${JSON.stringify(wine).replace(/"/g, '&quot;')})">Add to Cart</button>
        `;
        wineList.appendChild(wineCard);
    });
}

// Add item to cart
function addToCart(wine) {
    fetch("/add-to-cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wine)
    })
    .then(response => {
        if (response.ok) {
            alert("Added to cart!");
            updateViewCartButton();
        } else {
            alert("Failed to add item.");
        }
    })
    .catch(error => console.error("Error adding to cart:", error));
}

// Redirect to cart page
function setupCartButton() {
    document.getElementById("view-cart").addEventListener("click", function () {
        window.location.href = "/panier";
    });
}

// Show the "View Cart" button after adding an item
function updateViewCartButton() {
    let button = document.getElementById("view-cart");
    button.style.display = 'block';  // Make sure it's shown after item is added
}
