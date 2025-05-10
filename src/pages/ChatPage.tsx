
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Brain, Send, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { sendMessageToOpenAI } from '@/utils/openai';
import { ChatMessage, OpenAIMessage } from '@/types/chat';
import { Link } from "react-router-dom";
import { nanoid } from 'nanoid';

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nanoid(),
      role: "assistant",
      content: "Hi, I'm MindfulAI. I'm here to provide support and evidence-based coping strategies. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: nanoid(),
      role: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsProcessing(true);

    try {
      // Prepare messages for OpenAI API (exclude system message as we add it in the API call)
      const openaiMessages: OpenAIMessage[] = messages
        .filter(msg => msg.role === "user" || msg.role === "assistant")
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      // Add the new user message
      openaiMessages.push({ role: "user", content: userMessage.content });

      // Get response from OpenAI
      const response = await sendMessageToOpenAI(openaiMessages);

      // Add assistant response
      setMessages(prev => [...prev, {
        id: nanoid(),
        role: "assistant",
        content: response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error("Error in chat:", error);
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
      <header className="bg-white shadow-sm py-4 px-6 flex items-center gap-4">
        <Link to="/" className="text-mindful-600 hover:text-mindful-800 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-soothing-100">
            <AvatarImage src="" />
            <AvatarFallback className="bg-soothing-100 text-soothing-600">
              <Brain className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-mindful-800">MindfulAI Chat</h1>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4 pb-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-4 ${
                  message.role === "user"
                    ? "bg-soothing-600 text-white"
                    : "bg-white border border-mindful-100"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-soothing-100 text-soothing-600">
                        <Brain className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-mindful-600">MindfulAI</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                <div className="mt-1 text-xs opacity-60 text-right">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-grow resize-none min-h-[50px] max-h-[150px] py-3"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              disabled={isProcessing}
            />
            <Button 
              type="submit" 
              className="self-end"
              disabled={isProcessing || !inputMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-mindful-500 mt-2 text-center">
            MindfulAI is not a replacement for professional mental health support. In crisis, please contact emergency services.
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
