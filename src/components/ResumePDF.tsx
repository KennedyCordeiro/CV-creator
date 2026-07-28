import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Google Sans",
  fonts: [
    { src: "/fonts/GoogleSans-Regular.ttf" },
    { src: "/fonts/GoogleSans-Medium.ttf", fontWeight: 500 },
    { src: "/fonts/GoogleSans-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/GoogleSans-Bold.ttf", fontWeight: 700 },
    { src: "/fonts/GoogleSans-Italic.ttf", fontStyle: "italic" },
    {
      src: "/fonts/GoogleSans-MediumItalic.ttf",
      fontWeight: 500,
      fontStyle: "italic",
    },
    {
      src: "/fonts/GoogleSans-SemiBoldItalic.ttf",
      fontWeight: 600,
      fontStyle: "italic",
    },
    {
      src: "/fonts/GoogleSans-BoldItalic.ttf",
      fontWeight: 700,
      fontStyle: "italic",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Google Sans",
    fontSize: 11,
    color: "#333",
    lineHeight: 1.4,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: "Google Sans",
    fontWeight: 700,
    marginBottom: 8,
    color: "#000",
    // lineHeight: 1.2,
  },
  contact: {
    fontSize: 10,
    color: "#666",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Google Sans",
    fontWeight: 700,
    color: "#000",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  summary: {
    textAlign: "justify",
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  jobTitle: {
    fontFamily: "Google Sans",
    fontWeight: 700,
    color: "#000",
  },
  company: {
    fontFamily: "Google Sans",
    fontStyle: "italic",
  },
  period: {
    fontSize: 10,
    color: "#666",
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    textAlign: "justify",
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillItem: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    fontSize: 10,
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ResumePDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.header.name}</Text>
        <View style={styles.contact}>
          <Text>{data.header.email}</Text>
          <Text>{data.header.phone}</Text>
          <Text>{data.header.location}</Text>
          {data.header.linkedin && (
            <Link src={data.header.linkedin}>LinkedIn</Link>
          )}
          {data.header.github && <Link src={data.header.github}>GitHub</Link>}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo Profissional</Text>
        <Text style={styles.summary}>{data.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experiência</Text>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {data.experience.map((exp: any, i: number) => (
          <View key={i} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{exp.position}</Text>
              <Text style={styles.period}>{exp.period}</Text>
            </View>
            <Text style={styles.company}>{exp.company}</Text>
            {}
            {exp.description.map((desc: string, j: number) => (
              <View key={j} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{desc}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {data.education.map((edu: any, i: number) => (
          <View key={i} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{edu.degree}</Text>
              <Text style={styles.period}>{edu.period}</Text>
            </View>
            <Text style={styles.company}>{edu.institution}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        <View style={styles.skills}>
          {}
          {data.skills.map((skill: string, i: number) => (
            <Text key={i} style={styles.skillItem}>
              {skill}
            </Text>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);
