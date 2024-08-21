const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
email: {type: String, required: true, unique: true },
password: {type: String, required: true },
firstname: {type: String, required: true},
lastname: {type: String, required: true},
gender: {type: String, required: true},
birthdate: {type: String, required: true},
address: {type: String, required: true},
phone: {type: String, required: true},
});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;