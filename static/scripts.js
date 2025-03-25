// script.js

// Fonction pour charger les données à partir du fichier JSON
function loadWines() {
    const wines = [
        {
            "points": 89,
            "title": "Caymus 1998 Cabernet Sauvignon (Napa Valley)",
            "description": "Creamy black cherry aromas layered with fresh brussel sprouts and spicy arugula flavors of red plums and toasted oak.",
            "taster_name": null,
            "taster_twitter_handle": null,
            "price": 70,
            "designation": null,
            "variety": "Cabernet Sauvignon",
            "region_1": "Napa Valley",
            "region_2": "Napa",
            "province": "California",
            "country": "US",
            "winery": "Caymus"
        },
        {
            "points": 98,
            "title": "M. Chapoutier 1999 Le Méal Ermitage  (Hermitage)",
            "description": "Chapoutier's selections of the best parcels of vines in Hermitage are set to become legendary. Sold under the ancient spelling of the appellation name (Ermitage), they represent the epitome of the power and concentration that lies behind the reputation of the appellation. This cuvée is the best of the collection, with its brooding, opaque character, suggesting rather than revealing power at this stage. Age it until your new-born baby is old enough to drink, and it will be just about ready.",
            "taster_name": "Roger Voss",
            "taster_twitter_handle": "@vossroger",
            "price": 150,
            "designation": "Le Méal Ermitage",
            "variety": "Rhône-style Red Blend",
            "region_1": "Hermitage",
            "region_2": null,
            "province": "Rhône Valley",
            "country": "France",
            "winery": "M. Chapoutier"
        },
        {
            "points": 97,
            "title": "J.L. Chave 1999  Hermitage",
            "description": "Jean-Louis, the son of Gérard Chave, is now in charge of the family business, as well as being president of the Hermitage wine producers. He is continuing the family tradition of making powerful statements of Syrah from Hermitage, combining massive structure and over-powering perfumes. This 1999 seems to have the best of the traditional world of tannic immensity and the modern world of beautiful, ripe fruit. A wine that will age for a very long time.",
            "taster_name": "Roger Voss",
            "taster_twitter_handle": "@vossroger",
            "price": 125,
            "designation": null,
            "variety": "Rhône-style Red Blend",
            "region_1": "Hermitage",
            "region_2": null,
            "province": "Rhône Valley",
            "country": "France",
            "winery": "J.L. Chave"
        }
    ];

    // Affichage des vins
    displayWines(wines);
}

// Fonction pour afficher les vins sur la page
function displayWines(wines) {
    const wineContainer = document.getElementById('wine-cards');
    
    wines.forEach(wine => {
        // Création de la carte pour chaque vin
        const wineCard = document.createElement('div');
        wineCard.classList.add('wine-card');
        
        wineCard.innerHTML = `
            <h3>${wine.title}</h3>
            <p><strong>Points :</strong> ${wine.points}</p>
            <p><strong>Prix :</strong> ${wine.price}€</p>
            <p><strong>Région :</strong> ${wine.region_1}, ${wine.province}</p>
            <p><strong>Varieté :</strong> ${wine.variety}</p>
            <p><strong>Winery :</strong> ${wine.winery}</p>
            <p><strong>Description :</strong> ${wine.description}</p>
            <p class="price">Prix: ${wine.price}€</p>
        `;
        
        // Ajout de la carte dans le conteneur
        wineContainer.appendChild(wineCard);
    });

    // Exemple de script simple pour ajouter une fonctionnalité dynamique si nécessaire
document.addEventListener('DOMContentLoaded', function() {
    console.log('Le document est prêt !');
});

}

// Appeler la fonction pour charger les vins à la page chargée
document.addEventListener('DOMContentLoaded', loadWines);
