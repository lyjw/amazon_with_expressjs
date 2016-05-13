var express = require('express');
var router = express.Router();
var Product = require("../models/product");

router.get('/new', function(req, res, next) {
  res.render('products/new', { errors: {} });
});

router.post('/', function(req, res, next) {
  var product = new Product ( { name: req.body.name,
                                   description: req.body.description,
                                   price: req.body.price });

  product.save(function(err, product) {
    if (err) {
      res.render('products/new', { errors: err.errors });
    } else {
      // console.log(product);
      res.redirect('/products/' + product._id);
    }
  });
});

router.get('/:id', function(req, res) {
  Product.findOne({ _id: req.params.id }, function(err, product) {
    if (err) {
      res.end("Error!");
    } else {
      res.render("products/show", { product : product });
    }
  });
});

router.delete('/:id', function(req, res, next) {
  Product.remove( { _id: req.params.id }, function(err, product) {
    if (err) {
      next(err);
    } else {
      req.flash('info', 'Product deleted!');
      res.redirect('/products/');
    }
  })
});

router.patch('/:id', function(req, res) {
  // Product.findOne({ _id: req.params.id }, function(err, product) {
  //
  //   product.name = req.body.name;
  //   product.description = req.body.description;
  //   product.price = req.body.price;
  //
  //   product.save(function(err, product) {
  //     if (err) {
  //       res.end("Error!");
  //     } else {
  //       res.render("products/show", { product : product });
  //     }
  //   });
  // });
  //
  var updated_product = { name: req.body.name,
                              description: req.body.description,
                              price: req.body.price };

  var options = { new: true };

  Product.findOneAndUpdate( { _id: req.params.id }, updated_product, options, function(err, product) {
    if (err) {
      next(err);
    } else {
      res.redirect('/products/' + product._id);
    }
  });
});

router.get('/:id/edit', function(req, res, next) {
  Product.findOne({ _id: req.params.id }, function(err, product) {
    if (err) {
      // next(newError("Product does not exist."));
      res.render("error", { message: "Product does not exist.",
                               error: { status: 404 }});
    } else {
      res.render("products/edit", { product: product, errors: {} });
    }
  });
});

router.get('/', function(req, res, next) {
  Product.find({}, function(err, products) {
    if (err) {
      next(err);
    } else if (products) {
      res.render('products/index', { products: products });
    } else {
      next(new Error("Failed to load products."));
    }
  });
});

module.exports = router;
