const express = require("express");
const router = express.Router();
const con = require("../lib/db_connections");

// GET ALL CATEGORIES
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM categories", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// GET A SINGLE CATEGORY BY ID
router.get("/:id", (req, res) => {
    try {
      con.query(`SELECT * FROM categories where category_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

// ADDING A CATEGORY
router.post('/', (req, res) => {
    const { name, description, thumbnail } = req.body
    try {
        con.query(`INSERT INTO categories (name, description, thumbnail) values ('${name}', '${description}', '${thumbnail}')`, 
        (err, result) => {
            if (err) throw err;
            res.send(result);
          }); 
    } catch (error) {
       console.log(err) 
    }
});

// DELETING A CATEGORY BY ID
router.delete("/:id", (req, res) => {
    try {
      con.query(`SELECT * FROM categories where category_id = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

  // UPDATE A CATEGORY BY ID
router.put('/:id', (req, res) => {
    const { name, description, thumbnail } = req.body
    try {
        con.query(`UPDATE categories set name='${name}', description='${description}', thumbnail='${thumbnail}' WHERE category_id=${req.params.id}`, 
        (err, result) => {
            if (err) throw err;
            res.send(result);
          }); 
    } catch (error) {
       console.log(err) 
    }
  });
module.exports = router;