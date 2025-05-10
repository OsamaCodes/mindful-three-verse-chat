
import { OpenAIMessage } from "@/types/chat";

const OPENAI_API_KEY = "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";

export async function sendMessageToOpenAI(messages: OpenAIMessage[]): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are MindfulAI, a compassionate mental health assistant. You provide evidence-based coping strategies and emotional support. You are not a replacement for professional therapy, but you can offer techniques from CBT, mindfulness, and other proven approaches. Always be empathetic, patient, and encourage users to seek professional help when needed."
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error sending message to OpenAI:", error);
    return "I'm having trouble connecting to my system. Please try again in a moment.";
  }
}
