package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"text/template"
)

// Wine struct
// Wine struct with Quantity field
// Wine struct with Quantity and TotalPrice field


type Wine struct {
    Points      int     `json:"points"`
    Title       string  `json:"title"`
    Description string  `json:"description"`
    Price       float64 `json:"price"`
    Variety     string  `json:"variety"`
    Region1     string  `json:"region_1"`
    Winery      string  `json:"winery"`
    Quantity    int     `json:"quantity"`     // Field to track quantity
    TotalPrice  float64 // New field to store the calculated total price (Price * Quantity)
}


// Cart structure (in-memory storage)
var cart = struct {
	sync.Mutex
	Items []Wine
}{}

// Load wines from JSON file
func loadWines() ([]Wine, error) {
	file, err := os.Open("static/wine-data-set.json")
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var wines []Wine
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&wines); err != nil {
		return nil, err
	}
	return wines, nil
}

// Handle clearing the cart
func clearCart(w http.ResponseWriter, r *http.Request) {
    log.Println("Received DELETE request to /clear-cart") // Log the request

    // Lock cart to prevent concurrent modification
    cart.Lock()
    cart.Items = []Wine{} // Clear all items in the cart
    cart.Unlock()

    log.Println("Cart cleared")

    // Send a success response
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("Cart cleared"))
}

// Serve history page
func serveHistory(w http.ResponseWriter, r *http.Request) {
    log.Println("Serving history page at /history")
    tmpl := template.Must(template.ParseFiles("static/history.html"))
    tmpl.Execute(w, nil)
}


