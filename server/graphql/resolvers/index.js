const userResolver = require("./user");
const flyerResolver = require("./flyer");

const rootResolver = {
  ...userResolver,
  ...flyerResolver
}

module.exports = rootResolver;
