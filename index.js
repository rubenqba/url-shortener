const express = require('express');
var cors = require('cors')
const dotenv = require('dotenv').config();

console.log(dotenv.parsed);

const connectDB = require("./config/db")

const app = express();

// connect database
connectDB();

app.use(express.json({ extended: false }))
app.use(cors())

// define route
app.use("/", require('./routes/index'));
app.use("/api/url", require('./routes/url'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

