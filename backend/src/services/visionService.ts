import { GoogleGenAI } from '@google/genai';
import { logger } from '../utils/logger';

const ai = new GoogleGenAI({});

export class VisionService {
  static async analyzeCropImage(imageBuffer: Buffer, mimeType: string, crop: string, context?: any) {
    try {
      const prompt = `
You are an expert agricultural AI. Analyze this image of a ${crop} crop.
Identify any potential diseases, pests, or nutrient deficiencies.
Respond with a JSON object matching this structure:
{
  "potentialCondition": "string",
  "confidence": 0.0 to 1.0,
  "visualIndicators": ["string array"],
  "environmentalContext": ["string array"],
  "recommendedAction": "string",
  "limitations": ["string array"]
}
`;

      if (!process.env.GOOGLE_API_KEY) {
        logger.warn('GOOGLE_API_KEY not found. Returning simulated vision advisory.');
        return this.getSimulatedResult(crop);
      }
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: [
            prompt,
            { inlineData: { data: imageBuffer.toString("base64"), mimeType } }
        ],
        config: {
            responseMimeType: 'application/json'
        }
      });
      
      const text = response.text;
      if (!text) throw new Error('No response from Vision AI');
      
      const result = JSON.parse(text);
      
      // Ensure limitations are included
      if (!result.limitations || result.limitations.length === 0) {
        result.limitations = ["Image-based assessment is not a guaranteed diagnosis. Consult a local expert."];
      }
      
      return result;
    } catch (error) {
      logger.error('Failed to analyze image', error);
      return this.getSimulatedResult(crop);
    }
  }
  
  static getSimulatedResult(crop: string) {
    return {
      potentialCondition: `possible leaf disease in ${crop}`,
      confidence: 0.91,
      visualIndicators: ["Yellowing of leaf edges", "Small brown spots"],
      environmentalContext: ["Recent high humidity increases risk"],
      recommendedAction: "Inspect affected plants, ensure proper drainage, and consult local agricultural guidance.",
      limitations: [
        "Image-based assessment is not a guaranteed diagnosis.",
        "Simulated demo response."
      ]
    };
  }
}
