const express = require('express');
const fs = require('fs');
const app = express();

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello From The Server Side!', app: 'Natours' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      // tours: tours ... can be re-eritten as below
      tours,
    },
  });
});

app.post('/', (req, res) => {
  res.status(200).send('You Can Post to this endpoint .. !!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App Running on Port ${port} .... `);
});
