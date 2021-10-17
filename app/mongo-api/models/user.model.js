const dotenv = require("dotenv").config();
const validator = require("validator");
const config = require("config");
const { toJSON, paginate } = require("./plugins");
const mongoose = require("mongoose");
const modelDebugger = require("debug")("app:model");

// schema
const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 255,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  dob: {
    type: Date,
    required: false,
    // validate: [validateDOB, 'Please enter a correct date'],
  },
  job_title: {
    type: [String],
    required: false,
  },
  department: {
    type: String,
    required: false,
  },
});

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if user email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeuserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({
    email,
    _id: { $ne: excludeUserId },
  });
  return !!user;
};

//@TODO Fix this function @Daniel
/**validateEmail
 * validate the email with a regex expression.
 * Returns:
 *  true: if email meets regex
 *  false: if email fails regex
 */
var validateEmail = async function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

/**
 * validate DOB to ensure user enters date in correct format
 */
//validateDOB = async function (dob) {

//};

/**
 * @typedef User
 * determines collection name to be "user"
 */
const User = mongoose.model("user", userSchema);
// const UserTest = mongoose.model("user_test", userSchema);

/**
 * @todo Test if this works
 */
module.exports = User;
// module.exports = UserTest;
