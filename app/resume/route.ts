import { createElement, type ReactElement } from "react";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import { buildResume } from "@/lib/resume/data";
import { ResumeDocument } from "@/lib/resume/ResumeDocument";

// Generated on the server (Node runtime) — the heavy PDF lib never reaches the
// client bundle; visitors only download the final .pdf.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") === "pt" ? "pt" : "en";

  const data = buildResume(lang);
  const buffer = await renderToBuffer(
    createElement(ResumeDocument, { data }) as unknown as ReactElement<DocumentProps>,
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="guilherme-illescas-cv-${lang}.pdf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
