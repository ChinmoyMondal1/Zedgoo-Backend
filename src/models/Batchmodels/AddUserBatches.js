const config = require('../../config/dbconfig')
const sql = require('mssql')

const AddUserBatches = async(Batchid,Enrollmentids=[]) =>{
    try{
        const pool = await config;
        const results =[];
        for(const EnrollmentID of Enrollmentids){

            const getuserid = await pool.request()
            .input('enrollmentid',sql.VarChar(150),EnrollmentID)
            .query(`select userid from Users where EnrollmentID =@enrollmentid  `);
            
            const fetcheduserid = getuserid.recordset[0].userid
            
            const add = await pool.request()
            .input('userid',sql.Int,fetcheduserid)
            .input('enrollment',sql.VarChar(20),EnrollmentID)
            .input('BatchID',sql.VarChar(25),Batchid)
            .query(`Insert into UserBatches(Batch_id ,userid,enrollment_ID)
                Values(@BatchID,@userid,@enrollment)`)
                
                if(add.rowsAffected[0]>0){
                    results.push({success:true,message: "Trainer in userBatches and new Batch added"})
                }
                else{
                    results.push({success:false,message: "no rows added in userBatches or Batches"})
                    
                }
            }
            return{success:results.some(r => r.success),results}
    }
    catch(err){
        console.error("Error occured",err.message)
        return {success:false,message: err.message}
    }
}

module.exports= AddUserBatches;