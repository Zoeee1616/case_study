'use strict';

module.exports = function(app){
    let product = require('../controllers/productController')

    app.route('/products/:id')
        //reuising the products/productId route for get and put and delete http method
        .get(product.fetch_product)
  		.post(product.create_product)
        .put(product.update_product);

        
};