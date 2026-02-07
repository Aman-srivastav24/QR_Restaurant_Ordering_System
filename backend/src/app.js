const express = require("express");
const cors = require("cors");
const app = express();

/** Global Middleware */
app.use(cors());
app.use(express.json());

/** HEALTH CHECK */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: 'API is running'
  });
});

module.exports = app;
