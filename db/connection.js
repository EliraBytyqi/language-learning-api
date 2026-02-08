const mongoose = require('mongoose');

const mongoDbConnection = mongoose.connect(process.env.MONGODB).then(()=>{
    console.log('Connected to DB successfully!')
}).catch((err)=>{
    console.log('Could not connect to DB!', err);
});


module.exports = mongoDbConnection;