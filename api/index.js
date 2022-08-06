const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors
app.use(express.static("public"));

// Import routes
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const ordersRoute = require("./routes/ordersRoute");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "index.html");
});

app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);
app.use("/orders", ordersRoute);

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});
