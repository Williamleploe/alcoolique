// Example wine data with French and English content
const wineData = [
    {
      "points": 88,
      "title_fr": "Tasca d'Almerita 2016 Cavallo delle Fate Grillo (Sicilia)",
      "description_fr": "Des arômes de fruits jaunes, de poire et de fruits tropicaux dominent le nez. Sur le palais vif, une acidité éclatante met en valeur les saveurs de pêche jaune et de melon miel qui persistent dans la finition croquante.",
      "title_en": "Tasca d'Almerita 2016 Cavallo delle Fate Grillo (Sicilia)",
      "description_en": "Yellow stone fruit, pear and tropical fruit aromas lead the nose. On the zesty palate, bright acidity underscores yellow peach and honeydew melon flavors that linger into the crisp finish.",
      "price": 20,
      "winery": "Tasca d'Almerita"
    },
    // More wine items...
  ];
  
  // Set default language to French if not set
  if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'fr');
  }
  
  // Toggle between French and English
  function toggleLanguage() {
      const currentLang = localStorage.getItem('language');
      const newLang = currentLang === 'fr' ? 'en' : 'fr';
      localStorage.setItem('language', newLang);
      updateContent(newLang);
  }
  
  // Function to update all page content based on the selected language
  function updateContent(language) {
      const homeTitle = document.getElementById('home-title');
      const homeText = document.getElementById('home-text');
      const languageButton = document.getElementById('language-switcher');
      
      // Update navigation links
      const homeLink = document.getElementById('home-link');
      const suggestionsLink = document.getElementById('suggestions-link');
      const histoireLink = document.getElementById('histoire-link');
      const conceptionLink = document.getElementById('conception-link');
      const contactLink = document.getElementById('contact-link');
      const panierLink = document.getElementById('panier-link');
      const compteLink = document.getElementById('compte-link');
  
      // Home page content
      if (language === 'fr') {
          homeTitle.textContent = "Bienvenue dans l'univers du Vin Immersif";
          homeText.textContent = "Découvrez l'histoire, la conception et les vins qui vous ressemblent.";
          languageButton.textContent = "Switch to English";
          
          // Update navigation links to French
          homeLink.textContent = "Accueil";
          suggestionsLink.textContent = "Vins du mois";
          histoireLink.textContent = "Histoire du vin";
          conceptionLink.textContent = "Conception du vin";
          contactLink.textContent = "Contact";
          panierLink.textContent = "Panier";
          compteLink.textContent = "Compte";
      } else {
          homeTitle.textContent = "Welcome to the Immersive Wine World";
          homeText.textContent = "Discover the history, design, and wines that match your taste.";
          languageButton.textContent = "Passer en Français";
          
          // Update navigation links to English
          homeLink.textContent = "Home";
          suggestionsLink.textContent = "Wines of the Month";
          histoireLink.textContent = "History of Wine";
          conceptionLink.textContent = "Wine Making Process";
          contactLink.textContent = "Contact";
          panierLink.textContent = "Cart";
          compteLink.textContent = "Account";
      }
  
      // Update wine catalog
      if (window.location.pathname.includes('suggestions.html')) {
          loadWineCatalog(language);
      }
      if (window.location.pathname.includes('panier.html')) {
          loadCartPage(language);
      }
  }
  
  // Function to load wine catalog for suggestions page
  function loadWineCatalog(language) {
      const wineCatalog = document.getElementById('wine-catalog');
      wineCatalog.innerHTML = ''; // Clear previous content
  
      wineData.forEach(wine => {
          const wineItem = document.createElement('div');
          wineItem.classList.add('wine-item');
  
          const wineImage = document.createElement('img');
          wineImage.src = 'wine.jpg'; // Use your image path or dynamic image
          wineImage.alt = wine.title_fr;
  
          const wineTitle = document.createElement('p');
          wineTitle.textContent = language === 'fr' ? wine.title_fr : wine.title_en;
  
          const wineDescription = document.createElement('p');
          wineDescription.textContent = language === 'fr' ? wine.description_fr : wine.description_en;
  
          const addToCartButton = document.createElement('button');
          addToCartButton.textContent = language === 'fr' ? "Ajouter au panier" : "Add to Cart";
          addToCartButton.addEventListener('click', function() {
              alert(language === 'fr' ? wine.title_fr + " ajouté au panier!" : wine.title_en + " added to cart!");
          });
  
          wineItem.appendChild(wineImage);
          wineItem.appendChild(wineTitle);
          wineItem.appendChild(wineDescription);
          wineItem.appendChild(addToCartButton);
  
          wineCatalog.appendChild(wineItem);
      });
  }
  
  // Function to load cart page content
  function loadCartPage(language) {
      const cartDisplay = document.getElementById('cart-display');
      cartDisplay.innerHTML = language === 'fr' ? "<p>Votre panier est vide.</p>" : "<p>Your cart is empty.</p>";
  }
  
  // Initialize the page based on the current language setting
  window.onload = function() {
      const currentLang = localStorage.getItem('language');
      updateContent(currentLang);
  }
  