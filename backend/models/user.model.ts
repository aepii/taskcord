import mongoose from "mongoose";

export interface User {
  discordId: string;
  discordUsername: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<User>(
  {
    discordId: {
      type: String,
      required: [true, "Discord ID is required."],
      unique: true,
      index: true,
    },
    discordUsername: {
      type: String,
      required: [true, "Discord username is required."],
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address."],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
