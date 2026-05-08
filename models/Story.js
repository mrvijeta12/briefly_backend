import mongoose from "mongoose";
const storySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  points: {
    type: String,
  },
  author: {
    type: String,
  },
  postedAt: {
    type: String,
  },
});

const Story = mongoose.model("Story", storySchema);
export default Story;
