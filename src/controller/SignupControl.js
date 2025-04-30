
const SignupOp = require('../models/signup'); // Adjust path as needed

// POST /api/signup
const SignupControl = async (req, res) => {
    const { fullname, password, phonenumber, emailaddress, OrgID } = req.body;

    // Basic input validation (optional but recommended)
    if (!fullname || !password || !phonenumber || !emailaddress || !OrgID) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const result = await SignupOp(fullname, password, phonenumber, emailaddress, OrgID);

        if (result.success) {
            return res.status(201).json(result); // Signup successful
        } else {
            return res.status(409).json(result); // Conflict (e.g., email exists)
        }

    } catch (err) {
        console.error('Signup error:', err.message);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = SignupControl;
