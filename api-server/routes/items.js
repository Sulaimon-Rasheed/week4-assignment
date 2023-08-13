const express = require ("express")
const bodyParser = require ("body-parser")
const fs = require("fs")

const itemsRouter = express.Router()

itemsRouter.use(bodyParser.json())

//==================TO GET ALL ITEM================================
itemsRouter.get("/", (req, res)=>{
    const items = fs.readFileSync("./db/items.json")
    res.status(200).send(items)
})

//==================TO GET ONE ITEM================================
itemsRouter.get("/:id", (req, res)=>{
    const itemsDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(itemsDB)
    const id = req.params.id
    const foundItem = items.find((item)=>{
        return item.id == parseInt(id)
    })
    if(!foundItem){
        res.status(404).send(`Item not found`)
    }
    res.status(200).json(foundItem)
})

//==================TO POST AN ITEM================================
itemsRouter.post("/", (req, res)=>{
    const itemsDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(itemsDB)
    const itemToPost = req.body
    const lastId = items[items.length-1].id
    const newId = lastId + 1;
    const postWithId = {...itemToPost, id:newId}
    items.push(postWithId)
    fs.writeFile("./db/items.json", JSON.stringify(items), (err)=>{
        if(err){
            res.status(500)
        }
        res.status(200).json(postWithId)
    } )
})

//===========================TO UPDATE AN ITEM===========================
itemsRouter.put("/:id", (req,res)=>{
    const itemsDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(itemsDB)
    const update = req.body
    const id = req.params.id
    const foundIndex = items.findIndex(item=>item.id == parseInt(id))
    items[foundIndex] = {...items[foundIndex], ...update}
    fs.writeFile("./db/items.json", JSON.stringify(items), (err)=>{
        if(err){
            res.status(500)
        }
        res.json(items[foundIndex])
    } )
   
})

//===========================TO DELETE AN ITEM===========================
itemsRouter.delete("/:id", (req, res)=>{
    const itemsDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(itemsDB)
    const id = req.params.id
    const foundIndex = items.findIndex(item=> item.id == parseInt(id))
    if(foundIndex== -1){
        res.status(500).send(`item with index ${id} not found`)
        return
    }else{items.splice(foundIndex, 1)}
    
    fs.writeFile("./db/items.json", JSON.stringify(items), (err)=>{
        if(err){
            res.status(500).send("internal server error")
            return
        }
        res.status(200).send(`item at id: ${id} successfully deleted`)
    } )
})



module.exports = itemsRouter