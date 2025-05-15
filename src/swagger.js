const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title : 'Zedgoo Login',
        description:'API for Login in Zedgoo'
    },
     host:'localhost:4000',
     schemes:['http'],
     basepath:'/api'
};

const outputfile = './swagger-output.json';
const routes = ['./routes/loginroute.js','./routes/Signuproute.js','./routes/Batchroutes.js'];
swaggerAutogen(outputfile,routes,doc);