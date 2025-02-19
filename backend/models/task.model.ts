import mongoose from "mongoose";

export type TaskStatus = "open" | "closed" | "pending";

export interface Task {
  title: string;
  description?: string;
  labels?: string[];
  usersAssigned?: mongoose.Schema.Types.ObjectId[];
  createdBy: string;
  status: TaskStatus;
  serverOwnership: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const taskSchema = new mongoose.Schema<Task>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    labels: {
      type: [String],
      default: [],
    },
    usersAssigned: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
      index: true,
      validate: {
        validator: function (usersAssigned: mongoose.Schema.Types.ObjectId[]) {
          return usersAssigned.length === new Set(usersAssigned).size;
        },
        message: "Users assigned array contains duplicate values.",
      },
    },
    createdBy: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["open", "closed", "pending"],
      default: "open",
      index: true,
    },
    serverOwnership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Server",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model<Task>("Task", taskSchema);

export default TaskModel;
