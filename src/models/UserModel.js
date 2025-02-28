const { default: mongoose } = require("mongoose");
const crypto = require("node:crypto");

const userSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false,
        minLength: 8
    },
    salt: {
        type: String,
        required: false,
        unique: false,
        default: function () {
            let newUserSalt = crypto.randomBytes(64).toString("hex");
            return newUserSalt
        }
    },

},

{
    timestamps: true
}

);

userSchema.pre("save", async (next) => {

    if (!this.isModified("password")){
        return next();
    }

    // assume the password has been modified from here onwards

    if (!this.salt){
        this.salt = crypto.randomBytes(64).toString("hex");
    }

    this.password = crypto.scryptSync(this.password, this.salt, 64).toString("hex");

    next();

});

// make model using the schema

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}