import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

type Question = {
  id: number;
  question: string;
  image: string | null;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty?: string;
  topic?: string;
  hints?: string[];
  type?: "multiple_choice" | "essay";
};

type Exam = {
  examId: string;
  title: string;
  description?: string;
  questions: Question[];
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    lineHeight: 1.5,
    color: "#333",
  },
  header: { textAlign: "center", marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 700, marginBottom: 8 },
  description: { fontSize: 12, color: "#666" },

  questionBlock: { marginBottom: 14 },
  questionText: { fontWeight: 700, marginBottom: 6 },
  option: { marginLeft: 12, marginBottom: 4 },
  image: { marginTop: 6, width: "100%", height: 160, objectFit: "contain" },

  answerSectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  answerBlock: { marginBottom: 16, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: "#eee" },
  correctAnswerText: { color: "#d9534f", fontWeight: 700, marginTop: 4 },
  hintBlock: {
    backgroundColor: "#f5f5f5",
    borderLeftWidth: 3,
    borderLeftColor: "#f0ad4e",
    padding: 8,
    marginTop: 8,
  },
  explanationText: { marginTop: 6 },
});

const cleanHtml = (text?: string): string => {
  if (!text) return "";
  return text
    .replace(/<br\s*\/>/g, "\n")
    .replace(/<br\s*>/g, "\n")
    .replace(/<b>(.*?)<\/b>/g, "$1")
    .replace(/<strong>(.*?)<\/strong>/g, "$1")
    .replace(/<h\d>(.*?)<\/h\d>/g, "$1\n")
    .replace(/```[\s\S]*?```/g, (m) => m.replace(/```/g, "").trim())
    .replace(/<[^>]*>/g, "");
};

interface ExamPDFProps { exam: Exam }

export function ExamPDF({ exam }: ExamPDFProps) {
  return (
    <Document author="MAE Exam Web" title={`Đề thi: ${exam.title}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{exam.title}</Text>
          {exam.description ? <Text style={styles.description}>{exam.description}</Text> : null}
        </View>

        {exam.questions.map((q, index) => (
          <View key={q.id} style={styles.questionBlock} wrap={false}>
            <Text style={styles.questionText}>Câu {index + 1}: {cleanHtml(q.question)}</Text>
            {q.image ? (
              <Image style={styles.image} src={q.image.startsWith("http") ? q.image : q.image} />
            ) : null}
            {q.options && q.options.length > 0 ? (
              <View>
                {q.options.map((opt, i) => (
                  <Text key={`${q.id}-opt-${i}`} style={styles.option}>{cleanHtml(opt)}</Text>
                ))}
              </View>
            ) : null}
          </View>
        ))}
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.answerSectionTitle}>ĐÁP ÁN & GIẢI THÍCH CHI TIẾT</Text>
        {exam.questions.map((q, index) => (
          <View key={`ans-${q.id}`} style={styles.answerBlock} wrap={false}>
            <Text style={styles.questionText}>Câu {index + 1}: {cleanHtml(q.question)}</Text>
            <Text style={styles.correctAnswerText}>Đáp án đúng: {cleanHtml(q.correctAnswer)}</Text>
            {q.hints && q.hints.length > 0 ? (
              <View style={styles.hintBlock}>
                <Text>Gợi ý:</Text>
                {q.hints.map((h, i) => (
                  <Text key={`hint-${q.id}-${i}`}>- {cleanHtml(h)}</Text>
                ))}
              </View>
            ) : null}
            {q.explanation ? (
              <Text style={styles.explanationText}>{cleanHtml(q.explanation)}</Text>
            ) : null}
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default ExamPDF;


