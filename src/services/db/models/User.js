import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    verified: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.AuthUser || model("AuthUser", UserSchema);

export default User;
