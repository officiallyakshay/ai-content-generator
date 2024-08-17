import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 9101;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
app.get("/", (req, res) => {
    console.log("hey im in / path");
    console.log("req.body", req.body);
    res.send("API is working");
});
app.post("/", async (req, res) => {
    const { platform, idea } = req.body;
    console.log("idea: ", idea, "platform: ", platform);
    if (!platform || !idea) {
        res.status(400).json({ error: "Platform and Idea are required." });
    }
    // console.log("platform", platform, "idea", idea);
    // res.status(200).json({ platform, idea });
    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful assistant that generates video ideas for social media platforms. Provide creative suggestions for ${platform} videos based on the topic of ${idea}.`,
                },
                {
                    role: "user",
                    content: `Suggest some video ideas for ${platform} about ${idea}.`,
                },
            ],
            max_tokens: 150,
        }, {
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
        });
        const chatResponse = response.data.choices[0].message.content;
        res.send(chatResponse);
    }
    catch (error) {
        console.error("Error fetching from OpenAI: ", error);
        res.status(500).json({ error: "Error fetch from OpenAI" });
    }
});
app.listen(PORT, () => {
    console.log(`Listening on port: `, PORT);
});
