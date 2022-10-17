const mongoose = require('mongoose');

//Attributes of the product object
var productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: 'This field is required!'
    },
    productId: {
        type: String
    },
    productDesc: {
        type: String
    },
    productPrice: {
        type: String
    }
});

mongoose.model('Product', productSchema);