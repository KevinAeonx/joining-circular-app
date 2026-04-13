import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { GenerateBirthdayResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { name, role } = await req.json();

    const prompt = `Write exactly ONE warm birthday greeting (under 28 words) for ${name}${role ? `, who works as ${role}` : ""} at AeonX Digital. Make it joyful and personal. Do NOT start with "Happy Birthday" or the person's name. Output only the sentence, no quotes.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 80,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text.trim() : "";
    return NextResponse.json<GenerateBirthdayResponse>({ message: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json<GenerateBirthdayResponse>(
      { message: "", error: "Failed to generate message" },
      { status: 500 }
    );
  }
}
