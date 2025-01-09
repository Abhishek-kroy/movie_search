const { OpenAI } = require("openai");
require("dotenv").config();

const apiKey = process.env.APIKEY;
const baseURL = process.env.AIMLBASEURL;

const api = new OpenAI({
  apiKey,
  baseURL,
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async (req,res) => {
  const systemPrompt = "You are a movie Suggestor";
  const userPrompt = "Suggest 10 movie trending all over the globe right now";
  console.log("systemPrompt:", systemPrompt);
  console.log("userPrompt:", userPrompt);

  if (!systemPrompt || !userPrompt) {
    console.error("Both systemPrompt and userPrompt must be defined.");
    return;
  }

  let retries = 3;
  const retryDelay = 2000;
  while (retries > 0) {
    try {
      console.log("Sending request to API...");
      const completion = await api.chat.completions.create({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 1,
        max_tokens: 256,
      });

      const response = completion.choices[0].message.content;

      console.log("User:", userPrompt);
      console.log("AI:", response);
      return res.status(200).json({ success: true, response });
    } catch (error) {
      if (error.status === 429) {
        console.error("Rate limit exceeded. Retrying...");
        await delay(retryDelay);
      console.log("Retrying...");
        retries--;
      } else {
        console.error("Error:", error);
        console.error("Error details:", error.response ? error.response.data : error.message);
        return res.status(500).json({ success: false, error: "Internal server error." });
      }
    }
  }
  return res.status(503).json({ success: false, error: "Failed to fetch data after multiple retries." });
};

module.exports = main ;