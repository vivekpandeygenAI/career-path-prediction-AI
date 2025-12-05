import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Question, AssessmentResult, Answer } from "../types";

// Initialize Gemini Client
// The API key is guaranteed to be available in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const COURSES = [
  "Python Programming",
  "Data Science & AI",
  "Full Stack Development",
  "Java Development",
  "Quality Assurance (QA)",
  "DevOps Engineering",
  "Data Analysis"
];

/**
 * Generates a dynamic 20-question assessment based on the 5 key metrics.
 * Uses gemini-2.5-flash for speed.
 */
export const generateAssessmentQuestions = async (): Promise<Question[]> => {
  const model = "gemini-2.5-flash";

  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        text: { type: Type.STRING, description: "The question text" },
        options: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "4 distinct multiple choice options"
        },
        category: {
          type: Type.STRING,
          description: "One of: IQ, Interest, Mindset, Technical Orientation, Personality"
        }
      },
      required: ["text", "options", "category"]
    }
  };

  const prompt = `
    Generate a professional 20-question career assessment exam for a student.
    The goal is to determine their suitability for IT courses like ${COURSES.join(", ")}.
    
    Distribute the 20 questions evenly (approx 4 each) across these categories:
    1. IQ (Logical reasoning, pattern recognition)
    2. Interest (What topics excite them, hobbies)
    3. Mindset (Growth vs Fixed, problem-solving approach)
    4. Technical Orientation (Familiarity with logic, systems, or code)
    5. Personality (Introvert/Extrovert, Team vs Solo, Detail-oriented)

    The questions should be engaging but analytical.
    Provide 4 options per question.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7,
      },
    });

    const rawQuestions = JSON.parse(response.text || "[]");
    
    // Add IDs locally
    return rawQuestions.map((q: any, index: number) => ({
      id: index + 1,
      text: q.text,
      options: q.options,
      category: q.category
    }));

  } catch (error) {
    console.error("Failed to generate questions:", error);
    // Fallback or re-throw
    throw new Error("Failed to generate assessment. Please check your connection or API key.");
  }
};

/**
 * Analyzes the user's answers to generate a comprehensive career report.
 * Uses gemini-3-pro-preview for deep reasoning and "thinking".
 */
export const analyzeAssessmentResults = async (answers: Answer[]): Promise<AssessmentResult> => {
  const model = "gemini-3-pro-preview";

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      recommendedCourse: { type: Type.STRING, description: `One specific course from: ${COURSES.join(", ")}` },
      courseDescription: { type: Type.STRING, description: "A one-sentence catchy description of the course" },
      executiveSummary: { type: Type.STRING, description: "A paragraph explaining WHY this is the perfect match based on the signals." },
      detailedAnalysis: { type: Type.STRING, description: "Detailed Markdown breakdown of their strengths and weaknesses." },
      careerPath: { type: Type.STRING, description: "Markdown list of future job roles and growth potential." },
      improvementAreas: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 3-4 specific skills to improve." },
      metrics: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            score: { type: Type.NUMBER, description: "Score from 0-100" },
            description: { type: Type.STRING, description: "Short qualitative assessment (e.g., 'Highly Analytical')" }
          }
        }
      }
    }
  };

  const answersJson = JSON.stringify(answers, null, 2);

  const prompt = `
    Act as an Expert Career Counselor and AI Analyst.
    Analyze the following user assessment data (20 questions & answers).
    
    User Answers:
    ${answersJson}

    Task:
    1. Evaluate the user's profile based on: IQ, Interest, Mindset, Technical Orientation, and Personality.
    2. Assign a score (0-100) for each category based on the correctness or inclination of their answers.
    3. Based on the dominant traits, recommend ONE best-fit course from this list: ${COURSES.join(", ")}.
    4. Provide a detailed explanation, career outlook, and constructive feedback.

    The tone should be encouraging, professional, and data-backed.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        // Using a thinking budget for deeper analysis of the personality matrix
        thinkingConfig: { thinkingBudget: 2048 }, 
      },
    });

    if (!response.text) throw new Error("No response from AI");
    
    return JSON.parse(response.text) as AssessmentResult;

  } catch (error) {
    console.error("Analysis failed:", error);
    throw new Error("Unable to analyze results. Please try again.");
  }
};