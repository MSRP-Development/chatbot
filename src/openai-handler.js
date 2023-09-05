import dotenv from "dotenv";
dotenv.config();
import { OpenAI } from "openai";
import { getPayload, openAIConfig } from "../config.js";
import { splitIntoLines } from "./util.js";

// OpenAI API Client Init
const handler = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handleMessage = async (message) => {
  return new Promise(async (resolve) => {
    const outboundMessages = [
      {
        role: "system",
        content: openAIConfig.content,
      },
      {
        role: "user",
        content: message.content,
      },
    ];

    // Request OpenAI
    const payload = getPayload(outboundMessages);
    const response = await handler.chat.completions.create(payload);

    // Parse OpenAI Response
    const answerRaw = response.choices[0].message.content;
    const answer = splitIntoLines(answerRaw, 2000);

    console.log(answer);

    resolve(answer);
  });
};
