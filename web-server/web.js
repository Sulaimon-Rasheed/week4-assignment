const express = require ("express")
const fs = require ('fs')
// const indexRoute = require ("./routes/index.js")

const web = express()

const PORT = 8000

// web.use("/index", indexRoute)

web.set("view engine", "ejs")
web.set("views", "views")

web.get("/", (req,res)=>{
    res.status(200).render("index")
})

web.get("/index", (req,res)=>{
    res.status(200).render("index")
})

web.get("*", (req,res)=>{
    res.status(404).render("error")
})


web.listen(PORT, (req, res)=>{
    console.log(`The serever has started running at http://localhost:${PORT}`)
})