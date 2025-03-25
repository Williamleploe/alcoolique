package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"text/template"
)

// Structure pour un vin
type Wine struct {
	Points         int     `json:"points"`
	Title          string  `json:"title"`
	Description    string  `json:"description"`
	TasterName     *string `json:"taster_name"`
	TasterTwitter  *string `json:"taster_twitter_handle"`
	Price          float64 `json:"price"`
	Designation    *string `json:"designation"`
	Variety        string  `json:"variety"`
	Region1        string  `json:"region_1"`
	Region2        *string `json:"region_2"`
	Province       string  `json:"province"`
	Country        string  `json:"country"`
	Winery         string  `json:"winery"`
}

// Fonction pour charger les données JSON à partir du fichier
func loadWinesFromFile(filename string) ([]Wine, error) {
	// Ouvrir le fichier JSON
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// Décoder les données JSON dans un slice de Wine
	var wines []Wine
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&wines); err != nil {
		return nil, err
	}

	return wines, nil
}

// Fonction pour afficher la page HTML avec les vins
func wineHandler(w http.ResponseWriter, r *http.Request) {
	// Charger les vins depuis le fichier JSON
	wines, err := loadWinesFromFile("wine-data-set.json") // Met à jour le nom du fichier ici
	if err != nil {
		http.Error(w, fmt.Sprintf("Erreur lors du chargement des vins : %v", err), http.StatusInternalServerError)
		return
	}

	// Template HTML
	tmpl := template.Must(template.ParseFiles("index.html"))
	tmpl.Execute(w, wines)
}

// Fonction pour servir des fichiers statiques (CSS, JS)
func serveStaticFiles() {
	// Définir le répertoire de fichiers statiques
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
}

func main() {
	// Servir les fichiers CSS et JS
	serveStaticFiles()

	// Gestionnaire pour la route principale
	http.HandleFunc("/", wineHandler)

	// Démarrer le serveur
	fmt.Println("Serveur démarré sur le port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
