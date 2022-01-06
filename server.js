//requiering express and initializing the app:
const app = require("express")();
//requiering the cors middleware:
const cors = require("cors");

const PORT = 5000; //we will use port 5000

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://sunnaosp:tskoli22@cluster0.sfwuu.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors()); //telling express to use the cors middleware

app.get("/", (req, res) => {
  //listen to a get request
  client.connect(async (err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    const data = await collection.find().toArray();
    res.send(JSON.stringify(data));
  });
});

app.listen(PORT, () => {
  //listen to the port we chose above
  //print to the console that the server is listening
  console.log("listening to port: " + PORT);
});
