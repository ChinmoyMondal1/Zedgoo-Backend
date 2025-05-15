const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');
const Loginroutes = require('./routes/loginroute.js');
const Signuproutes = require('./routes/Signuproute.js');
const newBatchroutes = require('./routes/Batchroutes.js')
const authenticate = require('./auth_Middleware/jwtverify.js')
const swaggerUi = require('swagger-ui-express');
const swaggerdocument = require('./swagger-output.json');

const app = express();
app.use(bodyparser.json());
app.use(cors());


app.use('/api',Loginroutes)

app.get('/api/dashboard', authenticate, (req, res) => { // This is where the auth middleware is applied
    res.status(200).json({
        message: `Welcome ${req.user.email}!`,
        user: req.user
    });
});
app.use('/api',Signuproutes);

app.use('/api',newBatchroutes);

app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerdocument));

module.exports=app;