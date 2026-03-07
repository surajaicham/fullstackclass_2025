const express = require('express');
const cors = require('cors'); // Add this line
const logger = require('./logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:4200' })); // Allow only your web domain
app.use(express.json());

// Intercept all requests for logging (must be BEFORE routes)
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Project Showcase API!' });
});

// Import routes
const actorRoutes = require('./routes/actorRoutes');
const accountRoutes = require('./routes/accountRoutes');

// Use routes
app.use('/api/actors', actorRoutes);
app.use('/api/accounts', accountRoutes);

// Error handling middleware (must be AFTER routes)
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`, {
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
