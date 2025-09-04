import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Heart, AlertTriangle, Smile, Shield } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  riskLevel?: 'low' | 'medium' | 'high';
  suggestions?: string[];
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI mental health companion. I'm here to listen and support you. How are you feeling today?",
      timestamp: new Date(),
      suggestions: ['I feel anxious', 'I\'m stressed about exams', 'I need someone to talk to', 'I\'m doing well today']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mock AI responses - In real app, this would connect to your AI backend via Supabase
  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Risk assessment keywords
    const highRiskKeywords = ['suicide', 'kill myself', 'end it all', 'harm myself'];
    const mediumRiskKeywords = ['depressed', 'hopeless', 'can\'t cope', 'overwhelming'];
    
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    let response = '';
    let suggestions: string[] = [];

    if (highRiskKeywords.some(keyword => lowerMessage.includes(keyword))) {
      riskLevel = 'high';
      response = "I'm really concerned about you right now. Your feelings are important, and you don't have to face this alone. I strongly encourage you to reach out for immediate support. Would you like me to connect you with a crisis counselor right now?";
      suggestions = ['Connect me with crisis support', 'Call emergency helpline', 'I want to talk to someone'];
    } else if (mediumRiskKeywords.some(keyword => lowerMessage.includes(keyword))) {
      riskLevel = 'medium';
      response = "Thank you for sharing that with me. It sounds like you're going through a difficult time. These feelings are valid, and there are ways we can work through this together. Would you like to try some coping strategies?";
      suggestions = ['Yes, show me coping strategies', 'Book a counseling session', 'Tell me about breathing exercises'];
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      response = "Anxiety can feel really overwhelming. You're not alone in feeling this way. Let's try some techniques that can help you feel more grounded. Would you like to start with a breathing exercise?";
      suggestions = ['Start breathing exercise', 'Tell me about anxiety', 'I want relaxation tips'];
    } else if (lowerMessage.includes('exam') || lowerMessage.includes('test') || lowerMessage.includes('study')) {
      response = "Exam stress is very common among students. It's great that you're reaching out for support. Let's work on some strategies to help you manage this stress effectively.";
      suggestions = ['Show study tips', 'Help with time management', 'Relaxation for exams'];
    } else {
      response = "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about how you're feeling right now?";
      suggestions = ['I feel overwhelmed', 'I need motivation', 'Help me relax'];
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      riskLevel,
      suggestions
    };
  };

  const handleSendMessage = (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-calm">
      <Card className="flex-1 flex flex-col shadow-card border-0">
        <CardHeader className="border-b border-border bg-card/50">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            AI Mental Health Companion
            <Badge variant="secondary" className="ml-auto">
              <Shield className="w-3 h-3 mr-1" />
              Confidential
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}>
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {message.type === 'bot' ? (
                      <Bot className="w-4 h-4 text-primary" />
                    ) : (
                      <User className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.riskLevel === 'high' && (
                      <AlertTriangle className="w-4 h-4 text-crisis" />
                    )}
                  </div>
                  
                  <div className={`p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground shadow-soft' 
                      : 'bg-muted text-foreground'
                  }`}>
                    {message.content}
                  </div>

                  {/* Quick Reply Suggestions */}
                  {message.suggestions && message.type === 'bot' && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="soft"
                          size="sm"
                          onClick={() => handleSendMessage(suggestion)}
                          className="text-xs"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-slide-in">
                <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                  <Bot className="w-4 h-4 text-primary animate-gentle-pulse" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-card/50">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Press Enter to send)"
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                variant="glow"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <Heart className="w-3 h-3" />
              Your conversations are private and secure
              <Smile className="w-3 h-3 ml-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;