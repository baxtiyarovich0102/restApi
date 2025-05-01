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


module.exports = {
    getStudents,
    getStudentById,
    addStudent
}