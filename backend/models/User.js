import { genSalt, hash } from 'bcrypt';
import {Schema, model} from 'mongoose';

const userSchema= new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
        default:''
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['admin', 'user', 'guest'],
        default: 'user',
    },
    eventId: [{
        type: Schema.Types.ObjectId,
        ref: 'Event',
    }],

},{
    timestamps: true,
});



const User = model('User', userSchema);
export default User;
