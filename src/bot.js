const { session, Telegraf } =  require("telegraf");
require('dotenv').config();

const bot = new Telegraf(process.env.TOKEN);

bot.use(session());

bot.command('start', async (ctx) => {
    console.log(ctx.chat);
    await ctx.reply('My E-Planner Notificator Bot');
    /*let Users = new User();
    let user = await Users.getByUsername(ctx.chat.id);
    if(user === undefined){
        await Auth.register(ctx.chat.id);
        await ctx.reply('Привіт!🤗\nВітаю, друже😊. Радий тебе бачити тут😉');
        await ctx.reply('Бачу ти у нас вперше і ми про тебе мало що знаємо😕\nЩо ж давай це виправимо😉\nСпершу я представлю себе, а потім перейжемо до тебе😊\nМене звуть Fastik, я бот який допоможе тобі замовити те, що ти бажаєш, неважливо, чи це ніч, чи це день. Я надаю тобі усі можливості, які допоможуть тобі все замовити в декілька кліків і швиденько отримати своє замовлення. Тепер давай дізнаємось про тебе дещо🤗');
        await ctx.scene.enter('setNumber');
    }else{
        await ctx.reply('Привіт!🤗\nВітаю, друже😊. Радий тебе бачити тут😉');
        if(user.pnumber === ""){
            await ctx.scene.enter('setNumber');
        }else if(user.client_name === ""){
            await ctx.scene.enter('setName');
        }else{
            await ctx.reply('Обери пункт у меню який тобі до вподоби, щоби продовжити користування системою😌', {reply_markup: menu_btn});
        }
    }*/
}); 

module.exports = bot;