import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // gives createdAt (message timestamp)
  }
);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;