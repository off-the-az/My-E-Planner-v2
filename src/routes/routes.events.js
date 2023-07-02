const express = require('express');
const router = express.Router();
const Event = require('../controller/eventsController');
const User = require('../controller/userController');
const EventsModel = require('../model/events.model');
const UserModel = require('../model/user.model');
const transporter = require('../mailer');
const bot = require('../bot');

const controller = new Event(EventsModel); 

router.get('/get', async function(req, res, next) {
  try {
    res.json(await controller.readAll());
  } catch (err) {
    console.error(`Error while getting info from DB Events. Error: `, err.message);
    next(err);
  }
});

router.get('/get/byId/:id', async function(req, res, next) {
  try {
    res.json(await controller.readBy({_id: req.params['id'] }));
  } catch (err) {
    console.error(`Error while getting info from DB Events. Error: `, err.message);
    next(err);
  }
});

router.get('/get/byOwner/:owner', async function(req, res, next) {
  try {
    res.json(await controller.readBy({owner: req.params['owner'] }));
  } catch (err) {
    console.error(`Error while getting info from DB Events. Error: `, err.message);
    next(err);
  }
});

router.get('/get/byDone/:done', async function(req, res, next) {
  try {
    res.json(await controller.readBy({done: req.params['done'] }));
  } catch (err) {
    console.error(`Error while getting info from DB Events. Error: `, err.message);
    next(err);
  }
});

router.post('/add', async function(req, res, next) {
  try {
    res.json(await controller.addData(req.body));
  } catch (err) {
      console.error(`Error while creating record in DB Events Error: `, err.message);
      next(err);
  }
});

router.put('/update/:id', async function(req, res, next) {
  try {
    res.json(await controller.updateData({_id: req.params["id"]}, req.body));
  } catch (err) {
      console.error(`Error while updating record in DB Events Error: `, err.message);
      next(err);
  }
});

router.delete('/delete/byId/:id', async function(req, res, next) {
  try {
    res.json(await controller.deleteBy({_id: req.params["id"]}));
  } catch (err) {
      console.error(`Error while deleting record in DB Events Error: `, err.message);
      next(err);
  }
});

module.exports = router;