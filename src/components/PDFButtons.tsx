"use client";

import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDF } from "./ResumePDF";
import { CoverLetterPDF } from "./CoverLetterPDF";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PDFButtons = ({ data }: { data: any }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !data) return null;

  return (
    <div className="flex gap-4">
      <PDFDownloadLink
        document={<ResumePDF data={data} />}
        fileName="Curriculo_Otimizado.pdf">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {({ loading }: any) => (
          <Button disabled={loading}>
            <Download className="mr-2 h-4 w-4" />
            {loading ? "Gerando PDF..." : "Baixar Currículo"}
          </Button>
        )}
      </PDFDownloadLink>

      <PDFDownloadLink
        document={<CoverLetterPDF data={data} />}
        fileName="Cover_Letter.pdf">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {({ loading }: any) => (
          <Button variant="outline" disabled={loading}>
            <Download className="mr-2 h-4 w-4" />
            {loading ? "Gerando Carta..." : "Baixar Carta de Apresentação"}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
};
