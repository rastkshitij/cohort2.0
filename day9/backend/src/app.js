// server ko create karte ha
const express = require('express')
const app = express();
const noteModel = require('./Models/notes.model')
const cors = require('cors')
const path = require('path')
app.use(cors())
app.use(express.json())
app.use(express.static("./public"))
//POST api 
  //create notes an save data in mongodb 
  //req.body  ={title , discription}
  app.post('/api/notes' ,async (req , res)=>{
    const {title , discription} = req.body;
    const note  = await noteModel.create({
      title , discription
      })
      res.status(201).json({
        message :"Note created succesfully" , 
          note
      })
  })
//get api will reterive all the notes creeted and send them in resposne
 app.get('/api/notes' , async (req , res) =>{
  const notes = await noteModel.find()
  res.status(200).json({
    message : "Notes fetched" ,
    notes
  })
 })
 //deleting note 
//DELETE  note with the help id from req.params
app.delete('/api/notes/:id' ,async (req , res)=>{
  const id = req.params.id
await noteModel.findByIdAndDelete(id)
  res.status(200).json({
    message : "Notes deleted sucessfully"
})
})

//Patch _/api/notes/:id
//upadate the dicription of the note on the bassis of id 
app.patch('/api/notes/:id' , async(req, res)=>{
const id = req.params.id
const {discription} = req.body
await noteModel.findByIdAndUpdate(id , {discription})
res.status(200).json({
  message :"Note modified using patch api"
})
})

app.use("*name" ,  (req , res)=>{
  res.sendFile(path.join(__dirname , ".." ,"/public/index.html"))
})

module.exports =app