const express = require('express');
const dotenv = require('dotenv');  
dotenv.config();  
const mongoDbConnection = require('./db/connection');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoDbConnection.then(()=>{
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection failed, server not started', err);

})


