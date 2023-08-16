const express = require ("express")
const bodyParser = require ("body-parser")
const controller = require ("../controller")

const itemsRouter = express.Router()

itemsRouter.use(bodyParser.json()) 

itemsRouter.get("/", controller.getItems)
    
itemsRouter.get("/:id", controller.getOneItem)

itemsRouter.post("/", controller.postItem)
    
itemsRouter.put("/:id", controller.updateItem)
    
itemsRouter.delete("/:id", controller.deleteItem)
    


module.exports = itemsRouter