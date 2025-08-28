import { NextResponse } from "next/server";
import OpenAI from "openai";
import { QUESTIONS_PROMPT } from './../../../services/Constants';

export async function POST(req) {
    try {
        const { jobPosition, Description, Duration, type } = await req.json();

        const FinalPrompt = QUESTIONS_PROMPT
            .replace('{{jobPosition}}', jobPosition)
            .replace('{{jobDescription}}', Description)
            .replace('{{Duration}}', Duration)
            .replace('{{Type}}', type);

        console.log(FinalPrompt);


        const openai = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: "mistralai/mistral-7b-instruct",
            messages: [{ role: 'user', content: FinalPrompt, },],
        });
        console.log(completion.choices.[0].message);
        
        // ✅ correct way to extract content
        // const content = completion.choices?.[0]?.message?.content || "No response";
        // console.log("AI Response:", content);

        return NextResponse.json({ success: true, content });

    } catch (err) {
        console.error("API Error:", err); // full error with stack trace
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
