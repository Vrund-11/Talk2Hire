import { NextResponse } from "next/server";
import OpenAI from "openai";
import { QUESTIONS_PROMPT } from './../../../services/Constants';

export async function POST(req) {
    try {
        const { jobPosition, jobDescription, Duration, type } = await req.json();

        const FinalPrompt = QUESTIONS_PROMPT
            .replace('{{jobPosition}}', jobPosition)
            .replace('{{jobDescription}}', jobDescription)
            .replace('{{Duration}}', Duration)
            .replace('{{type}}', type);

        console.log("📌 Final Prompt:", FinalPrompt);

        const openai = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY, // make sure this is in .env.local
        });

        const completion = await openai.chat.completions.create({
            model: "mistralai/mistral-large", // ✅ you can swap this with mistral/llama/etc.
            messages: [
                { role: "user", content: FinalPrompt },
            ],
            max_tokens: 300, // Limiting tokens to fit within credit limits
        });

        // ✅ extract the AI response
        const content = completion.choices?.[0]?.message?.content || "No response";
        console.log("🤖 AI Response:", content);

        return NextResponse.json({ success: true, content });

    } catch (err) {
        console.error("❌ API Error:", err.response?.data || err.message || err);
        return NextResponse.json(
            { success: false, error: err.response?.data || err.message },
            { status: 500 }
        );
    }
}
