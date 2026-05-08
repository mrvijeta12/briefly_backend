import { bookmarkStory, getStories, getStoryById } from "../services/story.js";

//! get all story
export const getStoriesController = async (req, res) => {
  // console.log("hitted");
  // console.log(req.url);

  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);

    const data = await getStories(limit, page);

    return res.status(200).json({
      status: true,
      message: "Storied fetched successfully",
      stories: data.stories,
      pagination: {
        currentPage: page,
        limit,
        totalStories: data.totalStories,
        totalPages: data.totalPages,
        hasMore: page < data.totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! get story by id

export const getStoriesByIdController = async (req, res) => {
  const storyId = req.params.id;
  try {
    const story = await getStoryById(storyId);
    return res.status(200).json({
      status: true,
      message: "Story fetched successfully",
      story,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//! bookmark story
export const bookmarkStoriesController = async (req, res) => {
  const userId = req.user;
  const storyId = req.params.id;
  try {
    const data = await bookmarkStory(userId, storyId);
    return res.status(200).json({
      status: true,
      message: data.message,
      stories: data.bookmarks,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
