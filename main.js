const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbconn = require('./src/database');

const {User, Events} = require('./src/routes/index.js');

const corsOfOption = {
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
    credentials: true,
    optionSuccessStatus: 200
}
const app = express();

app.use(cors(corsOfOption));
app.use(bodyParser.json());
app.use("/api/user", User);
app.use("/api/events", Events);

/**************************** Main Server ***********************************/
app.listen(6000, () => {
    console.log(`\nMy E-Planner API is running at 127.0.0.1:6000 ...\n` +
        `To find endpoint u need jst click 127.0.0.1:6000/api/docs\n`
    );
    dbconn();
});