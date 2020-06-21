const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const sslRedirect = require("heroku-ssl-redirect");

//import Schema and Resolver
const graphQLSchema = require("./server/graphql/schema/index");
const graphQLResolvers = require("./server/graphql/resolvers/index");

const app = express();

// redirect to https for heroku
app.use(sslRedirect());

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
app.use(express.static(path.join(__dirname + '/client', 'build')));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
})

//port
const port = process.env.PORT || 5000;

//connect to database
mongoose
.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ruxnn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(() => {
  //start up server if success
  app.listen(port, () => console.log("Express Server is up and running"));
})
.catch(err=>console.log(err));
