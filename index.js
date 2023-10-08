const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bwrtzwz.mongodb.net/?retryWrites=true&w=majority`;

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
    const loveCollection = client.db("loveCalculator").collection("name");

    app.post('/name', async(req, res)=> {
        const name = req.body;
        const result = await loveCollection.insertOne(name);
        res.send(result);
    })

  } finally {
    
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('love calculator server is running')
  });

  app.listen(port, () => {
    console.log(`Love calculator running on port ${port}`)
  }) 