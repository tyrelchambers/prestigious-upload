import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  website: String,
  twitter: String,
  facebook: String,
  instagram: String,
  reddit: String,
  youtube: String,
  user_id: String
});

const Profile = mongoose.model("Profile", profileSchema);

modules.exports = Profile;