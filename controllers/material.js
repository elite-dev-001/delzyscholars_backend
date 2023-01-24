const materialSchema = require('../models/material')


const createMaterial = (req, res) => {
    const material = new materialSchema({
        category: req.body.category,
        title: req.body.title,
        courseCode: req.body.courseCode,
        creatorId: req.body.creatorId,
        courseAmount: req.body.courseAmount,
        courseImg: req.body.courseImg,
        author: req.body.author,
        level: req.body.level,
        semester: req.body.semester,
        students: [],
        content: req.body.content,
    })

    material.save().then(() => {
        console.log('Material Created')
        res.status(200).json({message: 'Material Created', status: 'ok'})
    }).catch((err) => {
        res.status(500).json({message: err})
    })
}

//GET ALL MATERIALS

const getAllMaterials = (req, res) => {

    const {category, creatorId} = req.query;
    if(creatorId){
        materialSchema.find({creatorId: creatorId}, (err, results) => {
            if(err) {
                console.log(err)
                res.status(500).json({message: err})
            } else {
                res.status(200).json({results})
            }
        }).find({}).sort({$natural: -1})
    } else {
        materialSchema.find(category ? {category: {'$regex': category, "$options": "i"}} : {}, (err, results) => {
            if(err) {
                console.log(err)
                res.status(500).json({message: err})
            } else {
                res.status(200).json({results})
            }
        }).find({}).sort({$natural: -1})
    }
}

//GET SINGLE MATERIAL

const getSingleMaterial = (req, res) => {
    materialSchema.find({_id: req.params.id}, (err, results) => {
        if(err) {
            console.log(err)
            res.status(500).json({message: err})
        } else {
            res.status(200).json(results)
        }
    })
}

//UPDATE STUDENTS

const updateStudents = async (req, res) => {
    const {newStudent} = req.body
    const findMaterial = await materialSchema.findById({_id: req.params.id})
    const students = Array.from(findMaterial['students'])
    students.push(newStudent)

    const updatedStudent = await materialSchema.findByIdAndUpdate(
        {_id: req.params.id}, {
            $set: {
                students: students
            }
        }, {new: true}
    )
    if(updatedStudent){
        res.status(200).json({message: "Successfully Updated"})
    } else {
        res.status(500).json({message: "Could not update"})
    }
}

module.exports = { createMaterial, getAllMaterials, getSingleMaterial, updateStudents}

