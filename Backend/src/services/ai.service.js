// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { GoogleGenAI } = require("@google/genai")
const e = require("express")
const { z } = require("zod")
const { zodToJsonSchema, jsonDescription } = require("zod-to-json-schema")
const puppeteer = require("puppeteer");

// const cleanKey = 
//     ? process.env.GOOGLE_GEN_AI_KEY.replace(/[\r\n]/g, '').trim() 
//     : "";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEN_AI_KEY 
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 t0 100 indicating how well the candidate's  profile"),
    technicalQuestion: z.array(z.object({
        question: z.string().describe("The technical Question can be asked in the Interview"),
        intention: z.string().describe(" The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what point to cover, what approach to follow")
    })).describe("Technical Question that can be asked in the inteview along with there intention and there answer"),
    behavioralQuestion: z.array(z.object({
        question: z.string().describe("The technical Question can be asked in the Interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what point to cover, what approach to follow")
    })).describe("Technical Question that can be asked in the inteview along with there intention and there answer"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which candidate is lacking"),
        severity: z.enum(["low", "medium", "hard", "Low", "Medium", "Hard", "High"]).describe("The severity of skill gap")
    })).describe("List of skill gaps in the candidate profile along with there severity"),
    preparationPlan: z.array(z.object({
        day: z.string().describe("the day number in the preparation plan start from day 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g data stucture, coding topic , project etc.."),
        tasks: z.array(z.string()).describe("List of task to be done on this day to follow the preparaption plan ")
    })).describe("A day-wise preparation plan for candidate to follow"),
    title: z.string().describe("Give the appropriate title to the generated Reports")
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = ` Generate the interview report for a candidate with the following details:
        Resume : ${typeof resume === 'object' ? JSON.stringify(resume) : resume},
        Self Description: ${selfDescription},
        Job Description: ${typeof jobDescription === 'object' ? JSON.stringify(jobDescription) : jobDescription}`

    const nativeGeminiSchema = {
        type: "OBJECT",
        properties: {
            matchScore: {
                type: "INTEGER",
            },
            title: {
                type: "STRING"
            },
            technicalQuestion: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        question: { type: "STRING" },
                        intention: { type: "STRING" },
                        answer: { type: "STRING" }
                    },
                    required: ["question", "intention", "answer"]
                }
            },
            behavioralQuestion: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        question: { type: "STRING" },
                        intention: { type: "STRING" },
                        answer: { type: "STRING" }
                    },
                    required: ["question", "intention", "answer"]
                }
            },
            skillGaps: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        skill: { type: "STRING" },
                        severity: {
                            type: "STRING",
                            enum: ["Low", "Medium", "High", "Minor", "Moderate"]
                        }
                    },
                    required: ["skill", "severity"]
                }
            },
            preparationPlan: {
                type: "ARRAY",
                items: {
                    type: "OBJECT",
                    properties: {
                        day: { type: "STRING" },
                        focus: { type: "STRING" },
                        tasks: {
                            type: "ARRAY",
                            items: { type: "STRING" }
                        }
                    },
                    required: ["day", "focus", "tasks"]
                }
            }
        },
        required: ["title", "matchScore", "technicalQuestion", "behavioralQuestion", "skillGaps", "preparationPlan"]
    };

    const respone = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        // model: "gemini-3.5-flash",
        // model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
            systemInstruction: "You are a strict backend data processor. You must analyze the data inputs and strictly output your observations matching the keys in the responseSchema structure precisely.",
            responseMimeType: "application/json",
            responseSchema: nativeGeminiSchema
        }
    })
    return JSON.parse(respone.text)
}


async function generatePdffromHtml(jsonContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(jsonContent, { waitUntil: 'networkidle2', });

    const pdfBuffer = await page.pdf({ format: "A4" })

    await browser.close();

    return pdfBuffer
}

// async function generateResumePdf({ resume, selfDescription, jobDescription }) {

//     const resumePdfSchema = z.object({
//         html: z.string().describe("Generate a  resume in html format   that can used to generate pdf via puppeeteer package")
//     })

