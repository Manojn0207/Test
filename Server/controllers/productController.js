//Import the dependencies
const express = require('express');
const mongoose = require('mongoose');
//Creating a Router
var router = express.Router();
//Link
const Product = mongoose.model('Product');

//Router Controller for READ request
router.get('/', (req, res) => {
    res.render("product/productAddEdit", {
        viewTitle: "Insert a New product"
    });
});

//Router Controller for UPDATE request
router.post('/', (req, res) => {
    if (req.body._id == '')
        insertIntoMongoDB(req, res);
    else
        updateIntoMongoDB(req, res);
});

//Creating function to insert data into MongoDB
function insertIntoMongoDB(req, res) {
    var product = new Product();
    product.productName = req.body.productName;
    product.productDesc = req.body.productDesc;
    product.productPrice = req.body.productPrice;
    product.save((err, doc) => {
        if (!err)
            res.redirect('product/list');
        else
            console.log('Error during record insertion : ' + err);
    });
}

//Creating a function to update data in MongoDB
function updateIntoMongoDB(req, res) {
    Product.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('product/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("product/productAddEdit", {
                    //Retaining value to be displayed in the child view
                    viewTitle: 'Update Product Details',
                    employee: req.body
                });
            }
            else
                console.log('Error during updating the record: ' + err);
        }
    });
}

//Router to retrieve the complete list of available products
router.get('/list', (req, res) => {
    Product.find((err, docs) => {
        if (!err) {
            res.render("product/list", {
                list: docs
            });
        }
        else {
            console.log('Failed to retrieve the Product List: ' + err);
        }
    });
});

//Creating a function to implement input validations
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'productName':
                body['productNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

//Router to update a product using it's ID
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("product/productAddEdit", {
                viewTitle: "Update Product Details",
                product: doc
            });
        }
    });
});

//Router Controller for DELETE request
router.get('/delete/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/product/list');
        }
        else { console.log('Failed to Delete product Details: ' + err); }
    });
});

module.exports = router;