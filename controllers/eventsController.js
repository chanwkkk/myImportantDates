const Event = require('../models/event');
const User = require('../models/user');

const setUser = (req, res, next) => {
  ownerId = req.params.id;
  User.findById(ownerId, (err, user) => {
    err? res.json('Can\'t find the user') : res.locals.user = user;
    next();
  });
};

const getEvents = (req, res) => {
  Event.find({ownerId: req.params.id}, (err, docs) =>{
    if (err) res.json(err.message);
    else {
        docs.length > 0? res.json(docs) : res.json({'message': 'You don\'t have any events right now.'});
    }
  });
};

const createEvents = async (req, res) => {
  event = new Event(req.body);
  console.log(res.locals.user);
  try {
    const user = res.locals.user;
    event.ownerId = user.id;
    const result = await event.save();
    user.eventIDs.push(result.id);
    await user.save();
    res.json(result);
  } catch (err) {
    res.json(err.message);
  }
};


module.exports = {getEvents, createEvents, setUser};
