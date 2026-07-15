import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || "");

export async function POST(req: NextRequest) {
  try {
    const { baseResume, jobDescription, language } = await req.json();

    if (!baseResume || !jobDescription) {
      return NextResponse.json(
        { error: "Currículo base e descrição da vaga são obrigatórios" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API) {
      return NextResponse.json(
        { error: "API Key do Gemini não configurada" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const langText = language === "en" ? "English" : "Português";

    const prompt = `Você é um especialista em recrutamento, RH e Otimização de Currículos (ATS). 
Seu objetivo é analisar o "Currículo Base" do candidato e a "Descrição da Vaga", e gerar um currículo otimizado e uma carta de apresentação sob medida para esta vaga, garantindo NÃO inventar experiências ou habilidades que o candidato não possui, apenas realçando as que estão aderentes à vaga.

O idioma da resposta deve ser ESTRITAMENTE: ${langText}.

Currículo Base:
${baseResume}

Descrição da Vaga:
${jobDescription}

Retorne um objeto JSON ESTRITAMENTE com a seguinte estrutura e preencha todos os campos da melhor forma:
{
  "header": {
    "name": "Nome do Candidato (extraia do currículo base)",
    "email": "Email (extraia do currículo base)",
    "phone": "Telefone (extraia do currículo base)",
    "location": "Localização (extraia do currículo base)",
    "linkedin": "URL do LinkedIn (se houver)",
    "github": "URL do GitHub (se houver)"
  },
  "summary": "Um resumo profissional impactante (3 a 4 frases) focando no alinhamento com a vaga.",
  "experience": [
    {
      "company": "Nome da Empresa",
      "position": "Cargo",
      "period": "Período (Ex: Jan 2020 - Present)",
      "description": [
        "Ponto 1 destacando resultados e habilidades relevantes para a vaga",
        "Ponto 2 destacando resultados...",
        "Ponto 3 destacando resultados..."
      ]
    }
  ],
  "education": [
    {
      "institution": "Nome da Instituição",
      "degree": "Grau/Curso",
      "period": "Período"
    }
  ],
  "skills": ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
  "coverLetter": "O texto completo de uma carta de apresentação persuasiva e profissional, direcionada ao recrutador da vaga."
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanJson = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    
    return NextResponse.json(JSON.parse(cleanJson));

  } catch (error) {
    console.error("Erro ao gerar currículo:", error);
    return NextResponse.json(
      { error: "Falha ao gerar o currículo com a IA" },
      { status: 500 }
    );
  }
}
