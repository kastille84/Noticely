const {buildSchema} = require("graphql");

module.exports = buildSchema(`
  type Dummy {
    _id: ID!
    text: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    token: String!
  }
  input UserInput {
    name: String!
    email: String!
    password: String!
  }
  
  type RootQuery {
    dummies: [Dummy!]!
    getUserInfo: User!
  }

  type RootMutation {
    registerUser(userInput:UserInput!):User! 
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
