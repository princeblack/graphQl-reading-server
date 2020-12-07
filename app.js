const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

// allow cross-origine requests
app.use(cors(
  {
    origin: ["*","http://localhost:3000"],
    allowedHeaders:'Origin, X-Requested-With, Content, Accept,Content-Type,Authorization',
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204

  }
))
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
