const sql = require('mssql');
require('dotenv').config();

const config ={
    user : process.env.DB_user,
    password: process.env.DB_Password,
    server : process.env.DB_server,
    database : process.env.DB_Database,
    port :1433,
    options:{
        encrypt:true,
        trustServerCertificate : true,
    },
};

const Poolcheck = new sql.ConnectionPool(config).connect().then(pool=>{
    console.log('Connected to DB');
    return pool;
})
.catch(err=>{
    console.error('DB connection Failed: ',err);
    process.exit(1);
}
);

module.exports= Poolcheck;