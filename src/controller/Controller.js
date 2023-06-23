'use strict'
const Service = require('../service/service');

class Controller {

    constructor(Model){
        this.Model = Model;
    }

    async readAll(){
        let service = new Service();
        return await service.read(this.Model, {});
    }

    async readBy(queue){
        let service = new Service();
        return await service.read(this.Model, queue);
    }

    async addData(queue){
        let service = new Service();
        return await service.add(this.Model, queue);
    }

    async updateData(queue, data){
        let service = new Service();
        return await service.update(this.Model, queue, data);
    }

    async deleteby(queue){
        let service = new Service();
        return await service.delete(this.Model, queue);
    }
}

module.exports = Controller;