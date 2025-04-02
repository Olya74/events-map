import {Schema,model} from 'mongoose';


const chatMessageSchema = new Schema({
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
    }
})
const ChatMessage = model('ChatMessage', chatMessageSchema);
export default ChatMessage;