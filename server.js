const express = require("express")
const studentsRouter = require("./src/student/routes")

const app =express()
const port = 5000

app.get("/", (req, res) => {
    res.send("Xaxa")
})

app.use("/api/v1/students", studentsRouter)

app.listen(port, () => console.log("Listening on port", port))