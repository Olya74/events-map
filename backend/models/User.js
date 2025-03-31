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
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event',
    }],

});
// userSchema.pre('save', function(next) {
//     this.updatedAt = Date.now();
//     next();
// }
// );
const User = model('User', userSchema);
export default User;
