
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from 'nanoid';
import { sendMessageToOpenAI } from '@/utils/openai';
import { ArrowLeft, Send, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage, OpenAIMessage } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';

const ChatPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: nanoid(),
      role: 'user' as const,
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Format messages for API
      const apiMessages: OpenAIMessage[] = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Add the new user message
      apiMessages.push({
        role: 'user',
        content: userMessage.content
      });

      const response = await sendMessageToOpenAI(apiMessages);

      const assistantMessage = {
        id: nanoid(),
        role: 'assistant' as const,
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-mindful-600 hover:text-mindful-800 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-semibold text-lg text-mindful-800">Chat with MindfulAI</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={resetChat}
          disabled={isLoading || messages.length === 0}
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
      </header>

      <div className="flex-grow bg-gray-50 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-gray-700 mb-2">Welcome to MindfulAI</h2>
              <p className="text-gray-500 mb-6">
                I'm here to provide emotional support and practical guidance for your mental wellbeing.
              </p>
              <Button 
                variant="secondary" 
                className="mx-auto" 
                onClick={() => navigate("/voice-chat")}
              >
                Need someone to talk to?
              </Button>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-lg max-w-[85%] ${
                  msg.role === 'user'
                    ? 'ml-auto bg-mindful-100 text-mindful-900'
                    : 'bg-white text-gray-700 shadow-sm'
                }`}
              >
                {msg.content}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {messages.length > 0 && (
        <div className="mt-4 bg-white flex justify-center">
          <Button 
            variant="outline" 
            className="mb-4" 
            onClick={() => navigate("/voice-chat")}
          >
            Need someone to talk to?
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
        <div className="flex max-w-3xl mx-auto">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-mindful-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-r-md bg-mindful-600 text-white ${
              isLoading ? 'opacity-70' : 'hover:bg-mindful-700'
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
