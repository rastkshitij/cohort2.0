// server ko create karna
//server ko congigure karna  
//api = post 
//delete api  /notes/:1
//params
 //server created
 // patch api : modifies something in  data not complete is replace it happens i put 
 // if we need to modify or update somethimg in the data then we use patch if we need to replace the whole data with another then we use put

const express = require ('express') ;
const app  = express()
app.get('/' , (req ,res)=>{
    res.send('This is home page')
})
let notes =[

]
app.use(express.json())
app.get('/notes' , (req ,res)=>{
    res.send(notes)
})
app.post('/notes' , (req ,res)=>{
    console.log(req.body);
    notes.push(req.body);
    res.send('Notes created succesfully')
    console.log(notes);
})
app.delete('/notes/:index' , (req,res)=>{
    delete notes[req.params.index]
    res.send('Notes deletd')
})   
app.patch('/notes/:index' , (req,res)=>{
    notes[req.params.index].description = req.body.description;
    res.send("dicrption modified by patch");
})

module.exports = app