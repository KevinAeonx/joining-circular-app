import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { GenerateAnniversaryResponse } from "@/types";

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export async function POST(req: NextRequest) {
  try {
    const { name, years, role } = await req.json();

    const prompt = `Write exactly ONE warm, celebratory sentence (under 28 words) for ${name}'s ${ordinal(years)} work anniversary at AeonX Digital.${role ? ` They work as ${role}.` : ""} Make it heartfelt and specific to the milestone. Do NOT start with the person's name. Output only the sentence, no quotes.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 80,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text.trim() : "";
    return NextResponse.json<GenerateAnniversaryResponse>({ message: text });
  } catch (error) {
    console.error(error);
    return NextResponse.json<GenerateAnniversaryResponse>(
      { message: "", error: "Failed to generate message" },
      { status: 500 }
    );
  }
}
