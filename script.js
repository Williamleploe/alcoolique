// Exemple d'ajout au panier (logique simple)
document.querySelectorAll('.wine-item button').forEach(button => {
    button.addEventListener('click', function() {
        alert('Le vin a été ajouté au panier!');
    });
});
