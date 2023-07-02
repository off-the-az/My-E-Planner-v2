'use strict'
const Controller = require('./Controller');

class UserController extends Controller{
    async login(email, password){
        const user = await this.readBy({email: String(email), password: Generators.md5(Generators.md5(String(password)))});
        user[0].token = Generators.generateToken();
        await this.updateData({_id: user[0].id}, user[0]);
        return user[0];
    }
    async logout(token) {
        const user = await this.readBy({token: String(token), token: ""});
        await this.updateData({_id: user[0].id}, user[0]);
    }
}

module.exports = UserController