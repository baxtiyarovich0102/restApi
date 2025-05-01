const pool = require("../../db")
const queries = require("./queries")

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (err, result) => {
        if(err) throw err
        res.status(200).json(result.rows)
    })
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentById, [id], (err, result) => {
        if(err) throw err
        res.status(200).json(result.rows)
    })
}

const addStudent = (req, res) => {
    const {name, email, age, dob} = req.body
    pool.query(queries.checkEmailExists, [email], (err, result) => {
        if(result.rows.length) {
            res.send("Email already exists")
        }

        pool.query(queries.addStudent, [name, email, age, dob], (err, result) => {
            if(err) throw err
            res.status(201).send("CREATED!")
        })
    })
}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(queries.getStudentById, [id], (err, result) => {
        const notFound = !result.rows.length
        if(notFound){
            res.send("Student does not exist")
        }
        
        pool.query(queries.removeStudent, [id], (err, result) => {
            if(err) throw err
            res.status(200).send("Deleted!")
        })
    })
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id)
    const {name} = req.body

    pool.query(queries.getStudentById, [id], (err, result) => {
        const notFound = !result.rows.length
        if(notFound){
            res.send("Student does not exist")
        }

        pool.query(queries.updateStudent, [name, id], (err, result) => {
            if(err) throw err;
            res.status(200).send("Updated!")
        })
    })
}


module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent
}