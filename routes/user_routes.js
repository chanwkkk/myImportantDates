const express = require('express');

const eventRoutes = require('./event_routes');

// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/')
    .get((req, res) => {
      res.send('this is users.page');
    })
    .post((req, res) => {
      res.send('this is use post.page');
    });

router.get('/new', (req, res) => {
  res.send('this is users/new.page');
});

router.get('/:id/edit', (req, res) => {
  res.send('this is users/edit.page');
});

router.route('/:id')
    .get((req, res) => {
      res.send('this is a user.page');
    })
    .post((req, res) => {
      res.send('this is userrr one post.page');
    })
    .put((req, res) => {
      res.send('this is use put.page');
    });


router.use('/:id/events', eventRoutes);

module.exports = router;
