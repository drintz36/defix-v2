import { GoogleGenAI, Type } from "@google/genai";

const envApiKey = import.meta.env.VITE_GEMINI_API_KEY;

export async function debugCode(buggyCode, userApiKey, language = "") {
  const finalApiKey = userApiKey || envApiKey;

  if (!finalApiKey) {
    throw new Error(
      "Missing Gemini API Key. Please click the Settings gear icon ⚙️ in the top right to add your key.",
    );
  }

  const ai = new GoogleGenAI({ apiKey: finalApiKey });
  const languageContext =
    language
      ? `The code is written in ${language}.\n`
      : "";
  const prompt = `You are a senior developer with 10+ years of experience.
Your task is to debug the following code. Identify the bugs, fix them, and explain them in simple, everyday language that a junior developer can understand.

${languageContext}Code to debug:
${buggyCode}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fixedCode: {
              type: Type.STRING,
              description: "The corrected code here, fully functioning",
            },
            explanation: {
              type: Type.STRING,
              description:
                "Step-by-step breakdown of the error and how to avoid it in the future, carefully formatted in beautiful markdown",
            },
          },
          required: ["fixedCode", "explanation"],
        },
        temperature: 0.1,
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");

    return JSON.parse(text);
  } catch (error) {
    console.error("AI API Error:", error);
    throw new Error(
      error.message || "Failed to analyze code. Please try again.",
    );
  }
}
