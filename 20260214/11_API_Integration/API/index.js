const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Project Showcase API!' });
});

const accountRoutes = require('./routes/accountRoutes.js');
app.use('/api/accounts', accountRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
