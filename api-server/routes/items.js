const express = require ("express")
const bodyParser = require ("body-parser")
const controller = require ("../controller")
const globalMiddleware = require ("../global.middleware")

const itemsRouter = express.Router()

itemsRouter.use(bodyParser.json()) 

itemsRouter.get("/", globalMiddleware.checkApi_key, controller.getItems)
    
itemsRouter.get("/:id", globalMiddleware.checkApi_key, controller.getOneItem)

itemsRouter.post("/", globalMiddleware.checkApi_key, globalMiddleware.checkAdmin, globalMiddleware.checkItem, controller.postItem)
    
itemsRouter.put("/:id", globalMiddleware.checkApi_key, globalMiddleware.checkAdmin, controller.updateItem)
    
itemsRouter.delete("/:id", globalMiddleware.checkApi_key, globalMiddleware.checkAdmin, controller.deleteItem)
    


module.exports = itemsRouter