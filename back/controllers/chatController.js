require("dotenv").config();
const axios = require("axios");

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

exports.chat = async (req, res) => {
  const { message } = req.body;

  // Basic input validation
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required and must be a string." });
  }

  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
        // Optional generation settings
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 256,
          topP: 0.95,
          topK: 40,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";

    return res.status(200).json({ message: reply });

  } catch (error) {
    console.error("Gemini API Error:", error?.response?.data || error.message);

    return res.status(500).json({
      error: "Failed to fetch response from Gemini API.",
      details: error?.response?.data || error.message,
    });
  }
};
