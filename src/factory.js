const { faker } = require('@faker-js/faker');

const Controller = require('./controller/Controller');
const UserModel = require('./model/user.model');
const EventsModel = require('./model/events.model');
const Generators = require('./generators');

const user_records = require('../resources/user.records.json');
const events_records = require('../resources/events.records.json');
const {dbconn, dbdisconn} = require("./database");

const UserController = new Controller(UserModel);
const EventsController = new Controller(EventsModel);

function generateRandomUser() {
    const name = faker.person.firstName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const user = {
        "name" : name,
        "email" : email,
        "password" : Generators.md5(Generators.md5(password)),
    };
    console.log({
        "name" : name,
        "email" : email,
        "password" : password,
    })
    return user;
}

function generateRandomEvent() {
    const event_type = 'Event';
    const name = faker.lorem.words(3);
    const color = `${faker.color.cmyk({format: 'css'})}`;
    const begin = faker.date.future();
    const end = faker.date.future();
    const owner = faker.name.findName();

    const event = {
        "event_type": event_type,
        "name": name,
        "color": color,
        "begin": begin,
        "end": end,
        "owner": owner
    };
    console.log(event);
    return event;
}

process.argv.forEach(async argv => {
   if(argv === "-u"){ // README: Generate new random users
       await dbconn();
       for(let i = 1; i <= 10; i++) {
           await UserController.addData(generateRandomUser());
           if(i == 10) await dbdisconn();
       }
   }
   else if(argv === '-e'){ // README: Generate new random events
       await dbconn();
       for(let i = 1; i <= 10; i++){
           await EventsController.addData(generateRandomEvent());
           if(i == 10) await dbdisconn();
       }
   }
   else if(argv === '-r-f'){ // README: Adding new users and events from records
        await dbconn();
        await UserController.addData(user_records);
        await EventsController.addData(events_records);
        await dbdisconn();
   }
});