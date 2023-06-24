const { Scenes } =  require("telegraf");
const emailInputScene = require('./scenes/emailInput.scene');

const stage = new Scenes.Stage([emailInputScene]);

module.exports = stage;