const adminSchema = require('../models/admin')
const userSchema = require('../models/user')
// const superAdminSchema = require('../models/super_admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'jdfuqgwefouh@#$%jknskdjhu%$^jasbdjqd376@!%sdlfj';


//REGISTERING NEW ADMINS

const createAdmin = async (req, res) => {

    
    const { phoneNumber } = req.body;  //get admin email

    const adminEmail = await adminSchema.findOne({ phoneNumber }).lean(); // check if email is already existing in Admin category
    const userEmail = await userSchema.findOne({ phoneNumber }).lean();
    // const superAdminEmail = await superAdminSchema.findOne({ email }).lean();

    if(adminEmail || userEmail) {
        //User with email existing
        return res.json({status: 'error', error: 'Phone number already existing'})
    } else {
        const password = await bcrypt.hash(req.body.password, 10) //hash password
        const admin = new adminSchema({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            profile: req.body.profile,
            courses: [],
            password: password,
            confirmPassword: password
        }) // Create a new ADMIN from inputted data

        admin.save().then(() => {
            console.log('Admin Created')
            res.status(200).json({message: 'Admin created', status: 'ok'}) // add new user to the database
        }).catch((err) => {
            res.status(500).json({message: err})
        })
    }
}

// GET CURRENT ADMIN
const getOneAdmin = (req, res) => {
            adminSchema.find({_id: req.params.id}, (err, result) => {
                if(err) {
                    console.log(err);
                    res.status(500).json({message: err})
                } else {
                    res.status(200).json(result)
                }
            })
}

// GET ALL ADMINS

const getAllAdmins = (req, res) => {
    jwt.verify(req.token, JWT_SECRET, function(err, data) {
        if(err) {
            res.status(403)
        } else {
            adminSchema.find({}, (err, results) => {
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

// UPDATE ADMIN COMMENT SECTION
// const updateComments = async (req, res) => {
//     const adminComments = await adminSchema.findByIdAndUpdate(
//         {_id: req.params.id}, {
//             $set: {
//                 comment: req.body.comment
//             }
//         }, {new: true}
//     )
//     if(adminComments) {
//         res.status(200).json({message: "Successfully updated"})
//     } else {
//         res.status(500).json({message: "Could not update"})
//     }
// }


// // UPDATE ADMIN PROFILE PIC
// const updateProfilePics = async (req, res) => {
//     const adminProfile = await adminSchema.findByIdAndUpdate(
//         {_id: req.params.id}, {
//             $set: {
//                 profile: req.body.profile
//             }
//         }, {new: true}
//     )
//     if(adminProfile) {
//         res.status(200).json({message: "Successfully updated"})
//     } else {
//         res.status(500).json({message: "Could not update"})
//     }
// }

// // UPDATE ADMIN POST SECTION
// const updatePosts = async (req, res) => {
//     const adminPosts = await adminSchema.findByIdAndUpdate(
//         {_id: req.params.id}, {
//             $set: {
//                 post: req.body.post
//             }
//         }, {new: true}
//     )
//     if(adminPosts) {
//         res.status(200).json({message: "Successfully updated"})
//     } else {
//         res.status(500).json({message: "Could not update"})
//     }
// }

// //UPDATE ADMIN SUSPENSION
// const suspendAccount = async (req, res) => {
//     const suspension = await adminSchema.findByIdAndUpdate(
//         {_id: req.params.id}, {
//             $set: {
//                 suspend: req.body.suspend
//             }
//         }, {new: true}
//     )
//     if(suspension) {
//         res.status(200).json({message: "Successfully Updated"})
//     } else {
//         res.status(500).json({message: "Could not update"})
//     }
// }


module.exports = { createAdmin, getOneAdmin, getAllAdmins, }