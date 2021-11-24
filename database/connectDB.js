const mongoose = require('mongoose');

const connectDB = ()=>{
    
   mongoose.connect('mongodb://localhost/playground',{ useUnifiedTopology: true , useNewUrlParser: true })
   .then(()=>console.log(`Connected to db...`))
   .catch((err)=>console.log(err))
   
}

module.exports =connectDB