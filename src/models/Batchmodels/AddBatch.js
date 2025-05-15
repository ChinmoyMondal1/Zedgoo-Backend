const sql = require('mssql');
const config = require('../../config/dbconfig')

const addBatch=async(BatchID,Batchname,Subject)=>{
    try{

        const pool = await config;
        
        const addnew = await pool.request()
    .input('subject',sql.VarChar(60),Subject)
    .input('Batchid',sql.VarChar(25),BatchID)
    .input('Batchname',sql.VarChar(60),Batchname)
    .query(`Insert into Batches(Batch_ID,BATCHNAME,Subject)
        Values(@Batchid,@Batchname,@subject)`)

        console.log(Subject,BatchID,Batchname);
         if (addnew.rowsAffected[0] > 0) {
            console.log("Batch Added:", BatchID);
            return{success:true,message:"Batch Successfully Added "}
        } else {
            console.log("No rows were affected");
            return { success: false, message: "Failed to add batch" };
        }
        
        }
        catch(err){
            console.log(err.message);
            return{success:false,message:"Error Occured in AddBatch"}
        }
    }

    module.exports =addBatch