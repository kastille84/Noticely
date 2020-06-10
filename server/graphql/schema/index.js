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
  type S3 {
    signedRequest: String!
    url: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input S3Input {
    fileName: String!
    fileType: String!
  }
  
  type RootQuery {
    dummies: [Dummy!]!
    getUserInfo: User!
    loginUser(loginInput:LoginInput!):User!
    signS3(s3Input: S3Input!): S3!
  }

  type RootMutation {
    registerUser(userInput:UserInput!):User! 
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
