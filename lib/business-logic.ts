export function calculateStoryStats(wordCount: number) {
  const readingTime = Math.ceil(wordCount / 200);
  const readingLevel = wordCount > 10000 ? "Advanced" : wordCount > 5000 ? "Intermediate" : "Beginner";
  return { readingTime, readingLevel };
}

export function calculateStoryMetrics(content: string) {
  const wordCount = content.trim().split(/\s+/).filter((w) => w.length > 0).length;
  const readingTime = Math.ceil(wordCount / 200);
  return { totalWords: wordCount, estimatedReadTimeMinutes: readingTime, pacingRating: "Balanced" };
}

export function generateNarrativeOutline(title: string, genre: string, tone?: string) {
  return [
    "Introduction & Hook",
    "Inciting Incident",
    "Rising Action",
    "Climax",
    "Falling Action",
    "Resolution"
  ];
}
