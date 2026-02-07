
import { GoogleGenAI, Type } from "@google/genai";
import { CarePlan, SessionFeedback, Exercise, FeedbackColor } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const EXERCISE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    exercises: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          reps: { type: Type.NUMBER },
          sets: { type: Type.NUMBER },
          icon: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["id", "name", "reps", "sets", "icon", "description"],
      },
    },
    rationale: { type: Type.STRING, description: "Why these adjustments were made." }
  },
  required: ["exercises", "rationale"]
};

export const generateNextPlan = async (
  currentPlan: CarePlan,
  feedback: SessionFeedback
): Promise<{ exercises: Exercise[]; rationale: string }> => {
  const prompt = `
    Analyze the user's exercise feedback and generate an ADAPTED plan for the next session.
    
    CURRENT PLAN:
    ${JSON.stringify(currentPlan.exercises)}
    
    USER FEEDBACK:
    - Status Color: ${feedback.color} (RED means very difficult/painful, GREEN means easy/good)
    - Pain Level: ${feedback.painLevel}/10
    - Ease Rating: ${feedback.easeRating}/10
    - Breaks Taken: ${feedback.breaksTaken}
    
    GOAL: 
    - If feedback is RED or Pain > 6 or Ease < 4, significantly reduce reps/sets or swap for easier exercises.
    - If feedback is YELLOW or moderate pain, slightly reduce volume.
    - If feedback is GREEN and Ease > 8, slightly increase reps or maintain.
    
    Return a new list of exercises with modified reps/sets. Maintain the exercise icons as simple emoji characters like '🧘', '💪', '🏃'.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: EXERCISE_SCHEMA,
      },
    });

    const result = JSON.parse(response.text || '{}');
    return result;
  } catch (error) {
    console.error("Error generating adaptive plan:", error);
    // Fallback logic
    return {
      exercises: currentPlan.exercises.map(ex => ({ ...ex, reps: Math.max(1, ex.reps - 2) })),
      rationale: "Failed to connect to AI. Applying safety reduction automatically."
    };
  }
};
