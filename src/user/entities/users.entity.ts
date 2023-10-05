import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  mobile_number: {
    type: String,
    required: true,
    default: true,
  },
});

export const UsersModel = model("users", UserSchema);
