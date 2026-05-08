import scrapsStory from "../services/scraper.js";

export const scraperController = async (req, res) => {
  try {
    const data = await scrapsStory();
    return res.status(200).json({
      status: true,
      message: "Story saved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
