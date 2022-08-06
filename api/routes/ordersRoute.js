const express = require("express");
const router = express.Router();
const con = require("../lib/db_connections");

// GET ALL ORDERS
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM orders", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET A SINGLE ORDER BY ID
router.get("/:id", (req, res) => {
    try {
      con.query(`SELECT * FROM orders where order_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

// ADDING AN ORDER
router.post('/', (req, res) => {
    const { user_id, amount, shipping_address, order_email, order_date, order_status } = req.body
    try {
        con.query(`INSERT INTO orders (amount, user_id, shipping_address, order_email, order_date, order_status) values ('${amount}','${user_id}', '${shipping_address}', '${order_email}', '${order_date}', '${order_status}')`, 
        (err, result) => {
            if (err) throw err;
            res.send(result);
          }); 
    } catch (error) {
       console.log(err) 
    }
});

// DELETING A SINGLE ORDER BY ID
router.delete("/:id", (req, res) => {
    try {
      con.query(`SELECT * FROM orders where order_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

// UPDATE A ORDER BY ID
router.put('/:id', (req, res) => {
    const { amount, shipping_address, order_email, order_date, order_status } = req.body
    try {
        con.query(`UPDATE orders set amount=${amount}, shipping_address='${shipping_address}', order_email='${order_email}', order_date='${order_date}', order_status='${order_status}' WHERE order_id=${req.params.id}`, 
        (err, result) => {
            if (err) throw err;
            res.send(result);
          }); 
    } catch (error) {
       console.log(err) 
    }
  });
module.exports = router;