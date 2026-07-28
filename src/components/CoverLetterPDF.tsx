import React from "react";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: 'Google Sans',
  fonts: [
    { src: '/fonts/GoogleSans-Regular.ttf' },
    { src: '/fonts/GoogleSans-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/GoogleSans-SemiBold.ttf', fontWeight: 600 },
    { src: '/fonts/GoogleSans-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/GoogleSans-Italic.ttf', fontStyle: 'italic' },
    { src: '/fonts/GoogleSans-MediumItalic.ttf', fontWeight: 500, fontStyle: 'italic' },
    { src: '/fonts/GoogleSans-SemiBoldItalic.ttf', fontWeight: 600, fontStyle: 'italic' },
    { src: '/fonts/GoogleSans-BoldItalic.ttf', fontWeight: 700, fontStyle: 'italic' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    color: "#333",
    lineHeight: 1.6,
    fontFamily: "Google Sans",
  },
  header: {
    marginBottom: 40,
  },
  name: {
    fontSize: 20,
    fontFamily: "Google Sans",
    marginBottom: 5,
    color: "#000",
  },
  contact: {
    fontSize: 10,
    color: "#666",
    flexDirection: "row",
    gap: 10,
  },
  body: {
    textAlign: "justify",
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CoverLetterPDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.header.name}</Text>
        <View style={styles.contact}>
          <Text>
            {data.header.email} • {data.header.phone}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text>{data.coverLetter}</Text>
      </View>
    </Page>
  </Document>
);
