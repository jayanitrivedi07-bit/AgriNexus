import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env';
import { logger } from '../utils/logger';

const ai = new GoogleGenAI({}); // SDK auto-picks GOOGLE_API_KEY from environment

export interface AdvisoryContext {
  farm: any;
  weather: any;
  soil?: any;
  vegetation?: any;
  risks?: any;
}

export class AiService {
  static async generateAdvisory(context: AdvisoryContext) {
    try {
      const prompt = `
You are an expert agricultural AI. Based on the following structured farm context, provide actionable advisory.
Do NOT invent measurements. Be cautious. Focus on actionable insights.

Context:
${JSON.stringify(context, null, 2)}

Respond with a JSON object matching this structure:
{
  "title": "string",
  "priority": "low" | "medium" | "high",
  "recommendation": "string",
  "reason": "string",
  "evidence": ["string array"],
  "risks": ["string array"],
  "actions": ["string array"],
  "confidence": "low" | "medium" | "high",
  "sources": ["string array"],
  "limitations": ["string array"]
}
      `;

      // We use simulated fallback if there's no API key
      if (!process.env.GOOGLE_API_KEY) {
        logger.warn('GOOGLE_API_KEY not found. Returning simulated advisory.');
        return this.getSimulatedAdvisory(context);
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            responseMimeType: 'application/json'
        }
      });
      
      const text = response.text;
      if (!text) throw new Error('No response from AI');
      
      const result = JSON.parse(text);
      return result;
    } catch (error) {
      logger.error('Failed to generate AI advisory', error);
      return this.getSimulatedAdvisory(context);
    }
  }

  static getSimulatedAdvisory(context: AdvisoryContext) {
    return {
      title: "Rainfall Advisory",
      priority: "medium",
      recommendation: "Avoid unnecessary irrigation today.",
      reason: "High probability of precipitation detected in weather forecast.",
      evidence: [
        `Expected rainfall: ${context.weather?.[0]?.precipitationMm || '10'} mm`,
        "Soil moisture is adequate for current stage."
      ],
      risks: ["waterlogging if irrigated before rain"],
      actions: ["Check soil moisture tomorrow"],
      confidence: "medium",
      sources: ["open-meteo", "digital farm twin"],
      limitations: ["Simulated advisory. Demo data used."]
    };
  }
}
