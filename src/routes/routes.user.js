const express = require('express');
const router = express.Router();
const User = require('../controller/userController');
const UserModel = require('../model/user.model');
const Generators = require('../generators');



router.get('/get', async function(req, res, next) {
  try {
    const controller = new User(UserModel); 
    res.json(await controller.readAll());
  } catch (err) {
    console.error(`Error while getting info from DB Users. Error: `, err.message);
    next(err);
  }
});

router.get('/get/byId/:id', async function(req, res, next) {
  try {
    const controller = new User(UserModel); 
    res.json(await controller.readBy({_id: req.params['id'] }));
  } catch (err) {
    console.error(`Error while getting info from DB Users. Error: `, err.message);
    next(err);
  }
});

router.get('/get/byToken/:token', async function(req, res, next) {
  try {
    const controller = new User(UserModel); 
    res.json(await controller.readBy({token: String(req.params['token']) }));
  } catch (err) {
    console.error(`Error while getting info from DB Users. Error: `, err.message);
    next(err);
  }
});

router.get('/login/:mail/:password', async function(req, res, next) {
  try {
    const controller = new User(UserModel);
    res.json(await controller.login(String(req.params['mail']), String(req.params['password']));
  } catch (err) {
    console.error(`Error while getting info from DB Users. Error: `, err.message);
    next(err);
  }
});

router.get('/logout/:token', async function(req, res, next) {
  try {
    const controller = new User(UserModel);
    await controller.logout(req.params['token']);
    res.json('User logout successful');
  } catch (err) {
    console.error(`Error while getting info from DB Users. Error: `, err.message);
    next(err);
  }
});

router.post('/register', async function(req, res, next) {
  try {
    const controller = new User(UserModel); 
    req.body.password = Generators.md5(Generators.md5(req.body.password));
    req.body.token = Generators.generateToken();
    res.json(await controller.addData(req.body));
  } catch (err) {
      console.error(`Error while creating record in DB Users Error: `, err.message);
      next(err);
  }
});

router.put('/update/:token', async function(req, res, next) {
  try {
    const controller = new User(UserModel); 
    res.json(await controller.updateData({token: req.params["token"]}, req.body));
  } catch (err) {
      console.error(`Error while updating record in DB Users Error: `, err.message);
      next(err);
  }
});

router.delete('/delete/byId/:id', async function(req, res, next) {
  try {
    const controller = new User(UserModel); 
    res.json(await controller.deleteBy({_id: req.params["id"]}));
  } catch (err) {
      console.error(`Error while deleting record in DB Users Error: `, err.message);
      next(err);
  }
});

router.delete('/delete/byToken/:token', async function(req, res, next) {
  try {
    const controller = new User(UserModel); 
    res.json(await controller.deleteBy({token: req.params["token"]}));
  } catch (err) {
      console.error(`Error while deleting record in DB Users Error: `, err.message);
      next(err);
  }
});

module.exports = router;