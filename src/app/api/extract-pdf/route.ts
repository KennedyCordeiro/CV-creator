import { NextRequest, NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo fornecido" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();

    return NextResponse.json({ text: data.text });
  } catch (error) {
    console.error("Erro ao processar PDF:", error);
    return NextResponse.json(
      { error: "Falha ao extrair texto do PDF" },
      { status: 500 },
    );
  }
}
