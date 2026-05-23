import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const prompt = `
請生成一張直式 9:16 高質感靈性海報。

主題：每日冥想
內容：試著每天都練習冥想，先從10分鐘開始，每周增加1分鐘，直到可以完全冥想到一個小時。
視覺元素：盛開的蓮花、堆疊的禪石、緩緩升起的檀香煙霧、柔和光影、宇宙星空感。

風格：自然寫實、神聖光影、細膩質感、電影級海報感。
不要 AI 感。
`;

const result = await ai.models.generateContent({
  model: "gemini-3.1-flash-image-preview",
  contents: prompt
});

const imagePart = result.candidates?.[0]?.content?.parts?.find(
  part => part.inlineData?.data
);

if (!imagePart) {
  throw new Error("Gemini 沒有回傳圖片");
}

fs.mkdirSync("output", { recursive: true });

const imageBuffer = Buffer.from(imagePart.inlineData.data, "base64");
fs.writeFileSync("output/test.png", imageBuffer);

console.log("圖片已產生：output/test.png");
