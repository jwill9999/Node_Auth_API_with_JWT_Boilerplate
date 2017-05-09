const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


// Define schema
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    password: String
});


//on save hook for hash and salting password
userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        hash = bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});


// compare hash user password against loginPassword
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {        
        if (err) {
            return callback(err)
        }
            callback(null, isMatch)
    });
}

// Create Model Class
const userModel = mongoose.model('user', userSchema);

//Export model
module.exports = userModel;


