/**
 * ATS-friendly résumé rendered with @react-pdf/renderer. Single column, real
 * selectable text, standard section headings, built-in Helvetica (no external
 * fonts). Authored separately from the site's HTML on purpose — full control
 * over a clean, parseable structure.
 */
import {
  Document,
  Page,
  View,
  Text,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeData } from "./data";

const styles = StyleSheet.create({
  page: {
    paddingVertical: 38,
    paddingHorizontal: 46,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: "#1a1a1a",
    lineHeight: 1.45,
  },
  name: { fontSize: 21, fontFamily: "Helvetica-Bold", color: "#000" },
  title: { fontSize: 11, color: "#333", marginTop: 2 },
  contact: {
    fontSize: 9,
    color: "#444",
    marginTop: 7,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sep: { color: "#aaa" },
  link: { color: "#1a4ed8", textDecoration: "none" },

  section: { marginTop: 17 },
  heading: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: "#000",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingBottom: 3,
    marginBottom: 9,
  },
  summary: { color: "#333" },

  job: { marginBottom: 12 },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  jobRole: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: "#000" },
  jobDates: { fontSize: 9, color: "#555" },
  jobCompany: { fontSize: 9.5, color: "#333", marginTop: 1 },
  jobSummary: { color: "#444", marginTop: 3, marginBottom: 3 },
  bullet: { flexDirection: "row", marginTop: 2.5 },
  bulletDot: { width: 11, color: "#666" },
  bulletText: { flex: 1, color: "#333" },

  skills: { color: "#333" },

  eduItem: { marginBottom: 7 },
  eduDegree: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#000" },
  eduSchool: { color: "#333", marginTop: 1 },
  eduDetail: { color: "#555", marginTop: 1 },
});

export function ResumeDocument({ data }: { data: ResumeData }) {
  const contact: { label: string; url?: string }[] = [
    { label: data.location },
    { label: data.email, url: `mailto:${data.email}` },
    ...data.links,
  ];

  return (
    <Document title={`${data.name} — ${data.title}`} author={data.name}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.contact}>
          {contact.flatMap((c, i) => {
            const item = c.url ? (
              <Link key={`c${i}`} style={styles.link} src={c.url}>
                {c.label}
              </Link>
            ) : (
              <Text key={`c${i}`}>{c.label}</Text>
            );
            return i === 0
              ? [item]
              : [
                  <Text key={`s${i}`} style={styles.sep}>
                    {"   ·   "}
                  </Text>,
                  item,
                ];
          })}
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.heading}>{data.labels.summary}</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.heading}>{data.labels.experience}</Text>
          {data.experience.map((job, i) => (
            <View key={i} style={styles.job} wrap={false}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobRole}>{job.role}</Text>
                <Text style={styles.jobDates}>{job.dates}</Text>
              </View>
              <Text style={styles.jobCompany}>
                {job.company} · {job.type}
              </Text>
              <Text style={styles.jobSummary}>{job.summary}</Text>
              {job.bullets.map((b, j) => (
                <View key={j} style={styles.bullet}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.heading}>{data.labels.skills}</Text>
          <Text style={styles.skills}>{data.skills.join("  ·  ")}</Text>
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.heading}>{data.labels.education}</Text>
          {data.education.map((e, i) => (
            <View key={i} style={styles.eduItem} wrap={false}>
              <View style={styles.jobHeader}>
                <Text style={styles.eduDegree}>{e.degree}</Text>
                <Text style={styles.jobDates}>{e.dates}</Text>
              </View>
              <Text style={styles.eduSchool}>{e.school}</Text>
              {e.detail ? <Text style={styles.eduDetail}>{e.detail}</Text> : null}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
