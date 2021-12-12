const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ZonaSchema = new Schema({
    zona: {type: String, required: true}
});

module.exports = mongoose.model('zonas', ZonaSchema);
