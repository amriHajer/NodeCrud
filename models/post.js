const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    contenu: { type: String, required: true },
    datePost: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
