const express = require("express");
const router = express.Router();
const con = require("../lib/db_connections");
const middleware = require("../middleware/auth");

// GET ALL PRODUCTS
router.get("/", (req, res) => {
  try {
    con.query(`SELECT * FROM products`, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET A SINGLE PRODUCT BY ID
router.get("/:id", (req, res) => {
  try {
    con.query(`SELECT * FROM products where product_id = ${req.params.id}`, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// ADDING A PRODUCT
router.post('/', middleware, (req, res) => {
  if (req.user.user_type === "admin"){
    const { sku, name, price, weight, descriptions, thumbnail, image, category, create_date, stock } = req.body
    try {
        con.query(`INSERT INTO products (sku, name, price, weight, descriptions, thumbnail, image, category, create_date, stock) values ('${sku}', '${name}', '${price}', '${weight}', '${descriptions}', '${thumbnail}', '${image}', '${category}', '${create_date}', '${stock}')`, 
        (err, result) => {
            if (err) throw err;
            res.send(result);
          }); 
    } catch (error) {
       console.log(err) 
    }
  }else {
    res.send("Access denied")
  };
});

// DELETE A PRODUCT BY ID
router.delete("/:id", middleware, (req, res) => {
  if (req.user.user_type === "admin"){
  try {
    con.query(`SELECT * FROM products where product_id = ${req.params.id}`, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}else {
  res.send("Access denied")
};
});

// UPDATE A PRODUCT BY ID
router.put('/:id', middleware, (req, res) => {
  if (req.user.user_type === "admin") {
  const { sku, name, price, descriptions, image, category, stock } = req.body
  try {
      con.query(`UPDATE products set sku='${sku}', name='${name}', price='${price}',  descriptions='${descriptions}', thumbnail='${thumbnail}', image='${image}', category='${category}', create_date='${create_date}', stock='${stock}' WHERE product_id=${req.params.id}`, 
      (err, result) => {
          if (err) throw err;
          res.send(result);
        }); 
  } catch (error) {
     console.log(err) 
  }
}else {
  res.send("Access denied")
};
});
module.exports = router;