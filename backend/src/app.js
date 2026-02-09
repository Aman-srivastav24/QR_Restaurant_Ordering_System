const express = require("express");
const cors = require("cors");
const app = express();

/** Global Middleware */
app.use(cors());
app.use(express.json());

/*Routes */

const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

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
