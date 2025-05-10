
export interface OpenAIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
