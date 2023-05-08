import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: "string",
      required: true,
      min: 2,
      max: 50,
    },
    lastname: {
      type: "string",
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: "string",
      required: true,
      max: 50,
      unique: true,
    },
    passsword: {
      type: "string",
      requred: "true",
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: "string",
    occupation: String,
    viewdProfile: Number,
    impression: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
export default User;
