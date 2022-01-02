const express = require("express")
const app = express()
const port = 5000
const routesassociations = require("./routes/associations")

app.use('/associations',routesassociations)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})