const express = require('express') ;
const app  = express() ;
app.get('/' , (req , res) =>{
    res.send('This is home page')
})
app.get('/about' , (req ,res)=>{
    res.send('This is abpout page')
});

app.listen(3000 , ()=>{
    console.log('Server running at http://localhost:3000/')
})