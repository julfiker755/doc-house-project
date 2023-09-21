const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const morgan = require('morgan')

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// app js and mongobd connect for my site
const uri = "mongodb+srv://pratic:HRiaLaGC3ReB5qxM@cluster0.cfrtdkt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true, } });

app.get("/",(req,res)=>{
  res.send('Hello boss running')
})

// varify token not access you data anathor person


async function run() {
  try {
    const dbuser = client.db("aircnc").collection("user");
    const dbrooms = client.db("aircnc").collection("rooms");
    //  save user register data
    app.put('/user/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          displayName:user?.displayName,
          photoURL:user?.photoURL,
          email:user?.email,

        },
      };
      const reuslt = await dbuser.updateOne(filter,updateDoc,options)
      res.send(reuslt)
    })
    // rooms get data
    app.get('/rooms',async(req,res)=>{
      const result=await dbrooms.find({}).toArray()
      res.send(result)
    })
    //rooms findone data
    app.get('/rooms/:roomid',async(req,res)=>{
     const id=req.params.roomid
     const query={_id:new ObjectId(id)}
     const result = await dbrooms.findOne(query);
     res.send(result)
    })
  // rooms post data
  app.post('/rooms',async(req,res)=>{
    const bodydata=req.body
    const result=await dbrooms.insertOne(bodydata)
    res.send(result)
  })
  
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// app.post('/user',async(req,res)=>{
//   const body=req.body
//   const query={email:body?.email}
//   const exsisuser=await dbuser.findOne(query)
//   if(exsisuser){
//     return res.send('//Already user exsis')
//   }else{

//     const result=await dbuser.insertOne(body)
//     res.send(result)
//   }
  
// })