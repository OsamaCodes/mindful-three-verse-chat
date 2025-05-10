
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Mic, MicOff } from "lucide-react";
import { setupSpeechRecognition, speakText, sendVoiceMessageToOpenAI } from '@/utils/voiceChat';
import AvatarModel from '@/components/AvatarModel';
import { OpenAIMessage } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';

const VoiceChatPage = () => {
  const [messages, setMessages] = useState<OpenAIMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  
  // Initialize conversation
  useEffect(() => {
    const welcomeMessage = "Hi there! I'm Emma, your virtual companion. How are you feeling today? I'm here to listen and talk with you.";
    
    // Add welcome message to history
    setMessages([{ 
      role: 'assistant', 
      content: welcomeMessage 
    }]);
    
    // Speak the welcome message
    setIsSpeaking(true);
    speakText(welcomeMessage).then(() => {
      setIsSpeaking(false);
    });
    
    // Initialize speech recognition
    recognitionRef.current = setupSpeechRecognition();
    
    if (!recognitionRef.current) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support voice recognition. Please try Chrome or Edge.",
        variant: "destructive"
      });
    } else {
      // Set up recognition event handlers
      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcriptText = result[0].transcript;
        setTranscript(transcriptText);
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          const finalTranscript = transcript;
          if (finalTranscript && !isProcessing) {
            handleSendMessage(finalTranscript);
          }
          setIsListening(false);
        }
      };
      
      // Start listening automatically after welcome message
      setTimeout(() => {
        toggleListening();
      }, 5000);
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };
  
  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isProcessing || isSpeaking) return;
    
    setIsProcessing(true);
    
    // Add user message to history
    const updatedMessages = [
      ...messages,
      { role: 'user', content: userMessage }
    ];
    
    setMessages(updatedMessages);
    setTranscript('');
    
    try {
      // Get response from OpenAI
      const response = await sendVoiceMessageToOpenAI(userMessage, messages);
      
      // Add assistant response to history
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: response }
      ]);
      
      // Speak the response
      setIsSpeaking(true);
      await speakText(response);
      setIsSpeaking(false);
      
      // Start listening again after response
      if (recognitionRef.current) {
        setTimeout(() => {
          toggleListening();
        }, 500);
      }
    } catch (error) {
      console.error('Error in voice chat:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-mindful-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center z-10">
        <Link to="/chat" className="text-mindful-600 hover:text-mindful-800 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-semibold text-lg text-mindful-800">Talk with Emma</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleListening}
          className={isListening ? "bg-red-100 text-red-600" : ""}
          disabled={isSpeaking || isProcessing}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
      </header>
      
      {/* Avatar Area */}
      <div className="flex-grow">
        <AvatarModel className="h-full" />
      </div>
      
      {/* Voice Status Area */}
      <div className="bg-white border-t p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative px-4 py-3 rounded-lg bg-gray-50 mb-2 min-h-[60px]">
            {isListening && !transcript && (
              <div className="text-mindful-600">Listening...</div>
            )}
            {isListening && transcript && (
              <div>{transcript}</div>
            )}
            {!isListening && !isSpeaking && !isProcessing && (
              <div className="text-gray-500">
                {messages.length > 1 ? "Tap the mic icon to speak" : "Waiting for introduction..."}
              </div>
            )}
            {isSpeaking && (
              <div className="text-soothing-600 font-medium">Emma is speaking...</div>
            )}
            {isProcessing && !isSpeaking && (
              <div className="text-mindful-600">Processing response...</div>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-mindful-500">
              Virtual companion powered by AI. Not a substitute for professional care.
            </div>
            <Button 
              variant="outline"
              size="sm"
              onClick={toggleListening}
              disabled={isSpeaking || isProcessing}
            >
              {isListening ? "Stop Listening" : "Start Listening"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatPage;
