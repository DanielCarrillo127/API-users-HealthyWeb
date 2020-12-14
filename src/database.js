const mongoose  = require ('mongoose');

//const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : console.log('No found database');
const URI = 'mongodb://jhadechni:covid19-project2020@covid19-shard-00-00.4mvic.mongodb.net:27017,covid19-shard-00-01.4mvic.mongodb.net:27017,covid19-shard-00-02.4mvic.mongodb.net:27017/Recipes-db?ssl=true&replicaSet=atlas-tkdfnz-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true, 
})
.then(() => {
    console.log("Success when connecting to the database");
})
.catch(() => {
    console.error("Couldnt connect to the database. Exiting...");
    process.exit();
});

const connection = mongoose.connection;
connection.once('open',() => {
    console.log('[ Connection with DB sucefully ]');
});