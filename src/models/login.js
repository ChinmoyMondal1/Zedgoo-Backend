const sql = require('mssql');
const config = require('../config/dbconfig.js');
const bcrypt = require('bcryptjs');

const LoginOp = async (email, pass) => {
    try {
        const pool = await config;

        const result = await pool.request()
            .input('email', sql.VarChar(255), email)
            .query(`
                SELECT Email, OrgID, Password
                FROM Users
                WHERE Email = @email;
            `);

        const user = result.recordset[0];

        

        if (!user || !(await bcrypt.compare(pass, user.Password))) {
            return { success: false, message: "No such email exists or password incorrect" };
        }



        const userDetails = {
            email: user.Email,
            orgID : user.OrgID
           
        };

        return { success: true, message: `Successful login for ${email}`, user: userDetails};

    } catch (error) {
        console.error("Internal Error:", error.message);
        return { success: false, message: "Internal error" };
    }
};

module.exports = LoginOp;
