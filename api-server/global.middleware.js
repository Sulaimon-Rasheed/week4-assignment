const fs = require("fs");

const checkApi_key = (req, res, next) => {
  const usersData = fs.readFileSync("./db/users.json");
  const userDB = JSON.parse(usersData);

  const apiKey = req.headers.api_key;

  if (!apiKey) {
    return res.status(401).json({
      message: "you are not authenticated, api_key required",
    });
  }

  const foundUser = userDB.find((user) => user.api_key === apiKey);
  if (!foundUser) {
   return res.status(401).json({
      message: "you are not authenticated",
    });
  }
  next();
};

const checkAdmin = (req, res, next) => {
  const usersData = fs.readFileSync("./db/users.json")
  const userDB = JSON.parse(usersData)

  const apiKey = req.headers.api_key

  const foundUser = userDB.find(user=>user.api_key == apiKey )

  if(foundUser.user_type != "admin"){
    return res.status(403).json({
      message:"you are not authorized"
    })
    
  }
  next()
};

const checkItem = (req, res, next) => {
  const items = ["Pig", "Beer"];
  if (items.includes(req.body.name)) {
    return res.status(406).json({
      error: "This item is Unacceptable.We don't accept Pig and Beer",
    });
  }
  next();
};

module.exports = {
  checkItem,
  checkApi_key,
  checkAdmin,
};
