import {Schema, model} from 'mongoose';

const commentSchema = new Schema({
    text:String,
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
});
const Comment = model('Comment', commentSchema);
export default Comment;