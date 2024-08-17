"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const PORT = 9101;
const OPENAI_API_KEY = "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";
app.get("/", (req, res) => {
    console.log("hey im in / path");
    console.log("req.body", req.body);
    res.send("API is working");
});
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { platform, idea } = req.body;
    console.log("idea: ", idea, "platform: ", platform);
    if (!platform || !idea) {
        res.status(400).json({ error: "Platform and Idea are required." });
    }
    // console.log("platform", platform, "idea", idea);
    // res.status(200).json({ platform, idea });
    try {
        const response = yield axios_1.default.post("https://api.openai.com/v1/chat/completions", {
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
}));
app.listen(PORT, () => {
    console.log(`Listening on port: `, PORT);
});
