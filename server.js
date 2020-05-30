const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");

//import Schema and Resolver
const graphQLSchema = require("./server/graphql/schema/index");
const graphQLResolvers = require("./server/graphql/resolvers/index");

const app = express();

app.use(bodyParser.json());

//for CORS
app.use(cors());

//graphQL entry
app.use("/graphql", graphqlHttp({
  schema: graphQLSchema,
  rootValue: graphQLResolvers,
  graphiql: true
}));


//set static folder
app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
})

//port
const port = process.env.PORT || 8000;

//connect to database
mongoose
.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ruxnn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(() => {
  //start up server if success
  app.listen(port, () => console.log("Express Server is up and running"));
})
.catch(err=>console.log(err));
