const config = require('../../config/dbconfig')
const sql = require('mssql');

const BatchView = async()=>{
    try{
        const pool = await config;

        const Batches = await pool.request().query(`select * from Batches `);
        console.log(Batches.recordset);
        return{success:"true",
            data: Batches.recordset
        }
    }
    catch(err){
        console.log('Error: ',err.message);
        
        return{success:'False',message:"Internal Error"}
    }
}

module.exports={
    
    BatchView
}