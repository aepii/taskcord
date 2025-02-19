import mongoose from "mongoose";

export interface Server {
  serverId: string;
  authenticatedUsers: mongoose.Schema.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const serverSchema = new mongoose.Schema<Server>(
  {
    serverId: {
      type: String,
      required: [true, "Server ID is required."],
      unique: true,
      index: true,
    },
    authenticatedUsers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
      index: true,
      validate: {
        validator: function (
          authenticatedUsers: mongoose.Schema.Types.ObjectId[]
        ) {
          return authenticatedUsers.length === new Set(authenticatedUsers).size;
        },
        message: "Authenticated users array contains duplicate values.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const serverModel = mongoose.model<Server>("Server", serverSchema);

export default serverModel;
