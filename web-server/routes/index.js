const express = require ("express")

const indexRouter = express.Router()

indexRouter.get("/", (req,res)=>{
    res.status(200).render("index")
})

indexRouter.get("*", (req,res)=>{
    res.status(404).render("error")
})

module.exports = indexRouter