const app= require('./src/app');
const mongoose = require('mongoose');
function connectToDb(){
    mongoose.connect('mongodb+srv://kshitij:enJ4Pv3nZxO6EpZN@cluster0.o48ty5c.mongodb.net/day-6')
        .then(()=>{
                console.log('Database connected')
        })
}
connectToDb()
app.listen(3000 ,()=>{
    console.log('Server running at http://localhost:3000/')
})
