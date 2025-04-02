import {Schema,model} from 'mongoose';

const eventSchema= new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category:{
        type: String,
        enum: ['sports', 'music', 'art', 'technology', 'food', 'travel','other'],
        default: 'other',
        
    },
    date: {
        type: Date,
        default: Date.now,
    },
    image:{
        type: String,
    
    },
    location: {
        type: String,
    },
     author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
     },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
});
// eventSchema.pre('save', function(next) {
//     this.updatedAt = Date.now();
//     next();
// }
// );
const Event = model('Event', eventSchema);
export default Event;