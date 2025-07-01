
const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://pastilkaxo:Obobad73@cluster0.toffsbm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb://localhost:27017/"

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const DbClient = {
  client, 
  connect: async () => {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Connected to MongoDB!");
      return client;
    }
    catch (err) {
      console.error(err);
    }
    
  },
  close: async () => {
    try {
      await client.close();
      console.log("Connection closed!")
    }
    catch (err) {
      console.error(err);
    }
  }
}

module.exports = DbClient;




