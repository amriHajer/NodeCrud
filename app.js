const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models/User');
const Post = require('./models/Post');
const bodyParser = require('body-parser');
const MONGODB_URL = process.env.URL_mongoose;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connecte a la base de donne 
mongoose.connect('mongodb+srv://hajer:hajer@cluster0.sobpwnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Base de données connectée avec succès');
})
.catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});



// Route de login 
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "Nom d'utilisateur incorrect." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }
        res.status(200).json({ message: "Connexion réussie." });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ message: "Erreur du serveur lors de la connexion." });
    }
});


// route  register  user
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Cet utilisateur existe déjà." });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
    } catch (error) {
        console.error('Erreur  :', error);
    }
});






//all Posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({});
   
        res.json(posts);
    } catch (error) {
        // Gérer les erreurs
        console.error('Erreur lors de la récupération des posts :', error);
        res.status(500).json({ message: 'Erreur du serveur lors de la récupération des posts.' });
    }
});



//créer un post
app.post('/addPost', async (req, res) => {
    try {
        let newPost = new Post({
            auteur: req.body.auteur,
            contenu: req.body.contenu,
            datePost: req.body.datePost
        });
        await newPost.save();
        res.send('Ajout effectué avec succès');
    } catch (error) {
        console.error('Erreur lors de la création du post :', error);
        res.status(500).send('Une erreur est survenue lors de la création du post');
    }
});


//update post

app.put('/updatePost/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const updatedPost = req.body; 
        const nvPost = await Post.findByIdAndUpdate(postId, updatedPost, { new: true });
        res.json(nvPost);
    } catch (error) {
        console.error('Erreur  :', error);
        res.status(500).send('Une erreur lors de la mise à jour du post');
    }
});



//delete post
app.delete('/deletePost/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        await Post.findByIdAndDelete(postId);
        res.json({ message: 'Post supprimé avec succès' });
    } catch (error) {
        console.error('Erreur :', error);
        res.status(500).send('Une erreur lors de la suppression du post');
    }
});




//creation de serveur
app.listen(3000, () => {
    console.log('listening on port 3000');
});




//mongodb+srv://hajer:hajer@cluster0.sobpwnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



