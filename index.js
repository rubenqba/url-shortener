const express = require('express');
const dotenv = require('dotenv').config();

console.log(dotenv.parsed);

const connectDB = require("./config/db")

const app = express();

// connect database
connectDB();

app.use(express.json({ extended: false }))

// define route
app.use("/", require('./routes/index'));
app.use("/api/url", require('./routes/url'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

