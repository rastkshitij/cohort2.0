const express = require ('express') ;
const app = express();
const notes = [];
app.get('/' , (req ,res) =>{
    res.send(notes);
})
app.get('/notes' , (req ,res) =>{
    res.send(notes);
})
app.use(express.json())
app.post('/notes' , (req ,res)=>{
    res.send('notes created sucessfully')
    notes.push(req.body)
    console.log(req.body)
})
app.listen(3000 , ()=>{
    console.log('Server running at http://localhost:3000/')
})

