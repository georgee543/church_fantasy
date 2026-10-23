const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// Connection String لقاعدة البيانات Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_A8EegRIs4Yqn@ep-jolly-rice-ba3onyn9-pooler.c-8.eu-central-1.aws.neon.tech/neondb?sslmode=require',
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error connecting to Neon database:', err.stack);
  }
  console.log('Successfully connected to Neon PostgreSQL Database!');
  release();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});