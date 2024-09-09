// const apiKey = "AIzaSyDwsZoGw_jN7WK402wNeDJRsJ_rF0tlVYA"
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
// import 'dotenv/config';  // Or require('dotenv').config() if using CommonJS

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
        ],
    });

    const result = await chatSession.sendMessage(prompt);
    
    // Ensure result.response.text() is awaited if it's a promise
    const text = await result.response.text(); 

    console.log(text);
    return text;  // Return the result directly
}

export default run;