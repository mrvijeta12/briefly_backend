import axios from "axios";
import * as cheerio from "cheerio";
import Story from "../models/Story.js";

const scrapsStory = async () => {
  const { data } = await axios.get("https://news.ycombinator.com");
  const $ = cheerio.load(data);
  const stories = $(".athing");

  stories.each(async (index, element) => {
    const currentElem = $(element);
    const subNextRow = currentElem.next();

    const title = currentElem.find(".titleline a").text().trim() || "";
    const url = currentElem.find(".titleline a").attr("href") || "";
    const points = subNextRow.find(".score").text().trim() || "0 points";
    const author = subNextRow.find(".hnuser").text().trim() || "Unknown";
    const postedAt = subNextRow.find(".age").attr("title") || "";

    console.log(title, url, points, author, postedAt);

    await Story.create({
      title,
      url,
      points,
      author,
      postedAt,
    });
  });

  return "Stories saved successfully";
};

export default scrapsStory;
