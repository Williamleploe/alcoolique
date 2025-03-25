// Static wine data (4 wines)
const wines = [
    {
        "points": 88,
        "title": "Martin Ray 2015 Pinot Noir (Green Valley)",
        "description": "Strawberry, vanilla and smoke overlay deep blue fruit in this seamless, velvety wine. Light-bodied, it wields vibrant acidity and moderate, spicy highlights.",
        "price": 35,
        "variety": "Pinot Noir",
        "region_1": "Green Valley",
        "winery": "Martin Ray"
    },
    {
        "points": 88,
        "title": "William Church 2014 Gamache Vineyards Malbec",
        "description": "This 100% varietal wine comes from older plantings at this vineyard. Aromas of plum, barrel spice and herb are up front followed by sweet black-fruit flavors.",
        "price": 40,
        "variety": "Malbec",
        "region_1": "Columbia Valley (WA)",
        "winery": "William Church"
    },
    {
        "points": 88,
        "title": "Wilson 2014 Sawyer Estate Zinfandel",
        "description": "High-toned acidity complements the generous, brambly black fruit and brown sugar notes in this wine, its savory undertone recalling leather and coffee.",
        "price": 42,
        "variety": "Zinfandel",
        "region_1": "Dry Creek Valley",
        "winery": "Wilson"
    },
    {
        "points": 88,
        "title": "Wither Hills 2015 Rosé of Pinot Noir",
        "description": "Despite a pale hue and only 12.5% abv, this is a fairly weighty wine on the palate. It's dry and silky in texture, with hints of mossy forest-floor complexity to go along with pear and melon fruit.",
        "price": 14,
        "variety": "Pinot Noir",
        "region_1": "Marlborough",
        "winery": "Wither Hills"
    }
];

// Function to generate wine items in the catalog
function generateWineCatalog(wines) {
    const catalogContainer = document.getElementById('wine-catalog');

    wines.forEach(wine => {
        const wineItem = document.createElement('div');
        wineItem.classList.add('wine-item');

        // Populate wine item content dynamically
        wineItem.innerHTML = `
            <img src="https://via.placeholder.com/300x200" alt="${wine.title}">
            <div class="wine-details">
                <h3>${wine.title}</h3>
                <p><strong>Variety:</strong> ${wine.variety}</p>
                <p><strong>Region:</strong> ${wine.region_1 ? wine.region_1 : 'Unknown'}</p>
                <p><strong>Description:</strong> ${wine.description}</p>
                <p class="price">$${wine.price}</p>
                <button>Add to Cart</button>
            </div>
        `;

        catalogContainer.appendChild(wineItem);
    });
}

// Call the function to display the wines
generateWineCatalog(wines);
