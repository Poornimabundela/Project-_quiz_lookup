import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrollmentNumber: { type: String },
  branch: { type: String },
  phoneNumber: { type: String },
  collegeName: { type: String },
  year: { type: String },
  semester: { type: String },
  userType: { type: String, enum: ['0', '1'], default: '0' }, // '0' for user, '1' for admin
  isAdmin: { type: Boolean, default: false }, // For identifying admin users
  secretId: { type: String }, // Secret ID for admin login
});

const User = mongoose.model("User", userSchema);

export default User;
