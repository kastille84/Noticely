const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import the models
const User = require("../../models/User");

module.exports = {
  registerUser: async(args) => {
    console.log("args", args);
    try {
      // look for user with the same email address
      const existingUser = await User.findOne({email: args.userInput.email});
      // means user already exists in DB
      if(existingUser) {
        throw new Error("Email exists already.")
      }
      // user doesnt exist, lets add them
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        password: hashedPassword
      });
      const result = await user.save();
      // create a token
      const token = jwt.sign(
        {
        _id: user._id,
        email: user.email
        },
        "somesupersecretKey",
        {
          expiresIn: '2h'
        });
      return {
        ...result._doc,
        token: token,
        password: null
      };
    } catch(err) {
      throw err;
    }
  }
}