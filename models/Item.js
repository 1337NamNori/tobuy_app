const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
    name: {type: String, require},
    price: {type: Number, require},
},{
    timestamps: true,
});

module.exports = mongoose.model('Item',Item);