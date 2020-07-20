const express = require('express');
const { notes } = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.port || 3002;

const app = express();

app.get('/db/db.json', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get('/db/db.json/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});