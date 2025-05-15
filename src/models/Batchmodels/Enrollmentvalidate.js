const sql = require('mssql')
const config = require('../../config/dbconfig')

const Validate_Enroll = async(Enrollmentids=[]) =>{
    try{
        const pool = await config;
          for(const EnrollmentID of Enrollmentids){
         
                     const getuserid = await pool.request()
                     .input('enrollmentid',sql.VarChar(150),EnrollmentID)
                     .query(`select userid from Users where EnrollmentID =@enrollmentid  `);
                     
                     if(getuserid.recordset.length===0){
                         return{success:false,message :`No fields of enrollmentid ${EnrollmentID} found`}
                     }
                    }
                    return {success:true}
                }
    catch(err){
        return{success:false, message:`Internal error: ${err.message} `}
    }
}

module.exports =Validate_Enroll