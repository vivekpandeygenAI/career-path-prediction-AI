# CareerPath AI - Complete Project Documentation

## 📋 Project Overview

**CareerPath AI** is an intelligent, AI-driven career assessment platform that evaluates users across multiple dimensions (IQ, mindset, interests, technical orientation, and personality) to recommend the most suitable technology career path.

**Target Users:** Students and professionals unsure about their career direction in technology  
**Core Technology:** Google Gemini AI (v2.5 & v3.0 models with extended thinking)  
**Framework:** React 19 with TypeScript and Vite  

---

## 🎯 Key Features

### 1. **Dynamic Assessment Quiz**
- AI-generated 20-question assessments customized for career evaluation
- Questions distributed across 5 assessment dimensions:
  - **IQ**: Logical reasoning, pattern recognition
  - **Interest**: Topic enthusiasm, hobbies, preferences
  - **Mindset**: Growth vs. fixed mindset, problem-solving approach
  - **Technical Orientation**: Logic, systems thinking, code familiarity
  - **Personality**: Introvert/extrovert, team vs. solo work, attention to detail

### 2. **Intelligent Analysis & Recommendations**
- Generates personalized career recommendations based on assessment data
- Recommends from 7 career paths:
  - Python Programming
  - Data Science & AI
  - Full Stack Development
  - Java Development
  - Quality Assurance (QA)
  - DevOps Engineering
  - Data Analysis

### 3. **Comprehensive Results Report**
- **Executive Summary**: Markdown-formatted explanation of why the recommendation fits
- **Detailed Analysis**: Strengths and weaknesses breakdown
- **Career Path Growth**: Role progression with salary ranges
- **Improvement Areas**: 3-4 specific skills to develop
- **Performance Metrics**: Radar chart visualization of 5 assessment dimensions (0-100 score each)

### 4. **Sample Report Feature**
- Pre-generated sample report for users to explore before taking the assessment
- Demonstrates the depth and quality of the platform

### 5. **Print/Export**
- Print-friendly PDF export of generated reports
- Optimized styling for print media

---

## 🏗️ Project Architecture

### Directory Structure
```
careerpath-ai/
├── components/              # React UI components
│   ├── Hero.tsx            # Landing page with call-to-action
│   ├── Quiz.tsx            # Quiz interface and question display
│   ├── Results.tsx         # Results report with charts and analysis
│   └── Loading.tsx         # Loading states during AI operations
├── services/
│   └── geminiService.ts    # Google Gemini API integration
├── App.tsx                 # Main app component with state machine
├── types.ts                # TypeScript type definitions
├── index.tsx               # React entry point
├── index.html              # HTML shell
├── vite.config.ts          # Vite build configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
├── metadata.json           # App metadata
└── .env.local              # Environment variables (API key)
```

### Component Hierarchy
```
App (State Machine)
├── Hero (Landing Page)
├── Quiz (Assessment)
├── Loading (Generating Quiz / Analyzing)
├── Results (Report Display)
└── Error (Error Boundary)
```
### Screenshot
<img width="1216" height="797" alt="image" src="https://github.com/user-attachments/assets/7af52927-0deb-4b92-9239-ca602b0a20eb" />
<img width="1168" height="930" alt="image" src="https://github.com/user-attachments/assets/1fcb50d1-9ada-4a95-b602-d1a4701d2325" />



---

## 🔌 Technology Stack

### Frontend
- **React 19.2.0**: UI library
- **TypeScript ~5.8.2**: Static typing
- **Vite 6.2.0**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS (via CDN)
- **Lucide React 0.554.0**: Icon library
- **Recharts 3.5.0**: Chart visualization (Radar chart for metrics)
- **React Markdown 10.1.0**: Markdown rendering for report content

### Backend/AI
- **Google Generative AI SDK (@google/genai 1.30.0)**: 
  - `gemini-2.5-flash`: Fast question generation
  - `gemini-3-pro-preview`: Deep analysis with extended thinking (2048 token budget)

### Development
- **@vitejs/plugin-react 5.0.0**: React support in Vite
- **@types/node 22.14.0**: Node.js type definitions

---

## 🔑 Core Types & Interfaces

### Assessment Dimensions
```typescript
enum Category {
  IQ = 'IQ',
  Interest = 'Interest',
  Mindset = 'Mindset',
  Technical = 'Technical Orientation',
  Personality = 'Personality'
}
```

### Data Models
```typescript
interface Question {
  id: number;
  text: string;
  options: string[];           // 4 multiple choice options
  category: Category | string;
}

interface Answer {
  questionId: number;
  questionText: string;
  selectedOption: string;
  category: string;
}

interface ScoreMetric {
  category: string;
  score: number;              // 0-100
  description: string;        // Qualitative assessment
}

interface AssessmentResult {
  recommendedCourse: string;
  courseDescription: string;
  executiveSummary: string;   // Markdown
  detailedAnalysis: string;   // Markdown
  careerPath: string;         // Markdown
  improvementAreas: string[];
  metrics: ScoreMetric[];
}

enum AppState {
  LANDING = 'LANDING',
  GENERATING_QUIZ = 'GENERATING_QUIZ',
  QUIZ = 'QUIZ',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}
```

---

## 📊 Application State Flow

The app uses a state machine pattern to manage the user journey:

1. **LANDING** → Hero page with "Start Assessment" and "View Sample" buttons
2. **GENERATING_QUIZ** → Loading spinner while Gemini generates questions
3. **QUIZ** → Display 20 questions one-by-one with progress bar
4. **ANALYZING** → Loading spinner while analyzing answers
5. **RESULTS** → Display comprehensive report with metrics chart
6. **ERROR** → Error modal with retry option

