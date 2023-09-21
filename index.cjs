const express = require( "express")
const path = require( "path")

const app = express()

app.use(express.static(path.join(".", 'dist'))); 


app.listen("8080", () => {
    console.log("heya")
})

app.get("*", (req, res) => {
    res.redirect('/index.html');
})