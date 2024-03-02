const express = require('express');
const router = express.Router();

// Route pour la page de profil
router.get('/', (req, res) => {
    // Vous pouvez récupérer les informations de l'utilisateur depuis la session ou la base de données
    const username = "Utilisateur"; // Par exemple, récupérez le nom d'utilisateur

    // Affichez la vue du profil avec les informations de l'utilisateur
    res.render('profile', { username }); // Chargez la vue de profil (profile.ejs) avec les données de l'utilisateur
});

module.exports = router;
