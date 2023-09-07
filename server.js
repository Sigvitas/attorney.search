const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'attorney_search'
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/search', (req, res) => {
  const searchQuery = req.query.query;

  const query = `
        SELECT attorney_name, attorney_number, document_no AS documentNumber, priority, field, published,
               cpc_uscl, definition_of_cpc_uscl, title
        FROM  attorneys__3_
        WHERE attorney_name LIKE ? OR attorney_number = ? OR cpc_uscl = ?
    `;

  const searchTerm = `%${searchQuery}%`;

  connection.query(query, [searchTerm, searchQuery, searchQuery], (err, results) => {
    if (err) {
      console.error('Error executing search query:', err);
      return res.status(500).json({ error: 'Error executing search query' });
    }

    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
