import { FeedBack_Prompt } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { conversation } = await req.json();

  const Final_Feedback_Prompt = FeedBack_Prompt.replace(
    "{{conversation}}",
    JSON.stringify(conversation)
  );

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-large",
      messages: [
        { role: "system", content: "Respond ONLY with valid JSON. Do not include any extra text outside JSON." },
        { role: "user", content: Final_Feedback_Prompt }
      ],
      max_tokens: 300,
    });

    // Extract the message content
    let content = completion.choices[0].message.content;

    // Optional: Extract JSON if AI still adds formatting
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "AI did not return valid JSON" }, { status: 500 });
    }

    const parsedFeedback = JSON.parse(jsonMatch[0]); // now safe

    return NextResponse.json(parsedFeedback); // send clean JSON to frontend

  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err.message || err }, { status: 500 });
  }
}
