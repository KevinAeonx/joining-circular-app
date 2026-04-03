import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { GenerateParagraphRequest, GenerateParagraphResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateParagraphRequest = await req.json();
    const { formData } = body;

    const pronoun = formData.gender === "she" ? "She" : "He";
    const possessive = formData.gender === "she" ? "her" : "his";
    const objective = formData.gender === "she" ? "her" : "him";
    const salutation = formData.gender === "she" ? "Ms." : "Mr.";

    // Parse date parts directly to avoid timezone offset issues
    const formattedDate = formData.joiningDate
      ? (() => {
          const [year, month, day] = formData.joiningDate.split("-").map(Number);
          return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
        })()
      : "";

    const datePhrase = formattedDate
      ? `on ${formattedDate}`
      : "recently";

    const prompt = `
You are writing a warm, professional welcome paragraph for a company joining circular at AeonX Digital.
Write exactly ONE paragraph (5-7 sentences, no bullet points, no headings).

Employee details:
- Full Name: ${formData.name}
- Job Title: ${formData.jobTitle}
- Joining Date phrase: "${datePhrase}"
- Reporting Manager (first name or full name, no salutation needed): ${formData.reportingManager}
- Office Location: ${formData.officeLocation}
- Languages known: ${formData.languages}
- Hobbies and interests: ${formData.hobbies}
- Email: ${formData.email}

Rules:
- Start with exactly: "Please join me in welcoming ${salutation} ${formData.name}, who has joined us as ${formData.jobTitle} ${datePhrase}."
- Next sentence: "${pronoun} will report to Mr. ${formData.reportingManager}."
- Include a sentence about being thrilled to have ${objective} on board and looking forward to ${possessive} contributions in driving business growth.
- Mention the languages ${pronoun} is fluent in naturally (e.g. "${formData.name} is fluent in ...").
- Include ${possessive} hobbies/interests naturally (e.g. "Outside of work, ${pronoun.toLowerCase()} enjoys ...").
- End with: "You can reach ${objective} via email at ${formData.email}. And if you are in the ${formData.officeLocation} office, feel free to stop by and say hello to ${objective} in person."
- Output only the paragraph text, no extra formatting, no quotes around it.
`.trim();

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 450,
      messages: [{ role: "user", content: prompt }],
    });

    const paragraph =
      message.content[0].type === "text" ? message.content[0].text.trim() : "";

    return NextResponse.json<GenerateParagraphResponse>({ paragraph });
  } catch (error) {
    console.error("Anthropic API error:", error);
    return NextResponse.json<GenerateParagraphResponse>(
      { paragraph: "", error: "Failed to generate paragraph" },
      { status: 500 }
    );
  }
}
