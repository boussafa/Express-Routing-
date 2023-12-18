const express = require('express');
const app = express();
const port = 3000;

// Middleware pour vérifier l'heure de la requête
const timeMiddleware = (req, res, next) => {
    const currentTime = new Date();
    const dayOfWeek = currentTime.getDay();
    const currentHour = currentTime.getHours();

    // Vérifiez si c'est un jour de la semaine (du lundi au vendredi) et si l'heure est entre 9h et 17h
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && currentHour >= 9 && currentHour < 17) {
        next();
    } else {
        res.send('L\'application est disponible uniquement pendant les heures de travail (du lundi au vendredi, de 9h à 17h).');
    }
};

// Utilisez le middleware pour l'ensemble de l'application
app.use(timeMiddleware);

// Utilisez EJS comme moteur de modèle
app.set('view engine', 'ejs');

// Servez les fichiers statiques (CSS)
app.use(express.static('public'));

// Définissez les itinéraires
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Lancez le serveur
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});
