const sql = require('mssql')
const config = require('../config/dbconfig.js')
const bcrypt = require('bcryptjs')
const LoginOp=async(email,pass)=>{
    try{
        const pool = await config;
    
        const result= await pool.request()
        .input('email',sql.VarChar(255),email)
        .input('Password',sql.VarChar(100),pass)
        .query(`select COUNT(*) as count from Users 
    where Email= @email ;`);

    const userpresent = result.recordset[0];

   
    const count = parseInt(userpresent?userpresent.count:0,10)
    
    if(count>0){
        const userResult = await pool.request()
        .input('email', sql.VarChar(255), email)
        .input('Password', sql.VarChar(100), pass)
        .query(`
            SELECT EnrollmentID, Email, Fullname, Phone,Password
            FROM Users 
            WHERE Email = @email;
        `);
        

    const user = userResult.recordset[0];

    if (!user.Password) {
        console.log("Password field is missing or null in database.");
        return { success: false, message: "Internal error" };
    }

    console.log("Plain password:", pass);
console.log("Hashed password from DB:", user.Password);


    const passwordMatch = await bcrypt.compare(pass, user.Password);
    if (!passwordMatch) {
        return { success: false, message: "No such email exists or password incorrect" };
    }
    
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
        return {success:false,message:"Internal error"}
    }
    };

    module.exports = LoginOp;