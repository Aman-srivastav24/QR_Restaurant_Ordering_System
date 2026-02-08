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

/** error handler
 * Note: This should be registered after all routes and other middleware
 */

const errorHandler = require('./middleware/errorMiddleware');
app.use(errorHandler);  

module.exports = app;
