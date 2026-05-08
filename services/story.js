import Story from "../models/Story.js";
import User from "../models/User.js";

//! get stories
export const getStories = async (limit, page) => {
  const totalStories = await Story.countDocuments();
  const stories = await Story.find()
    .sort({ points: -1 })
    .limit(page * limit);
  return { stories, totalStories, totalPages: Math.ceil(totalStories / limit) };
};
//! get story by id

export const getStoryById = async (storyId) => {
  const story = await Story.findById(storyId);
  if (!story) {
    throw new Error(`Story is not found with this id ${storyId}`);
  }
  return story;
};

//! bookmark story

export const bookmarkStory = async (userId, storyId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User is not found with this id ${userId}`);
  }
  const story = await Story.findById(storyId);
  if (!story) {
    throw new Error(`Story is not found with this id ${storyId}`);
  }

  const isBookmarked = user.bookmarks.some((id) => id.toString() === storyId);

  let updateUser;
  if (isBookmarked) {
    updateUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { bookmarks: storyId } },
      { new: true },
    );
  } else {
    updateUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { bookmarks: storyId } },
      { new: true },
    );
  }

  await user.save();
  return {
    message: isBookmarked ? "Bookmark removed" : "Bookmark added",
    bookmarks: updateUser.bookmarks,
  };
};
