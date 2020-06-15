//packages
const jwt = require("jsonwebtoken");

//Model
const User = require('../../models/User');
const Flyer = require('../../models/Flyer');
const Place = require('../../models/Place');


module.exports = {
    getPlaces: async(args, req) => {
        const places = await Place.find();
        console.log("places found", places)
        return places;
    }
 
}