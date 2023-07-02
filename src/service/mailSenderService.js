const async = require('async');

const Event = require('../controller/eventsController');
const User = require('../controller/userController');
const EventsModel = require('../model/events.model');
const UserModel = require('../model/user.model');

const controller = new Event(EventsModel);
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

module.exports = {
    checkBeginedEvents,
    checkEndedEvents
}