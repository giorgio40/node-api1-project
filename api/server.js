// BUILD YOUR SERVER HERE

 // EXPORT YOUR SERVER instead of {}

 const users = require("./users/model")

 const express = require('express');
 const server = express();

 //http:localhost:5000/api/users
 server.use(express.json());

 server.post('/api/users',(req,res) =>{
     const newUser =req.body;
     if(!newUser.name ||!newUser.bio){
         res.status(400).json({message:`Please provide a name and bio for  the user`})

     }else{
         users,createUser(newUser
            .then((user) => {
                res.json(user)
                res.status(201).json("created")
            }))
            .catch((err) => {
                res.status(500).json({message:"There was an error creating the user"})
            })
     }
 })

 server.get('/api/users',(req, res) => {
    //  res.status(200).json("it works")
     users.find()
     .then((users) => {
         res.status(200).json(users)
     })
    .catch((err) => {
        res.status(500).json(`{message: The users information could not be retried}`)

    })

})

server.get('/api/users/:id',(req, res) => {
    const id = req.params.id
    users.findById(id)
    .then((users) => {
        if(!users){
            res.status(404).json(`{message:the user with the specified id could not be found}`)
        }else{
            res.json(users)
        }
    })
    .catch((error) => {
        res.status(500).json({message:error})
    })
})

    server.delete('/api/users/:id', async (req,res) => {
        try {
        const result = await users.delete(req.params.id)
        if(!result){
            res.status(404).json(`{message:The user with the specified id could not be found}`)
        }
        else {
            res.json(result)
        }
    }catch(err) {
            res.status(500).json(`{message:The user with the specified id could not be removed}}`)
        
    }
    })

 module.exports = server
