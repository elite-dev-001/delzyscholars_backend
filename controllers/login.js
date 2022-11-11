const User = require('../models/user')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';

const loginControl = async (req, res) => {

    const {phoneNumber, password} = req.body;
    const user = await User.findOne({ phoneNumber }).lean();
    const admin = await Admin.findOne({ phoneNumber }).lean();

    if(user) {
        if(await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({
                id: user._id,
                phoneNumber: user.phoneNumber
            },
            JWT_SECRET
            )
            return res.json({ status: 'ok', data: token, role: 'user', id: user._id})
        } else {
            return res.json({status: 'error', error: 'Incorrect phone number or password'})
        }
    } else if(admin){
        if(await bcrypt.compare(password, admin.password)) {
            const token = jwt.sign({
                id: admin._id,
                phoneNumber: admin.phoneNumber
            },
            JWT_SECRET
            )
            return res.json({ status: 'ok', data: token, role: 'admin', id: admin._id})
        } else {
            return res.json({status: 'error', error: 'Incorrect phone number or password'})
        }
    }
    res.json({status: 'error', error: 'User does not exist'})
}

module.exports = {loginControl, JWT_SECRET}