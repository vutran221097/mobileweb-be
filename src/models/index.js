import mongoose from "mongoose"
import UserProfile from "./user.model"
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.user = UserProfile;

export default db