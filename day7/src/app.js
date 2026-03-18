const express = require('express');
const app = express();
const notesModel = require('./Models/notes.model')
//post 
app.use(express.json())
app.post('/notes' ,async (req ,res)=>{
    const {title , discription} = req.body
     const note = await notesModel.create({
        title , discription
    })
    res.status(201).json({
        message : "note created successfully",
    note
    })
})


app.get('/notes' , async (req,res)=>{
  const notes = await notesModel.find()
  res.status(200).json({
    message :"notes featched",
    notes
  })
})


module.exports = app