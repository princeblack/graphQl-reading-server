const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

// allow cross-origine requests
app.use(cors())
// connect to mongoDb database
mongoose.connect(
  "mongodb+srv://princeblack:Africadmc01@cluster0.cdxps.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

// middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.get('/' ,function (req,res) {
  res.sendFile(__dirname + '/public/index.html');
})
// app listening port
app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
