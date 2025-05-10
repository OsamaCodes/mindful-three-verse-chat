
import { sendMessageToOpenAI } from './openai';
import { OpenAIMessage } from '@/types/chat';

// Speech recognition setup
const setupSpeechRecognition = () => {
  if (!('webkitSpeechRecognition' in window)) {
    return null;
  }

  // @ts-ignore - SpeechRecognition is not in TypeScript's lib.dom.d.ts
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  return recognition;
};

// Text-to-speech function
const speakText = (text: string) => {
  return new Promise<void>((resolve) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to find a female voice
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.includes('female') || 
        voice.name.includes('woman') ||
        voice.name.includes('girl')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => resolve();
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Text-to-speech not supported in this browser');
      resolve();
    }
  });
};

// Send voice message to OpenAI
const sendVoiceMessageToOpenAI = async (
  message: string, 
  chatHistory: OpenAIMessage[]
): Promise<string> => {
  const response = await sendMessageToOpenAI([
    ...chatHistory,
    { role: 'user', content: message }
  ]);
  
  return response;
};

export {
  setupSpeechRecognition,
  speakText,
  sendVoiceMessageToOpenAI
};
