document.addEventListener("DOMContentLoaded", function () {
    // Set up language switch event listeners
    document.querySelectorAll(".lang-switch").forEach(button => {
        button.addEventListener("click", function () {
            const selectedLang = this.getAttribute("data-lang");

            // Save language preference in a cookie
            document.cookie = `lang=${selectedLang}; path=/; max-age=2592000`; // 30 days

            // Reload the page to apply the language change
            location.reload();
        });
    });
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
        cartList.innerHTML = `<p id="cart-empty">Your cart is empty!</p>`;
    } else {
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <h3>${item.title}</h3>
                <p><strong>Variety:</strong> ${item.variety}</p>
                <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
                <button onclick="removeItem(${index})" class="remove-btn">Remove Item</button>
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
            <button class="add-cart-btn" data-wine='${JSON.stringify(wine)}'>${getTranslation("add-to-cart")}</button>
        `;

        // Attach event listener to button
        wineCard.querySelector(".add-cart-btn").addEventListener("click", function () {
            addToCart(JSON.parse(this.getAttribute("data-wine")));
        });

        wineList.appendChild(wineCard);
    });
}

// Add item to cart
function addToCart(wine) {
    fetch("/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wine)
    })
    .then(response => {
        if (response.ok) {
            alert(getTranslation("added-to-cart"));
            updateViewCartButton();
        } else {
            alert(getTranslation("failed-to-add"));
        }
    })
    .catch(error => console.error("Error adding to cart:", error));
}

// Remove item from cart (Implementation needed in server)
function removeItem(index) {
    fetch("/remove-from-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index: index })
    })
    .then(response => {
        if (response.ok) {
            location.reload(); // Refresh cart
        } else {
            alert(getTranslation("remove-fail"));
        }
    })
    .catch(error => console.error("Error removing item:", error));
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

/* Language Support */
function getTranslation(key) {
    const lang = localStorage.getItem("lang") || "en";
    const translations = {
        en: {
            "add-to-cart": "Add to Cart",
            "added-to-cart": "Added to cart!",
            "failed-to-add": "Failed to add item.",
            "cart-empty": "Your cart is empty!",
            "remove-fail": "Failed to remove item."
        },
        fr: {
            "add-to-cart": "Ajouter au Panier",
            "added-to-cart": "Ajouté au panier!",
            "failed-to-add": "Échec de l'ajout de l'article.",
            "cart-empty": "Votre panier est vide!",
            "remove-fail": "Échec de la suppression de l'article."
        }
    };

    return translations[lang][key] || key;
}

// Apply translations on load
function applyLanguage() {
    document.querySelectorAll(".add-cart-btn").forEach(btn => {
        btn.textContent = getTranslation("add-to-cart");
    });

    const cartEmptyText = document.getElementById("cart-empty");
    if (cartEmptyText) {
        cartEmptyText.textContent = getTranslation("cart-empty");
    }
}
