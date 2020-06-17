const Event = require('../models/event');
const User = require('../models/user');

const getEvents = (req, res) => {
  Event.find({ownerId: req.params.id}, (err, docs) =>{
      docs.length > 0? res.json(docs) : res.json({'message': 'You don\'t have any events right now.'});
  });
};

const createEvents = async (req, res) => {
  event = new Event(req.body);
  ownerId = req.params.id;
  event.ownerId = ownerId;
  try {
    const result = await event.save();
    User.findById(ownerId, async (err, user) => {
      if (err) res.json(err);
      else {
        user.eventIDs.push(result.id);
        await user.save();
      }
      res.json(result);
    });
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = {getEvents, createEvents};