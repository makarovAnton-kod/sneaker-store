import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 6;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function(email) {
                const user = await User.findOne({ email });
                return !user;
            },
            message: 'This user is already registered!',
        },
    },
    displayName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    },
});

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
