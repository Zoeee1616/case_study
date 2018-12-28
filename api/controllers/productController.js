const mongoose = require('mongoose');
const Product = mongoose.model('Product')
const rp = require('request-promise')
const request = require('request')

exports.fetch_product = async function(req, res){
    let id = req.params.id
    
    let redsky_api = `http://redsky.target.com/v2/pdp/tcin/${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`
    let full_response = await rp(redsky_api)
    //console.log(full_response.status);
    //if (full_response.status = 404) res.send("404 Error: Product not found in redsky api")
    let full_response_json = JSON.parse(full_response)

    let name = full_response_json["product"]["item"]["product_description"]["title"]

    let my_api_response = {
      "productId": id,
      "productName": name
    }

    // get product pricing information from MongoDB at mLab
    Product.find({'productId':id}, function(err, Product){
        if(err) res.send(err);
        
        // handle cases of product pricing not available for given productId in MongoDB
        if (typeof(Product[0]) == "undefined") {
            my_api_response.current_price = [{
                "value": "Product Price Not Available",
                "currency_code": "Product Price Not Available",
            }]
            res.send(my_api_response); 
        }
        else {
            const current_price_value = Product[0].current_price[0].value;
            const current_price_currency_code = Product[0].current_price[0].currency_code;
    
            // combine pricing info from MongoDB with info from redsky api into my_api_response
            my_api_response.current_price = [{
                "value":current_price_value,
                "currency_code": current_price_currency_code,
            }]
    
            res.send(my_api_response); 
        }
    }); 
}



exports.update_product = function(req, res){
    var new_product = new Product(req.body);
    new_product.save(function(err, product){ //call the save method on the instance of the model in a callback way
        if(err) res.send(err);
        console.log('item saved')
    });
}

exports.create_product = function(req, res){
    var new_product = new Product(req.body);
    new_product.save(function(err, product){ //call the save method on the instance of the model in a callback way
        if(err) res.send(err);
    // create a new item into Production collection 
    // const newProduct = new Product({
    //     productId: 13860428,
    //     current_price:{
    //         value: 13.49,
    //         currency_code: "USD",
    //     }
    // });

    // newProduct.save().then((result)=>{
    //     if(result) {
    //         console.log('new product inserted sccessfully');
    //         console.log(result);
    //     } else {
    //         console.log('failed to save new product');
    //     }
    // });
        console.log('item saved')
    });
}