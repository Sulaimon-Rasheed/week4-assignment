const fs = require ("fs")

//==================TO POST AN ITEM================================
const postItem = (req, res)=>{
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
}

//==================TO GET ALL ITEM================================
const getItems = (req, res)=>{
    const items = fs.readFileSync("./db/items.json")
   return res.status(200).send(items)
}

//==================TO GET ONE ITEM================================
const getOneItem = (req, res)=>{
    const itemsDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(itemsDB)

    const id = req.params.id

    const foundItem = items.find((item)=>{
        return item.id == parseInt(id)
    })

    if(!foundItem){
        res.status(404).send(`Item not found`)
        return
    }
    res.status(200).json(foundItem)
}

//===========================TO UPDATE AN ITEM===========================
const updateItem = (req, res)=>{
    const itemsDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(itemsDB)

    const update = req.body

    const id = req.params.id

    const foundIndex = items.findIndex(item=>item.id == parseInt(id))
    if(foundIndex==-1){
        res.status(404)
        res.end("id not found") 
    }
    items[foundIndex] = {...items[foundIndex], ...update}

    fs.writeFile("./db/items.json", JSON.stringify(items), (err)=>{
        if(err){
            res.status(500)
            res.end("update not successful")

        }
        res.json(items[foundIndex])
    } )
   
}

//===========================TO DELETE AN ITEM===========================
const deleteItem = (req, res)=>{
    const itemsDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(itemsDB)

    const id = req.params.id

    const foundIndex = items.findIndex(item=> item.id == parseInt(id))
    if(foundIndex== -1){
        res.status(404).send(`item with id ${id} not found`)
        return
    }else{items.splice(foundIndex, 1)}
    
    fs.writeFile("./db/items.json", JSON.stringify(items), (err)=>{
        if(err){
            res.status(500).send("internal server error")
            return
        }
        res.status(200).send(`item with id: ${id} successfully deleted`)
    } )
}

module.exports = {
    postItem,
    getItems,
    getOneItem,
    updateItem,
    deleteItem
}
