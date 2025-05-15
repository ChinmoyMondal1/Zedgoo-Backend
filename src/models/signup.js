const sql = require('mssql')
const config = require('../config/dbconfig')
const bcrypt = require('bcrypt')

const SignupOp = async(fullname,password,phonenumber,emailaddress,OrgID)=>{
    const pool = await config;
    try{

        
        const existing_email = await pool.request()
        .input('email',sql.VarChar(100),emailaddress)
        . query(`select Count(*) as count from Users where Email = @email`);
        
        const count = parseInt(existing_email.recordset[0].count, 10);
        
        if(count>0){
            return{success:false,message:'Email already exists'}
        }
        
        const hashedpass = await bcrypt.hash(password,10)
        const add_user = await pool.request()
        .input('Fullname',sql.VarChar(150),fullname)
        .input('Email',sql.VarChar(100),emailaddress)
        .input('Password',sql.VarChar(120),hashedpass)
        .input('Phone',sql.BigInt,phonenumber)
        .input('OrgId', sql.VarChar(20),OrgID)
        .query(`insert into Users(Fullname,Email,Password,OrgID,Phone)
            Values(@Fullname,@Email,@Password,@OrgId,@Phone)`
        )

        return{success:true, message:`Signup successful for ${emailaddress}`};

    }
    catch(err){
        console.log(err.message);
        
        return{success:false, message:"server error"}
    }
}

module.exports =  SignupOp
