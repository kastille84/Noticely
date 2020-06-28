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
    password: String
    token: String
  }

  type S3 {
    signedRequest: String!
    url: String!
  }
  type ContactType {
    phone: String!
    email: String!
  }
  type LatLngType {
    lat: String!
    lng: String!  
  }

  type Flyer{
    _id: ID!
    placeId: String! 
    user: User
    name: String!
    heading: String! 
    description: String!
    images: [String]!
    contact: ContactType
    createdAt: String!
    updatedAt: String!
  }
  type FlyerByUser {
    _id: ID!
    placeId: Place
    user: User
    name: String!
    heading: String! 
    description: String!
    images: [String]!
    contact: ContactType
    createdAt: String!
    updatedAt: String!
  }
 
  type Place {
    _id: ID!
    place_id: String!
    formattedAddress: String!
    name: String!
    latlng: LatLngType!
  }

  input LatLng {
    lat: String!
    lng: String!
  }
  input Contact {
    phone: String
    email: String
  }

  input FlyerInput {
    placeId: String! 
    formattedAddress: String! 
    latlng: LatLng!
    name: String!
    heading: String! 
    description: String!
    images: [String]!
    contact: Contact!
  }
  input EditFlyerInput {
    _id: ID!
    placeId: String! 
    formattedAddress: String! 
    latlng: LatLng!
    name: String!
    heading: String! 
    description: String!
    images: [String]!
    contact: Contact!
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
  input FlyersByPlaceInput {
    place_id: String!
  }
  
  type RootQuery {
    dummies: [Dummy!]!
    getUserInfo: User!
    loginUser(loginInput:LoginInput!):User!
    signS3(s3Input: S3Input!): S3!
    getPlaces: [Place]!
    getFlyersByPlace(flyersByPlaceInput:FlyersByPlaceInput!): [Flyer]!
    getFlyersByUser(userId: ID!): [FlyerByUser]!
  }

  type RootMutation {
    registerUser(userInput:UserInput!):User! 
    makeFlyer(flyerInput:FlyerInput!): Flyer!
    editFlyer(editFlyerInput:EditFlyerInput!): Flyer!
    deleteFlyer(flyerId: ID!): Flyer!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
