const express = require("express");
const cors = require('cors');
const morgan = require("morgan");

const doubtRoutes = require("./routes/doubts")
const uploadRoutes = require("./routes/upload")

const logger = require("./")

require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined",{stream:logger.stream}));

app.use(doubtRoutes);
app.use(uploadRoutes);

module.exports = app;

