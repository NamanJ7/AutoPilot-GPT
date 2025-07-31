import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Send, 
  Mic, 
  MapPin, 
  Clock, 
  Navigation,
  Bot,
  User,
  Sparkles
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your Brampton assistant. I can help you with local services, transit, weather, directions, and much more. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "What's the weather like today?",
        "Show me Brampton Transit routes",
        "Find nearby restaurants",
        "City hall hours and services"
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("weather")) {
      return "🌤️ Today in Brampton: Partly cloudy, 22°C with light winds from the west. Perfect weather for a walk in Gage Park! Would you like the 7-day forecast?";
    }
    
    if (message.includes("transit") || message.includes("bus")) {
      return "🚌 Brampton Transit is running on schedule today. Popular routes include Route 1 (Main St), Route 5 (Dixie), and Züm lines. Would you like specific route information or real-time arrivals?";
    }
    
    if (message.includes("restaurant") || message.includes("food")) {
      return "🍕 Great local spots near you: The Keg (steakhouse), Mandarin (buffet), Tim Hortons (coffee), and many ethnic cuisines on Queen St. What type of food are you craving?";
    }
    
    if (message.includes("city hall") || message.includes("permit")) {
      return "🏛️ Brampton City Hall is open Mon-Fri 8:30am-4:30pm. Services include permits, licenses, tax payments, and more. You can also access many services online at brampton.ca";
    }
    
    if (message.includes("park") || message.includes("recreation")) {
      return "🌳 Brampton has amazing parks! Chinguacousy Park (skiing, pools), Gage Park (rose garden), and Heart Lake Conservation Area are popular. Which activities interest you?";
    }
    
    return "I understand you're asking about '" + userMessage + "'. As your Brampton assistant, I can help with local services, directions, transit, weather, and city information. Could you be more specific about what you need?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseText = generateResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        suggestions: [
          "Tell me more",
          "Show on map",
          "Get directions",
          "What else can you help with?"
        ]
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pt-20 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-gradient-primary p-4 rounded-2xl mb-4 shadow-elegant">
            <Bot className="h-8 w-8 text-primary-foreground" />
            <Sparkles className="h-6 w-6 text-primary-foreground animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Your Brampton Assistant</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get instant help with local services, transit info, weather, directions, and city resources. 
            I'm here to make your life in Brampton easier!
          </p>
        </div>

        {/* Chat Container */}
        <Card className="h-[500px] flex flex-col shadow-elegant">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isUser ? "flex-row-reverse" : "flex-row"} animate-slide-up`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.isUser 
                    ? "bg-gradient-accent" 
                    : "bg-gradient-primary"
                }`}>
                  {message.isUser ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                
                <div className={`max-w-xs md:max-w-md ${message.isUser ? "text-right" : "text-left"}`}>
                  <div className={`p-4 rounded-2xl ${
                    message.isUser
                      ? "bg-gradient-accent text-accent-foreground"
                      : "bg-muted"
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>

                  {/* Suggestions */}
                  {message.suggestions && !message.isUser && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs mr-2 mb-2"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 animate-slide-up">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-muted p-4 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Brampton..."
                className="flex-1"
              />
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Mic className="h-4 w-4" />
              </Button>
              <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
          <Card className="p-4 text-center hover:shadow-elegant transition-all duration-300 cursor-pointer">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Directions</h3>
            <p className="text-xs text-muted-foreground">Get around Brampton</p>
          </Card>
          
          <Card className="p-4 text-center hover:shadow-elegant transition-all duration-300 cursor-pointer">
            <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Transit</h3>
            <p className="text-xs text-muted-foreground">Live bus times</p>
          </Card>
          
          <Card className="p-4 text-center hover:shadow-elegant transition-all duration-300 cursor-pointer">
            <Navigation className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Services</h3>
            <p className="text-xs text-muted-foreground">City resources</p>
          </Card>
          
          <Card className="p-4 text-center hover:shadow-elegant transition-all duration-300 cursor-pointer">
            <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Explore</h3>
            <p className="text-xs text-muted-foreground">Discover local spots</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;