const express = require("express")
const cors = require("cors")
const route = require("./route/route")
const {dbConnection} =require("./db/db.connection")
const app = express()
app.use(express.json())
app.use(cors())

require('dotenv').config();

const PORT = process.env.PORT || 8080;



app.use((req, res, next) => {
  // console.log(req)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

  // db connection
  dbConnection();

// test
app.get('/', function (req, res) {
  return res.status(200).send({ status: true, message: 'working fine 🚀 🚀 🚀' });
});

app.use('/', route);

 // Start the server using http module instead of app.listen
app.listen(PORT , (err)=>{
  if(err)return res.status(400).send({message :err.message})
  console.log(`Worker ${process.pid} is running on ${PORT} 🟢`);
})

