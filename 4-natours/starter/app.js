const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

// 1.) MIDDLE WARES
app.use(morgan('dev'));
app.use(express.json()); // middleware to convert to JSON

app.use((req, res, next) => {
  console.log('Hello From The middleware 😁 !!!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2.) ROUTE HANDLERS
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAT: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'failed', message: 'Invalid ID' });
  }
  res.status(200).json({ status: 'success', data: { tour } });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'failed', message: 'Invalid ID' });
  }
  res
    .status(200)
    .json({ status: 'success', data: { tour: '< Updated Tour Here !! >' } });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'failed', message: 'Invalid ID' });
  }
  res.status(204).json({ status: 'success', data: null });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Route Is not Yet Defined !!!',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Route is not Yet Defined !!!',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Route is not Yet Defined !!!',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Route is not Yet Defines !!!',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Route is not Yet Defined !!!',
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3.) ROUTES
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// 4.) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App Running on Port ${port} .... `);
});
