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


module.exports = {
    getStudents,
    getStudentById
}