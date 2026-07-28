"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, UploadCloud, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { PDFButtons } from "@/components/PDFButtons";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [language, setLanguage] = useState("pt");
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("lastResumeData");
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setResult(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleGenerate = async () => {
    if (!file || !jobDescription) {
      alert("Por favor, envie o currículo em PDF e cole a descrição da vaga.");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const { PDFParse } = await import("pdf-parse");
      PDFParse.setWorker(
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.296/pdf.worker.min.mjs",
      );

      const arrayBuffer = await file.arrayBuffer();
      const parser = new PDFParse({ data: new Uint8Array(arrayBuffer) });
      const parseResult = await parser.getText();
      const baseResume = parseResult.text;

      const generateRes = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseResume, jobDescription, language }),
      });

      if (!generateRes.ok) {
        const errData = await generateRes.json().catch(() => ({}));
        throw new Error(errData.error || "Falha ao gerar o currículo com IA");
      }

      const generatedData = await generateRes.json();

      setResult(generatedData);
      localStorage.setItem("lastResumeData", JSON.stringify(generatedData));
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao processar. Verifique o console.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="text-start">
          <h1 className="text-4xl font-bold tracking-tight">Resume Creator</h1>
          <p className="text-neutral-500">
            Adapte seu currículo para qualquer vaga usando Inteligência
            Artificial.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Seu Currículo Atual</CardTitle>
                <CardDescription>
                  Faça upload do seu currículo base em formato PDF.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-neutral-200 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-white hover:bg-neutral-50 transition-colors">
                  <Input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    id="resume-upload"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <Label
                    htmlFor="resume-upload"
                    className="cursor-pointer flex flex-col items-center gap-2">
                    {file ? (
                      <>
                        <FileText className="h-8 w-8 text-blue-500" />
                        <span className="font-medium">{file.name}</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="h-8 w-8 text-neutral-400" />
                        <span className="font-medium text-neutral-600">
                          Clique para enviar seu PDF
                        </span>
                      </>
                    )}
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. A Vaga Desejada</CardTitle>
                <CardDescription>
                  Cole o texto completo da descrição da vaga (requisitos,
                  diferenciais).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Cole a descrição da vaga aqui..."
                  className="min-h-50"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Idioma do Resultado</Label>
                    <p className="text-sm text-neutral-500">
                      Escolha o idioma do currículo final
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">PT</span>
                    <Switch
                      checked={language === "en"}
                      onCheckedChange={(c) => setLanguage(c ? "en" : "pt")}
                    />
                    <span className="text-sm font-medium">EN</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleGenerate}
                  disabled={isLoading || !file || !jobDescription}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analisando e Adaptando...
                    </>
                  ) : (
                    "Adaptar Currículo"
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Resultado</CardTitle>
                <CardDescription>
                  Seu currículo adaptado e carta de apresentação aparecerão
                  aqui.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    <PDFButtons data={result} />

                    <Tabs defaultValue="resume" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="resume">Currículo</TabsTrigger>
                        <TabsTrigger value="coverletter">Carta</TabsTrigger>
                      </TabsList>

                      <TabsContent
                        value="resume"
                        className="mt-4 p-4 bg-white border rounded-lg min-h-100 text-sm overflow-y-auto max-h-150">
                        <h2 className="text-xl font-bold mb-1">
                          {result.header.name}
                        </h2>
                        <p className="text-neutral-500 mb-4">
                          {result.header.email} • {result.header.phone}
                        </p>

                        <h3 className="font-semibold uppercase text-xs tracking-wider mb-2 text-neutral-500">
                          Resumo
                        </h3>
                        <p className="mb-4">{result.summary}</p>

                        <h3 className="font-semibold uppercase text-xs tracking-wider mb-2 text-neutral-500">
                          Experiência
                        </h3>
                        <div className="space-y-4 mb-4">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {result.experience.map((exp: any, i: number) => (
                            <div key={i}>
                              <div className="flex justify-between font-medium">
                                <span>{exp.position}</span>
                                <span className="text-neutral-500 text-xs">
                                  {exp.period}
                                </span>
                              </div>
                              <div className="text-neutral-600 mb-1">
                                {exp.company}
                              </div>
                              <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                                {}
                                {exp.description.map(
                                  (desc: string, j: number) => (
                                    <li key={j}>{desc}</li>
                                  ),
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <h3 className="font-semibold uppercase text-xs tracking-wider mb-2 text-neutral-500">
                          Habilidades
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {}
                          {result.skills.map((skill: string, i: number) => (
                            <span
                              key={i}
                              className="bg-neutral-100 px-2 py-1 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent
                        value="coverletter"
                        className="mt-4 p-4 bg-white border rounded-lg min-h-[400px] text-sm whitespace-pre-wrap overflow-y-auto max-h-[600px]">
                        {result.coverLetter}
                      </TabsContent>
                    </Tabs>
                  </div>
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-neutral-400 text-center p-8 border-2 border-dashed rounded-lg">
                    {isLoading
                      ? "A inteligência artificial está trabalhando no seu currículo. Isso pode levar alguns segundos..."
                      : "Preencha os dados ao lado e clique em Adaptar para ver a mágica acontecer."}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
