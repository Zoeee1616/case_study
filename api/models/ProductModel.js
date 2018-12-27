'use strict';
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var ProductSchema = new Schema({  
    productId: { 
        type: Number,
        min: 0, 
        index: true,
        required: 'Duplicate product found'
    },
    current_price: [{ 
        value: Number, 
        currency_code: String 
    }]
    
});

module.exports = mongoose.model('Product', ProductSchema);