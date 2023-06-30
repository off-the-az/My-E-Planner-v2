const express = require('express');
const router = express.Router();
const async = require('async');
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

const queue = async.queue(async (task, callback) => {
  await task();
  callback();
}, 1);

async function checkBeginedEvents() {
  const beginedEvents = await controller.readAll();
  if(beginedEvents != null && beginedEvents.length > 0){
    const UserController = new User(UserModel);
    beginedEvents.forEach(async event => {
      if(event.begin <= Date.now() && event.done !== true){
        queue.push(async () => {
          const user = await UserController.readBy({_id: event.owner});
          const mailOptions = {
            from: "a85566304@gmail.com",
            to: `${user[0].email}`,
            subject: "Нагадування про початок події!",
            text: `Шановний, ${user[0].name}!\nНагадуємо вам, що ваша подія "${event.name}" завершилася! Встигніть усе реалізувати заплановане!\nЗ повагою, My E-Planner!`,
          };
          
          transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              console.log("Помилка відправки електронної пошти: ", error);
            } else {
              if(user[0].chat_id !== ""){
                bot.telegram.sendMessage(Number(user[0].chat_id), `Шановний, ${user[0].name}!\nНагадуємо вам, що ваша подія "${event.name}" завершилася! Встигніть усе реалізувати заплановане!\nЗ повагою, My E-Planner!`);
              }
              console.log("Електронна пошта відправлена успішно. ID: ", info.messageId);
            }
          });
        });
      }
    });
  }
}

async function checkEndedEvents() {
  const beginedEvents = await controller.readAll();
  if(beginedEvents != null && beginedEvents.length > 0){
    const UserController = new User(UserModel);
    beginedEvents.forEach(async event => {
      if(event.end <= Date.now() && event.done !== true){
        queue.push(async () => {
          const user = await UserController.readBy({_id: event.owner});
          const mailOptions = {
            from: "a85566304@gmail.com",
            to: `${user[0].email}`,
            subject: "Нагадування про завершення події!",
            text: `Шановний, ${user[0].name}!\nНагадуємо вам, що ваша подія "${event.name}" завершилася! Сподіваємось ви усе реалізували що планували!\nЗ повагою, My E-Planner!`,
          };
          
          transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              console.log("Помилка відправки електронної пошти: ", error);
            } else {
              event.done = true;
              await controller.updateData({_id: event._id}, event);
              if(user[0].chat_id !== ""){
                bot.telegram.sendMessage(Number(user[0].chat_id), `Шановний, ${user[0].name}!\nНагадуємо вам, що ваша подія "${event.name}" завершилася! Сподіваємось ви усе реалізували що планували!\nЗ повагою, My E-Planner!`);
              }
              console.log("Електронна пошта відправлена успішно. ID: ", info.messageId);
            }
          });
        });
      }
    });
  }
}

setInterval(checkBeginedEvents, 6000);
setInterval(checkEndedEvents, 6000);

module.exports = router;