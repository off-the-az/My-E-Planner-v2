const { session, Telegraf } =  require("telegraf");
const stages = require('./bot.resources/bot.stages');
const UserModel = require('./model/user.model');
const Controller = require('./controller/Controller');
require('dotenv').config();

const bot = new Telegraf(process.env.TOKEN);
const userController = new Controller(UserModel);

bot.use(session());
bot.use(stages.middleware());

bot.command('start', async (ctx) => {
    console.log(String(ctx.chat.id));
    const user = await userController.readBy({chat_id: `${ctx.chat.id}`});
    console.log(user);
    if(user[0] === undefined){
        await ctx.reply('Привіт!🤗\nВітаю, друже😊. Радий тебе бачити тут😉');
        await ctx.reply('Бачу ти у нас вперше і ми про тебе мало що знаємо😕\nЩо ж давай це виправимо😉\nСпершу я представлю себе, а потім перейжемо до тебе😊\nМене звуть My E-Planner Notificator Bot, я бот який допоможе тобі не забувати про важливі події чи заходи. З моїми можливостями ти зможеш завжди бути в курсі подій, а також не хвилюватись, що забувся про якусь подію чи нагадування. Тепер давай дізнаємось про тебе дещо🤗');
        await ctx.scene.enter('emailInput');
    }else{
        await ctx.reply('Привіт!🤗\nВітаю, друже😊. Радий тебе бачити тут😉');
    }
}); 

module.exports = bot;