// Serve wines as JSON
func serveWines(w http.ResponseWriter, r *http.Request) {
	wines, err := loadWines()
	if err != nil {
		http.Error(w, "Error loading wines", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(wines)
}

// Serve index.html with wine data
func serveHTML(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("static/accueil.html"))
	wines, err := loadWines()
	if err != nil {
		http.Error(w, "Error loading wines", http.StatusInternalServerError)
		return
	}
	tmpl.Execute(w, wines)
}

// Handle adding to cart
// Handle adding to cart
// Handle adding to cart
// Handle adding to cart
func addToCart(w http.ResponseWriter, r *http.Request) {
    log.Println("Received POST request to /add-to-cart")

    var newItem Wine
    err := json.NewDecoder(r.Body).Decode(&newItem)
    if err != nil {
        http.Error(w, "Invalid request", http.StatusBadRequest)
        log.Printf("Error decoding wine item: %v", err)
        return
    }

    cart.Lock()
    defer cart.Unlock()

    // Check if the item already exists in the cart
    for i, wine := range cart.Items {
        if wine.Title == newItem.Title { // Match by title
            cart.Items[i].Quantity++ // Increase quantity
            log.Printf("Increased quantity of %s to %d", wine.Title, cart.Items[i].Quantity)
            w.WriteHeader(http.StatusOK)
            return
        }
    }

    // If the item is new, add it with Quantity = 1
    newItem.Quantity = 1
    cart.Items = append(cart.Items, newItem)
    log.Printf("Added new item: %+v", newItem)
    w.WriteHeader(http.StatusOK)
}



// Serve cart page (panier.html)
// Serve cart page (panier.html)
func serveCart(w http.ResponseWriter, r *http.Request) {
    tmpl := template.Must(template.ParseFiles("static/panier.html"))

    // Lock cart to prevent concurrent modification
    cart.Lock()
    defer cart.Unlock()

    // Calculate total price for each item and the overall total price
    var totalPrice float64
    for i := range cart.Items {
        // Calculate total price for this wine item
        cart.Items[i].TotalPrice = cart.Items[i].Price * float64(cart.Items[i].Quantity)
        totalPrice += cart.Items[i].TotalPrice // Add to the total cart price
    }

    // Pass cart items and total price to the template
    cartData := struct {
        Items     []Wine
        TotalPrice float64
    }{
        Items:     cart.Items,
        TotalPrice: totalPrice,
    }

    // Execute the template with the cart data (including the total price)
    tmpl.Execute(w, cartData)
}


// Handle removing a single item from the cart
func removeFromCart(w http.ResponseWriter, r *http.Request) {
    log.Println("Received POST request to /remove-from-cart")

    var item Wine
    err := json.NewDecoder(r.Body).Decode(&item)
    if err != nil {
        http.Error(w, "Invalid request", http.StatusBadRequest)
        log.Printf("Error decoding item: %v", err)
        return
    }

    cart.Lock()
    defer cart.Unlock()

    for i, wine := range cart.Items {
        if wine.Title == item.Title {
            if cart.Items[i].Quantity > 1 {
                cart.Items[i].Quantity-- // Reduce quantity
                log.Printf("Reduced quantity of %s to %d", wine.Title, cart.Items[i].Quantity)
            } else {
                cart.Items = append(cart.Items[:i], cart.Items[i+1:]...) // Remove item if quantity is 1
                log.Printf("Removed item: %+v", item)
            }
            w.WriteHeader(http.StatusOK)
            return
        }
    }

    http.Error(w, "Item not found", http.StatusNotFound)
}

func serveAccueil(w http.ResponseWriter, r *http.Request) {
    log.Println("Serving accueil page at /accueil")
    tmpl := template.Must(template.ParseFiles("static/accueil.html"))
    tmpl.Execute(w, nil)
}

// Serve the shop page (Shop.html)
func serveShop(w http.ResponseWriter, r *http.Request) {
    log.Println("Serving shop page at /shop")
    tmpl := template.Must(template.ParseFiles("static/Shop.html")) // Make sure you rename index.html to Shop.html
    tmpl.Execute(w, nil)
}

func serveSign(w http.ResponseWriter, r *http.Request) {
    log.Println("Serving sign page at /sign")
    tmpl := template.Must(template.ParseFiles("static/sign.html"))
    tmpl.Execute(w, nil)
}

func serveConception(w http.ResponseWriter, r *http.Request) {
	log.Println("Serving conception page at /conception")
	tmpl := template.Must(template.ParseFiles("static/conception.html"))
	tmpl.Execute(w, nil)
}


// Serve contact page (contact.html)
func serveContact(w http.ResponseWriter, r *http.Request) {
	log.Println("Serving contact page at /contact")
	tmpl := template.Must(template.ParseFiles("static/contact.html"))
	tmpl.Execute(w, nil)
}

func serveSuggestions(w http.ResponseWriter, r *http.Request) {
	log.Println("Serving suggestions page at /suggestions")
	tmpl := template.Must(template.ParseFiles("static/suggestions.html"))
	tmpl.Execute(w, nil)
}

func main() {
    // Serve static files
    http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
    http.HandleFunc("/wines", serveWines)
    http.HandleFunc("/clear-cart", clearCart)  // Clear cart route
    http.HandleFunc("/remove-from-cart", removeFromCart) // Remove one item
    http.HandleFunc("/accueil", serveAccueil)  // Serve accueil.html
    http.HandleFunc("/shop", serveShop)        // Serve Shop.html (previously index.html)
    http.HandleFunc("/panier", serveCart)      // Serve panier.html
    http.HandleFunc("/sign", serveSign)        // Serve sign.html (new route)
	http.HandleFunc("/conception", serveConception)
	http.HandleFunc("/history", serveHistory)
	http.HandleFunc("/contact", serveContact)
	http.HandleFunc("/suggestions", serveSuggestions) 
    // Define other routes

    http.HandleFunc("/", serveHTML)          // Home page route (index.html)
    http.HandleFunc("/add-to-cart", addToCart) // Add to cart route

    fmt.Println("Server running at http://localhost:9090")
    log.Fatal(http.ListenAndServe(":9090", nil))
}