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


const AllData = [
  {
    "image": "https://example.com/image1.jpg",
    "name": "john doe",
    "title": "developer",
    "paragraph": "john is a software developer with a passion for coding and building applications."
  },
  {
    "image": "https://example.com/image2.jpg",
    "name": "jane smith",
    "title": "designer",
    "paragraph": "jane is a creative designer who specializes in user experience and interface design."
  },
  {
    "image": "https://example.com/image3.jpg",
    "name": "mark johnson",
    "title": "project manager",
    "paragraph": "mark is a project manager with extensive experience in overseeing complex projects and teams."
  },
  {
    "image": "https://example.com/image4.jpg",
    "name": "emily davis",
    "title": "data scientist",
    "paragraph": "emily is a data scientist skilled in machine learning, statistical analysis, and data visualization."
  },
  {
    "image": "https://example.com/image5.jpg",
    "name": "michael brown",
    "title": "ux researcher",
    "paragraph": "michael conducts research to understand user behavior and improve digital experiences."
  },
  {
    "image": "https://example.com/image6.jpg",
    "name": "sarah miller",
    "title": "marketing specialist",
    "paragraph": "sarah is a marketing specialist with expertise in digital campaigns and brand strategy."
  },
  {
    "image": "https://example.com/image7.jpg",
    "name": "david wilson",
    "title": "software architect",
    "paragraph": "david designs and oversees the technical architecture of large-scale software systems."
  },
  {
    "image": "https://example.com/image8.jpg",
    "name": "linda garcia",
    "title": "content writer",
    "paragraph": "linda writes compelling content that engages audiences and supports brand messaging."
  },
  {
    "image": "https://example.com/image9.jpg",
    "name": "james martinez",
    "title": "financial analyst",
    "paragraph": "james analyzes financial data to provide insights and support decision-making processes."
  },
  {
    "image": "https://example.com/image10.jpg",
    "name": "elizabeth thompson",
    "title": "human resources manager",
    "paragraph": "elizabeth manages recruitment, employee relations, and organizational development strategies."
  },
  {
    "image": "https://example.com/image11.jpg",
    "name": "charles white",
    "title": "quality assurance engineer",
    "paragraph": "charles ensures the quality and reliability of software through rigorous testing processes."
  },
  {
    "image": "https://example.com/image12.jpg",
    "name": "olivia scott",
    "title": "business analyst",
    "paragraph": "olivia gathers and analyzes business requirements to improve processes and solve problems."
  },
  {
    "image": "https://example.com/image13.jpg",
    "name": "jackson anderson",
    "title": "systems administrator",
    "paragraph": "jackson manages and maintains an organization's IT infrastructure to ensure optimal performance."
  },
  {
    "image": "https://example.com/image14.jpg",
    "name": "isabella martinez",
    "title": "social media manager",
    "paragraph": "isabella manages social media platforms and creates content to enhance brand presence."
  },
  {
    "image": "https://example.com/image15.jpg",
    "name": "daniel lee",
    "title": "network engineer",
    "paragraph": "daniel designs and manages communication networks to ensure secure and efficient data transfer."
  },
  {
    "image": "https://example.com/image16.jpg",
    "name": "mia robinson",
    "title": "customer support specialist",
    "paragraph": "mia provides exceptional customer service by addressing inquiries and resolving issues efficiently."
  },
  {
    "image": "https://example.com/image17.jpg",
    "name": "ryan clark",
    "title": "product manager",
    "paragraph": "ryan oversees product development from conception to launch, ensuring market success."
  },
  {
    "image": "https://example.com/image18.jpg",
    "name": "sophia young",
    "title": "graphic designer",
    "paragraph": "sophia creates visually appealing designs for websites, branding, and print media."
  },
  {
    "image": "https://example.com/image19.jpg",
    "name": "william harris",
    "title": "software developer",
    "paragraph": "william specializes in building web applications and developing software solutions."
  },
  {
    "image": "https://example.com/image20.jpg",
    "name": "chloe lewis",
    "title": "seo expert",
    "paragraph": "chloe optimizes website content and strategies to improve search engine rankings."
  }
]

app.get("/AllData", (req, res) => {
  res.json(AllData);
});


////mongodb////


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        
    app.get('/bookData/:id', async(req, res) =>{
      const id = req.params.id 
      const query = { _id: new ObjectId(id) }
      const result = await bookCollection.findOne(query)
      res.send(result)
    }) 


    //crud operation////

    const wishCollection = client.db('wishlistDB').collection('wishlistData')
    

    /////add system////////
    app.post('/wishlistData', async(req, res) =>{
       
       const wishlistData = req.body 
       console.log(wishlistData)
       const result = await wishCollection.insertOne(wishlistData)
       res.send(result)
     
    }) 
    /////add system////////
    
    //////read/////////////

    app.get('/wishlistData', async(req, res) => {
         
    const cursor = wishCollection.find()
    const result = await cursor.toArray()
    res.send(result)
          
    })
    
    //////read/////////////
   




    //crud operation////





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