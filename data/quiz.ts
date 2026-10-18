// Səviyyə testi: hər səviyyədən 3 sual, asandan çətinə. `answer` — düzgün variantın indeksi.

export type Level = "A1" | "A2" | "B1" | "B2" | "C1";

export const questions: { level: Level; q: string; options: string[]; answer: number }[] = [
  { level: "A1", q: "She ___ a teacher.", options: ["am", "is", "are", "be"], answer: 1 },
  { level: "A1", q: "I ___ coffee every morning.", options: ["drinks", "am drink", "drink", "drinking"], answer: 2 },
  { level: "A1", q: "There ___ two books on the table.", options: ["are", "is", "be", "am"], answer: 0 },

  { level: "A2", q: "We ___ to London last summer.", options: ["go", "have gone", "goes", "went"], answer: 3 },
  { level: "A2", q: "This is ___ film I have ever seen.", options: ["better", "the best", "best", "the better"], answer: 1 },
  { level: "A2", q: "Look! It ___ outside.", options: ["is raining", "rains", "rained", "rain"], answer: 0 },

  { level: "B1", q: "If I ___ more time, I would learn Japanese.", options: ["have", "will have", "had", "would have"], answer: 2 },
  { level: "B1", q: "I've lived here ___ 2018.", options: ["for", "since", "from", "during"], answer: 1 },
  { level: "B1", q: "The letter ___ yesterday.", options: ["has sent", "sent", "is sent", "was sent"], answer: 3 },

  {
    level: "B2",
    q: "By the time we arrived, the film ___.",
    options: ["had already started", "already started", "has already started", "was already start"],
    answer: 0,
  },
  { level: "B2", q: "I'm not used to ___ up so early.", options: ["get", "got", "getting", "have got"], answer: 2 },
  { level: "B2", q: "She asked me where ___.", options: ["did I live", "I lived", "do I live", "lived I"], answer: 1 },

  {
    level: "C1",
    q: "___ had I sat down when the phone rang.",
    options: ["No sooner", "Rarely", "Hardly", "Seldom"],
    answer: 2,
  },
  {
    level: "C1",
    q: "The proposal was rejected, ___ came as no surprise to anyone.",
    options: ["what", "which", "that", "it"],
    answer: 1,
  },
  {
    level: "C1",
    q: "Her argument was so ___ that the whole committee changed its mind.",
    options: ["compulsive", "competing", "complying", "compelling"],
    answer: 3,
  },
];

export const results: Record<Level, { title: string; text: string; course: string }> = {
  A1: {
    title: "Beginner",
    text: "Əsas söz və ifadələri tanıyırsınız. Möhkəm təməl qurmaq üçün ideal vaxtdır!",
    course: "General English (A1–A2)",
  },
  A2: {
    title: "Elementary",
    text: "Gündəlik sadə mövzularda ünsiyyət qura bilirsiniz. İndi qrammatikanı və lüğəti genişləndirək.",
    course: "General English (A2–B1)",
  },
  B1: {
    title: "Intermediate",
    text: "Tanış mövzularda sərbəst danışırsınız. Növbəti addım — axıcılıq və daha zəngin ifadə.",
    course: "Speaking Club + General English (B1–B2)",
  },
  B2: {
    title: "Upper-Intermediate",
    text: "Mürəkkəb mətnləri anlayır, fikrinizi aydın ifadə edirsiniz. IELTS üçün güclü başlanğıcdır.",
    course: "IELTS Preparation",
  },
  C1: {
    title: "Advanced",
    text: "Əla nəticə! Dili peşəkar səviyyədə istifadə edirsiniz. İndi incəliklər və yüksək IELTS balı.",
    course: "IELTS (Band 7.5+) / Advanced Speaking",
  },
};

export function levelFromScore(score: number): Level {
  if (score <= 3) return "A1";
  if (score <= 6) return "A2";
  if (score <= 9) return "B1";
  if (score <= 12) return "B2";
  return "C1";
}
