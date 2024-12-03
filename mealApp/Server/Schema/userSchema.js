import mongoose from "mongoose"; // Importing mongoose using ES Module syntax

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userID: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

// Export the User model as the default export
export default User;