//     const prompt = `Generate a resume for a candidate with following details:
//         Resume : ${typeof resume === 'object' ? JSON.stringify(resume) : resume},
//         Self Description: ${selfDescription},
//         Job Description: ${typeof jobDescription === 'object' ? JSON.stringify(jobDescription) : jobDescription}
//         The response should be a json object with a single field "html" which contain the HTMl content of the resume which can be converted to pdf using any library like puppeteer`

//     const response = await ai.models.generateContent({
//         model: "gemini-3.5-flash",
//         // model: "gemini-3.1-pro-preview",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(resumePdfSchema)
//         }
//     })
//     const jsonContent = JSON.parse(response.text)

//     const pdfBuffer = await generateResumePdf(jsonContent.html);

//     return pdfBuffer

// }

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumePdfSchema = z.object({
        html: z.string().describe("Generate a resume in html format that can used to generate pdf via puppeteer package")
    });

    const prompt = `
You are an expert resume designer. Your task is to generate a highly professional, modern, and beautiful resume in raw HTML format based on the candidate's data.

CANDIDATE DATA:
- Resume Data: ${typeof resume === 'object' ? JSON.stringify(resume) : resume}
- Self Description: ${selfDescription}
- Job Description: ${typeof jobDescription === 'object' ? JSON.stringify(jobDescription) : jobDescription}

STRICT PAGE LIMIT CONSTRAINTS (1 to 2 Pages Max):
- The layout MUST look balanced. It should fill at least 1 full page, and strictly fit within a MAXIMUM of 2 pages under standard A4 dimensions.
- Use tight vertical paddings (e.g., 8px to 14px) and compact font sizings to ensure the data does not accidentally spill into an accidental 3rd page.

DESIGN & STYLING RULES:
1. Typography: Use clean modern system sans-serif font stacks (e.g., system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif). Use explicit type scaling (Name: 24px, Section Headers: 16px, Body Text: 12px, Subtext: 10.5px). Line height should be a clean 1.4 or 1.5.
2. Layout Structure: Implement a beautiful multi-column or modern grid system layout. For example, a left sidebar (30% width, lighter background) for contact info, skills, and summary, and a right column (70% width) for rich professional experience and projects.
3. Color Palette: Use a clean professional design concept (e.g., Deep Navy Blue primary accents, Dark Charcoal #2d3748 for primary text, Slate Silver for light side backgrounds, and clean white).
4. Print Accuracy: Ensure all background colors load perfectly.

CRITICAL CSS PRINT REQUIREMENTS (MUST BE INCLUDED IN THE OUTPUT <style> BLOCK):
You must explicitly embed these CSS configurations to prevent text fragmentation when Puppeteer parses the layout:
\`\`\`css
@media print {
  @page {
    size: A4;
    margin: 0.4in 0.4in 0.4in 0.4in; /* Keep margins consistent */
  }
  body {
    -webkit-print-color-adjust: exact; /* Force background accent colors to show */
    print-color-adjust: exact;
  }
  /* Avoid cutting blocks, individual job descriptions, or elements in half between page 1 and page 2 */
  .resume-card, .experience-item, .project-item, .skills-block {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  h1, h2, h3 {
    page-break-after: avoid;
    break-after: avoid;
  }
}
\`\`\`

OUTPUT FORMAT REQUIREMENTS:
The response MUST be a strict, valid JSON object following the provided schema. The "html" string field must contain a fully self-contained HTML document containing the \`<html>\`, \`<head>\`, \`<style>\`, and \`<body>\` structures. Do not add markdown backticks (\`\`\`html) inside the JSON string block value. Only return valid JSON text.
`;

    // 🟢 FIXED: Wrap in a try/catch for safety
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(resumePdfSchema)
            }
        });

        const responseText = typeof response.text === 'function' ? response.text() : response.text;
        const jsonContent = JSON.parse(responseText);

        // 🟢 FIXED: Changed 'generateResumePdf' to your actual PDF converter function (e.g., generatePdf)
        // to prevent the infinite execution stack loop
        const pdfBuffer = await generatePdffromHtml(jsonContent.html);

        return pdfBuffer;

    } catch (error) {
        
        throw error;
    }
}


module.exports = { generateInterviewReport, generateResumePdf }
