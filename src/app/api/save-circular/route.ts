import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";
import { SaveCircularRequest, SaveCircularResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: SaveCircularRequest = await req.json();
    const { formData, paragraph } = body;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("circulars")
      .insert({
        name: formData.name,
        gender: formData.gender,
        job_title: formData.jobTitle,
        joining_date: formData.joiningDate || null,
        reporting_manager: formData.reportingManager,
        languages: formData.languages || null,
        hobbies: formData.hobbies || null,
        email: formData.email,
        office_location: formData.officeLocation,
        paragraph,
      })
      .select("id")
      .single();

    if (error) throw error;

    return NextResponse.json<SaveCircularResponse>({ id: data.id });
  } catch (error) {
    console.error("Save circular error:", error);
    return NextResponse.json<SaveCircularResponse>(
      { error: "Failed to save circular" },
      { status: 500 }
    );
  }
}
