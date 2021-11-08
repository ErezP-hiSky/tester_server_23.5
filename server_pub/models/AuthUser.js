const mongoose = require('mongoose');

const AuthUserSchema = {
    _id: Number,
    name: String,
    email: String
};

AuthUserDataCollectionName = "auth_users";

module.exports = mongoose.model("AuthuserData", AuthUserSchema, AuthUserDataCollectionName);
