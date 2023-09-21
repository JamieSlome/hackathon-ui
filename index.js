const express = require("express")
const path = require("path")

const app = express()

app.use(express.static(path.join(".", 'dist'))); 

app.listen("3000", () => {
    console.log("heya")
})