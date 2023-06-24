const { Scenes } =  require("telegraf");
const UserModel = require('../../model/user.model');
const Controller = require('../../controller/Controller');

const emailInputScene = new Scenes.BaseScene('emailInput');
const userController = new Controller(UserModel);

emailInputScene.enter(async ctx => {
    await ctx.reply('Вкажи свою електронну адресу, з якою реєструвався на нашому сайті 😊');
})

emailInputScene.on('text', async ctx => {
    const user = await userController.readBy({email: `${ctx.update.message.text}`});
    user[0].chat_id = `${ctx.chat.id}`;
    await userController.updateData({email: `${ctx.update.message.text}`}, user[0]);
    await ctx.reply('Ти успішно зареєструвався в боті 😊 Тепер я буду постійно тобі нагадувати про твої заплановані події та заходи 😋\n\nДякую, що обрав саме наші послуги 😉');
    ctx.scene.leave('emailInput');
})

emailInputScene.leave(ctx => {
    console.log('Leave')
})

module.exports = emailInputScene;