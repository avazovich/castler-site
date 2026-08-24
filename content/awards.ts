export interface AwardEntry {
  award: string;
  project: string;
  year: string;
}

/**
 * Placeholder recognition list for the About page's Awards table — entries
 * reference real placeholder project names for plausibility, but the awards
 * themselves are illustrative only until the studio supplies its real history.
 */
export const awards: AwardEntry[] = [
  { award: "Shortlisted, Central Asian Design Awards", project: "Afsona Villa", year: "2026" },
  { award: "Featured Project, Regional Interior Journal", project: "Tashkent Penthouse", year: "2026" },
  { award: "Selected, Emerging Studios Showcase", project: "Riverside Cultural Pavilion", year: "2025" },
  { award: "Best Residential Interior, Tashkent Design Week", project: "Samarkand Hotel Room", year: "2025" },
  { award: "Honorable Mention, Urban Concept Prize", project: "Amir Timur Plaza Masterplan", year: "2024" },
  { award: "Shortlisted, Housing Design Awards", project: "Chorsu Housing Block", year: "2024" },
  { award: "Selected, Young Practices Exhibition", project: "Civic Library Atrium", year: "2024" },
  { award: "Featured, Transit Architecture Review", project: "Green Belt Transit Hub", year: "2023" },
  { award: "Concept Award, Public Space Ideas Competition", project: "Terraced Market Concept", year: "2023" },
  { award: "Shortlisted, Landscape & Pavilion Awards", project: "Hillside Viewing Pavilion", year: "2023" },
  { award: "Selected, Waterfront Design Forum", project: "Urban Waterfront Promenade", year: "2022" },
];
