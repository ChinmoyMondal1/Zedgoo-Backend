const dotenv = require('dotenv');
const app = require('./app.js');




dotenv.config();

const Port = process.env.PORT;

app.listen(Port,()=>{
    console.log(`server is running on port ${Port}`);
    
})