export enum Category {
  IQ = 'IQ',
  Interest = 'Interest',
  Mindset = 'Mindset',
  Technical = 'Technical Orientation',
  Personality = 'Personality'
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  category: Category | string;
}

export interface Answer {
  questionId: number;
  questionText: string;
  selectedOption: string;
  category: string;
}

export interface ScoreMetric {
  category: string;
  score: number; // 0-100
  description: string;
}

export interface AssessmentResult {
  recommendedCourse: string;
  courseDescription: string;
  executiveSummary: string; // Markdown
  detailedAnalysis: string; // Markdown
  careerPath: string; // Markdown
  improvementAreas: string[];
  metrics: ScoreMetric[];
}

export enum AppState {
  LANDING = 'LANDING',
  GENERATING_QUIZ = 'GENERATING_QUIZ',
  QUIZ = 'QUIZ',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}