const sql = require('mssql')
const config = require('../config/dbconfig.js')

const LoginOp=async(email,pass)=>{
    try{
        const pool = await config;
    
        const result= await pool.request()
        .input('email',sql.VarChar(255),email)
        .input('Password',sql.VarChar(100),pass)
        .query(`select COUNT(*) as count from Users 
    where Email= @email And Password=@Password ;`);

    const userpresent = result.recordset[0];

   
    const count = parseInt(userpresent?userpresent.count:0,10)
    
    if(count>0){
        const userResult = await pool.request()
        .input('email', sql.VarChar(255), email)
        .input('Password', sql.VarChar(100), pass)
        .query(`
            SELECT EnrollmentID, Email, Fullname, Phone
            FROM Users 
            WHERE Email = @email AND Password = @Password;
        `);
        

    const user = userResult.recordset[0];
    const userdetails = user ? {
        id: user.EnrollmentID,    // Match the column name
        email: user.Email,        // Match the column name
        name: user.Fullname,      // Match the column name
        phone: user.Phone         // Match the column name
    } : null;
        console.log(userdetails);
        return{success:true,message:`Successful login for${email}`,user:userdetails};
        
    }
    else{
    return{success:false,message:"No such email exists or password incorrect"};
    }
    }
    catch(error){
        console.log("Internal Error",error.message)
        return {success:false}
    }
    };

    module.exports = LoginOp;