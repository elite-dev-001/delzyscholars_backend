const userSchema = require('../models/user');
const materialSchema = require('../models/material')
const pinSchema = require('../models/pin')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./login');
const _ = require('lodash')



const createUser = async (req, res) => {

    const password = await bcrypt.hash(req.body.password, 10);
    const {phoneNumber, email} = req.body;

    const userNumber = await userSchema.findOne({ phoneNumber }).lean();
    const userEmail = await userSchema.findOne({ email }).lean();

    const user = new userSchema({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        myCourses: [],
        password: password,
        confirmPassword: password
    })

    if(userNumber || userEmail) {
        return res.json({ status: 'error', error: 'User already exist'})
    } else {
        user.save().then(() => {
            console.log('User Created')
            res.status(200).json({message: "User Created", status: "ok"})
        }).catch((err) => {
            res.status(500).json({message: err})
        })
    }
}

//GET ONE USER

const getOneUser = (req, res) => {
    // jwt.verify(req.token, JWT_SECRET, function(err, data) {
        // if(err) {
        //     res.status(403)
        // } else {
            userSchema.find({_id: req.params.id}, (err, result) => {
                if(err) {
                    console.log(err)
                    res.status(500).json({message: err})
                } else {
                    res.status(200).json(result)
                }
            })
       // }//
    // })
}

//GET ALL USERS

const getAllUsers = (req, res) => {
    jwt.verify(req.token, JWT_SECRET, function(err, data) {
        if(err) {
            res.status(403)
        } else {
            userSchema.find({}, (err, results) => {
                if(err) {
                    console.log(err);
                    res.status(500).json({message: err})
                } else {
                    res.status(200).json({results})
                }
            })
        }
    })
}

// UPDATE USER COURSES

const updateCourses = async (req, res) => {
    const {courseId} = req.body
    const activationPin = _.random(10000000, 99999999)

    const user = await userSchema.findById({_id: req.params.id})
    const material = await materialSchema.findById({_id: courseId})

    const courses = Array.from(user['myCourses'])
    courses.push(courseId)

    const students = Array.from(material['students'])
    students.push(req.params.id)

    const newCourses = await userSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                myCourses: courses
            }
        }, {new: true}
    )

    const updatedStudent = await materialSchema.findByIdAndUpdate(
        {_id: courseId}, {
            $set: {
                students: students
            }
        }, {new: true}
    )

    const createPin = new pinSchema({
        activationPin: activationPin,
        activated: false,
        materialId: courseId
    })

    if(newCourses && updatedStudent) {
        // res.status(200).json({message: "Successfully Updated"})
        createPin.save().then(() => {
            res.status(200).json({message: 'Pin Created', status: 'ok', pin: activationPin})
        }).catch((err) => {
            res.status(500).json({message: err})
        })
    } else {
        res.status(500).json({message: "Could not Update"})
    }

}

const verifyUser = async (req, res) => {

    const {phoneNumber} = req.body;

    const userNumber = await userSchema.findOne({phoneNumber}).lean();

    if(userNumber) {
        return res.json({status: 'error', error: 'User already exist'})
    } else {
        return res.json({status: 'ok', })
    }
}


module.exports = { createUser, verifyUser, getOneUser, getAllUsers, updateCourses };