const express = require('express');
const Album = require('../models/album');
// eslint-disable-next-line new-cap
const router = express.Router({mergeParams: true});
const { getAlbum }  = require('../controllers/albumsController')


router.route('/')
    .get(getAlbum)
    .post( (req, res) => {
      Album.findOne({eventId: req.params.eventId}, async (err, doc) =>{
        if (doc) {
          res.json({'message': 'You can only create one album.'});
        } else {
          try {
            album = new Album(req.body);
            album.ownerId = req.params.id;
            album.eventId = req.params.eventId;
            const result = await album.save();
            res.json(result);
          } catch (err) {
            res.send(err.message);
          }
        }
      });
    })
    .put((req, res) => {
      const eventId = req.params.eventId;
      album = req.body;
      Album.findOneAndUpdate({eventId}, album, {new: true}, (err, doc) => {
        !err? res.json(doc): res.json(err.message);
      });
    })
    .delete((req, res) => {
      const eventId = req.params.eventId;
      Album.findOneAndDelete({eventId: eventId}, (err, doc) => {
        !err? res.json(doc) : res.json(err.message);
      });
    });

module.exports = router;
