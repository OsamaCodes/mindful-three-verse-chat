
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Brain, Send } from "lucide-react";

const ChatDemoWindow = () => {
  const [demoStep, setDemoStep] = useState(0);
  
  const conversation = [
    { sender: 'bot', message: 'Hi there! I\'m MindfulAI. How are you feeling today?' },
    { sender: 'user', message: 'I\'ve been feeling anxious about work lately.' },
    { sender: 'bot', message: 'I\'m sorry to hear you\'re feeling anxious. That\'s very common, especially with work pressures. Would you like to try a quick grounding exercise, or would you prefer to talk more about what\'s causing your anxiety?' },
    { sender: 'user', message: 'I\'d like to try a grounding exercise.' },
    { sender: 'bot', message: 'Great choice. Let\'s do a simple 5-4-3-2-1 exercise. Find 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. Take your time and focus on each sensation. Would you like me to guide you through it step by step?' },
  ];
  
  // Show messages up to the current demo step
  const visibleMessages = conversation.slice(0, demoStep + 1);
  
  const advanceDemo = () => {
    if (demoStep < conversation.length - 1) {
      setDemoStep(demoStep + 1);
    } else {
      // Reset demo when it reaches the end
      setDemoStep(0);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto border shadow-lg">
      <div className="bg-mindful-50 p-3 border-b flex items-center">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-soothing-600 text-white">
            <Brain className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-sm">MindfulAI</div>
          <div className="text-xs text-green-600 flex items-center">
            <span className="h-2 w-2 rounded-full bg-green-500 inline-block mr-1"></span>
            Online
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 h-[300px] overflow-y-auto flex flex-col space-y-4">
        {visibleMessages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.sender === 'user' 
                  ? 'bg-soothing-500 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="p-3 border-t">
        <div className="relative flex items-center w-full">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-mindful-300"
            disabled
          />
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute right-1" 
            onClick={advanceDemo}
          >
            <Send className="h-5 w-5 text-mindful-500" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatDemoWindow;
