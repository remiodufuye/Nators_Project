const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello From The Server Side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.status(200).send('You Can Post to this endpoint .. !!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App Running on Port ${port} .... `);
});
