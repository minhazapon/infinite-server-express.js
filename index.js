const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port =  process.env.PORT || 5000



console.log(process.env.DB_INFINITEUSER)
console.log(process.env.DB_INFINITEPASS)

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Infinite Chapters Server!')
})

////mongodb////


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_INFINITEUSER}:${process.env.DB_INFINITEPASS}@cluster0.ruz4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection


    //BACKEND OPERATION//


    const bookCollection = client.db('bookDB').collection('bookData')

    app.get('/bookData',  async(req, res) => {
    
       const cursor = bookCollection.find() 
       const result = await cursor.toArray()
       res.send(result)

    })





    //BACKEND OPERATION//



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


////mongodb////

app.listen(port, () => {
  console.log(`Infinite Chapters Server port ${port}`)
})