import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ["sports", "music", "art", "technology", "food", "travel", "other"],
    default: "other",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  media: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["image", "video"],
        required: true,
      },
    },
  ],
  location: {
    lat: Number,
    lng: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
});
// eventSchema.pre('save', function(next) {
//     this.updatedAt = Date.now();
//     next();
// }
// );
const Event = model("Event", eventSchema);
export default Event;
