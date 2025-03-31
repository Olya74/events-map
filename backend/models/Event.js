import {Schema,model} from 'mongoose';

const eventSchema= new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
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