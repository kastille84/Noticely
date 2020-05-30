const {buildSchema} = require("graphql");

module.exports = buildSchema(`
  type Dummy {
    _id: ID!
    text: String!
  }
  
  type RootQuery {
    dummies: [Dummy!]!
  }

  type RootMutation {
    createDummy(text:String!):Dummy!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