State transitions trigger different API calls to Gemini:
- Question generation via `generateAssessmentQuestions()`
- Analysis via `analyzeAssessmentResults(answers)`

---

## 🚀 Key Features Implementation

### Question Generation
- **Model**: `gemini-2.5-flash` (optimized for speed)
- **Prompt**: Dynamic prompt requesting 20 questions distributed evenly across 5 categories
- **Output Format**: JSON schema with structured question objects
- **Purpose**: Generate unique assessments to provide variety

### Results Analysis
- **Model**: `gemini-3-pro-preview` (advanced reasoning)
- **Extended Thinking**: 2048 token budget for deeper personality/career matching
- **Input**: Structured array of user answers with categories
- **Output**: Comprehensive `AssessmentResult` with:
  - Career recommendation with rationale
  - Markdown-formatted analysis and career path
  - Numeric scores (0-100) across 5 dimensions
  - Specific improvement recommendations

### UI Components

#### Hero.tsx
- Landing page with gradient background and animated blobs
- Feature highlights (20 questions, 5 dimensions, 98% accuracy)
- Navigation and call-to-action buttons
- Responsive design (mobile & desktop)

#### Quiz.tsx
- Full-screen quiz interface
- Progress bar showing question number
- Single-question display with 4 options
- Selected option highlighted with checkmark
- Next button disabled until selection made
- Category label for each question

#### Results.tsx
- Multi-column layout (main report + sidebar metrics)
- Radar chart visualization of 5-dimension scores
- Markdown-rendered sections (summary, analysis, career path)
- Improvement areas as bullet list
- Print button for PDF export
- "Retake Assessment" button

#### Loading.tsx
- Loading states with spinner animations
- Different loading messages for generating quiz vs. analyzing

---

## ⚙️ Build & Deployment Configuration

### Vite Configuration (`vite.config.ts`)
- Dev server on port 3000
- Environment variables loaded from `.env.local`
- `GEMINI_API_KEY` injected into process.env during build
- Path alias `@` for root directory imports

### Build Commands
```bash
npm run dev      # Development server (Vite)
npm run build    # Production build (TypeScript + Vite)
npm run preview  # Preview production build locally
```

### Environment Setup
- Requires `.env.local` file with `GEMINI_API_KEY`
- API key securely passed to frontend via Vite's define config

---

## 📦 Dependencies & Versions

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.0 | UI library |
| react-dom | ^19.2.0 | React DOM rendering |
| lucide-react | ^0.554.0 | Icons |
| @google/genai | ^1.30.0 | Gemini API client |
| react-markdown | ^10.1.0 | Markdown rendering |
| recharts | ^3.5.0 | Charts & visualization |
| typescript | ~5.8.2 | Type safety |
| vite | ^6.2.0 | Build tool |
| @vitejs/plugin-react | ^5.0.0 | React plugin for Vite |

---

## 🎨 Design & UX

### Color Scheme
- **Primary**: Indigo (#4F46E5)
- **Secondary**: Blue/Purple gradients
- **Background**: Light slate/gray
- **Accents**: Green, Yellow, Pink (for animated blobs and charts)

### Typography
- **Font Family**: Inter (via Google Fonts)
- **Headings**: Bold, large font sizes (5xl-6xl for main header)
- **Body**: Regular weights (400-500)

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoints: `sm`, `md`, `lg`
- Adaptive layouts for hero, quiz, and results

### Accessibility
- Semantic HTML structure
- Color contrast compliant
- Keyboard navigation (quiz option selection)
- ARIA labels implicit via semantic components

---

## 🔐 Security & API Management

### API Key Handling
- Stored in `.env.local` (git-ignored)
- Injected at build time via Vite's define config
- Not exposed in frontend code as string literals

### API Limitations
- Gemini API calls may fail (network, quota, rate limiting)
- Error handling with user-friendly messages
- Fallback to error state with retry option

---

## 📈 Performance Optimizations

1. **Model Selection**:
   - `gemini-2.5-flash`: Fast question generation (< 2s)
   - `gemini-3-pro-preview`: Slower but more thoughtful analysis with thinking

2. **Structured Output**:
   - JSON schema defines expected response format
   - Reduces parsing overhead
   - Enables deterministic output

3. **Temperature Control**:
   - Question generation: temperature 0.7 (some variation)
   - Results analysis: temperature varies based on model defaults

---

## 🧪 Sample Data

The app includes a pre-built sample result for the "View Sample Report" feature:

```typescript
const SAMPLE_RESULT = {
  recommendedCourse: "Data Science & AI",
  courseDescription: "Unlock the power of data to drive decision-making and innovation.",
  executiveSummary: "Based on your high scores in Logical Reasoning (92%) and Pattern Recognition...",
  // ... detailed analysis, career path, metrics
}
```

This showcases the report format and helps users understand what they'll receive.

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v16+)
- Google Gemini API key (from [ai.google.dev](https://ai.google.dev))

### Installation
1. Clone/download the project
2. `npm install` - Install dependencies
3. Create `.env.local` file with:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
4. `npm run dev` - Start development server (http://localhost:3000)

### Deployment
- Build: `npm run build`
- Output: Static files in `dist/` directory
- Deploy to: Vercel, Netlify, or any static host

## 📞 Support & Maintenance

- **API**: Google Gemini API documentation at [ai.google.dev](https://ai.google.dev)
- **Framework**: React and Vite documentation
- **UI Kit**: Tailwind CSS and Lucide React docs
- **Troubleshooting**: Check console for API errors and network issues

