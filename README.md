<b>Project done: 23.06, 17:50</b>

# My E-Planner

My E-Planner API is one of the main parts of the overall My E-Planner Project based on JavaScript using NodeJS and ExpressJS.

# How to use this API:

If you want to use this API in your application you need to fetch code to your server(local or remote):

```bash
> git clone https://github.com/off-the-az/My-E-Planner-v2.git
```

Next, you need to install project dependencies:

```bash
> npm i --save
```

After you have installed you need to install <b>PM2</b> service on your server (Ubuntu / Ubuntu Server):

```bash
> sudo npm install pm2@latest -g
```

After installing this service, you need to init for startup and servicing your NodeJS project:

```bash
> pm2 startup systemd
```

After that, you need to install MongoDB database using mongosh. The correct instruction <a href="https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04"><b>here</b></a>

Next, you need to run yout NodeJS application and save service on <b>PM2</b>:

```bash
> pm2 start main.js
```

```bash
> pm2 save
```

If you want to check service status, run the following command:

```bash
> systemctl status pm2-<your-pc-username>
```

After setup and configure you can use the following API in your application!) Enjoy!)

# Basic links to project resources:

Telegram Notiticator Bot: https://t.me/@MyEPlannerNoficatorBot
Test records for importing to MongoDB Documents: 
    - https://github.com/off-the-az/My-E-Planner-v2/blob/master/resources/user.factory.json
    - https://github.com/off-the-az/My-E-Planner-v2/blob/master/resources/events.factory.json


# Basic API endpoints:

This API implements all possible options for requests that allow you to organize stable functionality of the project, such as - GET, POST, PUT, DELETE.

The following links allow you to work with database information:

    - User`s data:
        - [GET] http://<ip-adress>:6000/api/user/get
        - [GET] http://<ip-adress>:6000/api/user/get/byId/<user-id>
        - [GET] http://<ip-adress>:6000/api/user/get/byToken/<user-token>
        - [UPDATE] http://<ip-adress>:6000/api/user/update/<user-token>
        - [DELETE] http://<ip-adress>:6000/api/user/delete/byId/<user-id>
        - [DELETE] http://<ip-adress>:6000/api/user/delete/<user-token>

        For Authorization:
        - [POST] http://<ip-adress>:6000/api/user/login/<users-email>/<users-password>
        - [POST] http://<ip-adress>:6000/api/user/logout/<users-token>
        - [POST] http://<ip-adress>:6000/api/user/register

    - Event`s data
        - [GET] http://<ip-adress>:6000/api/events/get
        - [GET] http://<ip-adress>:6000/api/events/get/byOwner/<user-id>
        - [GET] http://<ip-adress>:6000/api/events/get/byId/<event-id>
        - [GET] http://<ip-adress>:6000/api/events/get/byDone/<event-status-isDone>(0|1 or true|false)
        - [POST] http://<ip-adress>:6000/api/events/add
        - [PUT] http://<ip-adress>:6000/api/events/update/<event-id>
        - [DELETE] http://<ip-adress>:6000/api/events/delete