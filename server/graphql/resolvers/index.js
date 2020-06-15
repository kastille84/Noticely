const userResolver = require("./user");
const flyerResolver = require("./flyer");
const placeResolver = require("./place");

const rootResolver = {
  ...userResolver,
  ...flyerResolver,
  ...placeResolver
}

module.exports = rootResolver;
