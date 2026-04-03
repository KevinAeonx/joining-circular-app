import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

// GET /api/options?category=job_title
export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  if (!category) {
    return NextResponse.json({ error: "category is required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("dropdown_options")
    .select("value")
    .eq("category", category)
    .order("value", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ options: data.map((r) => r.value) });
}

// POST /api/options  { category, value }
export async function POST(req: NextRequest) {
  const { category, value } = await req.json();
  if (!category || !value) {
    return NextResponse.json({ error: "category and value are required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("dropdown_options")
    .insert({ category, value })
    .select()
    .single();

  // Ignore unique-constraint violations (already exists)
  if (error && !error.message.includes("unique")) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
