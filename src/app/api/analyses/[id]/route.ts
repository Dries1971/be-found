import { NextResponse } from "next/server";
import { getAnalysis, isAnalysisId } from "@/lib/page-analysis";
import { isKnownAnalysis, recordStatus } from "@/lib/analyze-guard";

export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

/** Status for the waiting screen. The browser polls this; only this server talks to the API. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!isAnalysisId(id) || !(await isKnownAnalysis(id))) {
    return NextResponse.json({ status: "unknown" }, { status: 404, headers: noStore });
  }

  try {
    const analysis = await getAnalysis(id);
    await recordStatus(id, analysis.status, analysis.result?.overall_score ?? null);
    return NextResponse.json({ status: analysis.status }, { headers: noStore });
  } catch (err) {
    console.error("[analyze] status poll failed", err);
    return NextResponse.json({ status: "unknown" }, { status: 502, headers: noStore });
  }
}
