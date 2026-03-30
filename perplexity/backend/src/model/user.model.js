import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true, // this removes extra sapce from the given input ex :  " kshitij " => "kshitij"
      minlength: 3,// this makes the minimum length of the username to 3 if less than n3 throws error
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // auto adds createdAt & updatedAt
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;