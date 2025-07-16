//Initialization
import app from './app.js';
import mongoose from'mongoose';
const port = 3000;

const uri = "mongodb+srv://ishangirinp:ishan123@cluster0.zvnauy7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
//Routes
app.get('/', (_req, res)=>{
    res.send("This is the Homepage.");
});
//Starting the server a port
app.listen(port,()=>{
    console.log(`Server Started at PORT: ${port}`);
});
 

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await mongoose.disconnect();
  }
}
run().catch(console.dir);