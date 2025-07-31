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
      text: "Hi! I'm your GTA navigation assistant. I can help you find the best routes, avoid traffic, and explain why I chose specific paths to get you to your destination faster and safer. Where would you like to go?",
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "Best route from Toronto to Mississauga",
        "Avoid highway traffic to Brampton",
        "Fastest way to Pearson Airport",
        "Alternative routes due to construction"
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
    
    // Route planning and navigation
    if (message.includes("toronto to mississauga") || message.includes("mississauga from toronto")) {
      return "🚗 **Best Route: Toronto to Mississauga**\n\n**Recommended:** Take Highway 401 West → Exit at Hurontario St (Exit 344)\n\n**Why this route:**\n• ✅ Avoiding current construction on QEW near Sherway\n• ✅ Less congested than Gardiner → QEW route\n• ✅ 27-minute drive vs 35+ minutes via alternative routes\n• ⚠️ Watch for rush hour slowdowns at 427 interchange\n\n**Current conditions:** Light traffic, clear weather. Would you like real-time traffic updates?";
    }
    
    if (message.includes("pearson airport") || message.includes("airport")) {
      return "✈️ **Best Route to Pearson Airport**\n\n**Recommended:** Highway 427 North → Airport Road\n\n**Why I chose this route:**\n• ✅ Avoiding construction on Highway 409\n• ✅ 15% faster than Dixon Road route\n• ✅ Multiple parking options available\n• 🚨 Current delay: 5-min backup due to aircraft movements\n\n**Alternative:** If coming from east GTA, take 401 West → 427 North\n\nWould you like departure terminal information or parking recommendations?";
    }
    
    if (message.includes("brampton") && (message.includes("traffic") || message.includes("avoid"))) {
      return "🚧 **Alternative Routes to Brampton**\n\n**Avoiding Highway 410 (Heavy Traffic)**\n\n**Best Alternative:** Take Highway 401 → Kennedy Road North\n\n**Why this works better:**\n• ✅ Bypassing 3-car accident at 410/Queen St\n• ✅ 12 minutes faster than Highway 410\n• ✅ Less construction zones\n• 🌧️ Rain starting soon - this route has better drainage\n\nCurrent travel time: 22 minutes. Want live updates during your drive?";
    }
    
    if (message.includes("construction") || message.includes("road work")) {
      return "🚧 **Active Construction in GTA**\n\n**Major Impacts:**\n• Highway 401 eastbound - Lane closures at 400 interchange\n• QEW near Burlington - Reduced to 2 lanes\n• DVP southbound - Off-ramp at Bloor closed\n\n**Smart Detours:**\n• Use Highway 407 if traveling east-west (toll route but saves 20+ min)\n• Take surface streets like Dundas or Bloor for downtown access\n\nWhich specific area are you traveling to? I'll find the best construction-free route.";
    }
    
    if (message.includes("weather") || message.includes("rain") || message.includes("snow")) {
      return "🌤️ **Current GTA Weather Impact**\n\n**Today:** Light rain starting at 3 PM, temperature 18°C\n\n**Route Recommendations:**\n• ✅ Highways are safest - avoid Lakeshore routes (prone to flooding)\n• ⚠️ Reduced visibility expected on Highway 427 near airport\n• 🚗 Allow extra 10-15 minutes for wet road conditions\n\n**Best routes in rain:** Highway 401, Highway 404 (good drainage), avoid Highway 410 (construction + poor drainage)\n\nPlanning a trip? I can suggest weather-optimized routes.";
    }
    
    if (message.includes("fastest") || message.includes("quickest")) {
      return "⚡ **Fastest Routes in GTA Right Now**\n\n**Top 3 Speed Options:**\n1. **Highway 407 Express** - Toll road, consistently fast\n2. **Highway 404 South** - Light traffic, well-maintained\n3. **Highway 401 Collectors** - Avoiding express lane congestion\n\n**Why these work:**\n• Real-time traffic optimization\n• Minimal construction interference\n• Better road surface conditions\n\nWhere are you headed? I'll calculate the absolute fastest route with current traffic data.";
    }
    
    if (message.includes("accident") || message.includes("collision")) {
      return "🚨 **Active Traffic Incidents**\n\n**Current Accidents:**\n• Highway 410 & Queen St - 3-vehicle collision, right lane blocked\n• DVP near Don Mills - Fender bender, cleared in 10 minutes\n• 401 at 427 - Stalled vehicle, tow truck en route\n\n**Detour Suggestions:**\n• Use Kennedy Road instead of Highway 410\n• Take Bayview Avenue instead of DVP\n• Consider Highway 407 to bypass 401/427 area\n\nNeed a specific route around any of these incidents?";
    }
    
    if (message.includes("traffic") || message.includes("congestion")) {
      return "🚦 **Current GTA Traffic Overview**\n\n**Heavy Traffic Areas:**\n• Highway 401 between 400 and 404 (rush hour backup)\n• QEW through Mississauga (ongoing construction)\n• Highway 410 northbound (accident-related)\n\n**Clear Routes:**\n• Highway 407 Express (toll road)\n• Highway 404 north of 401\n• Surface roads: Dundas, Bloor relatively clear\n\n**Smart timing:** Traffic typically clears after 7 PM on weekdays.\n\nWhere are you traveling? I'll find the clearest path.";
    }
    
    // Default response with route focus
    if (message.includes("route") || message.includes("direction") || message.includes("how to get")) {
      return "🗺️ **Route Planning Assistant**\n\nI can help you find the best route anywhere in the GTA! I consider:\n\n• 🚨 Real-time traffic and accidents\n• 🚧 Construction and road closures\n• 🌧️ Weather conditions affecting driving\n• ⏱️ Time-of-day traffic patterns\n• 💰 Toll vs free route options\n\n**Just tell me:**\n• Where you're starting from\n• Where you need to go\n• If you want fastest, cheapest, or most scenic route\n\nExample: \"Best route from Markham to downtown Toronto avoiding construction\"";
    }
    
    return `🤔 I'm not sure about "${userMessage}" specifically, but I'm your GTA navigation expert! I can help you with:\n\n• **Route planning** with real-time traffic\n• **Construction detours** and road closures\n• **Weather-optimized routes**\n• **Accident avoidance** and traffic updates\n• **Time-based recommendations** for any destination\n\nTry asking: "Best route to [destination]" or "How to avoid traffic to [location]"`;
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
            "Show me alternatives",
            "Real-time updates",
            "Save this route",
            "What about tolls?"
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
          <h1 className="text-3xl font-bold mb-2">GTA Navigation Assistant</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get intelligent route planning across the Greater Toronto Area. I'll explain why I choose specific routes based on traffic, weather, and road conditions.
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
                placeholder="Where do you need to go in the GTA?"
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
          <Card 
            className="p-4 text-center hover:shadow-elegant transition-all duration-300 cursor-pointer"
            onClick={() => handleSuggestionClick("Best route from Toronto to Mississauga")}
          >
            <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Smart Routes</h3>
            <p className="text-xs text-muted-foreground">Traffic-optimized paths</p>
          </Card>
          
          <Card 
            className="p-4 text-center hover:shadow-elegant transition-all duration-300 cursor-pointer"
            onClick={() => handleSuggestionClick("Current traffic conditions in GTA")}
          >
            <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Live Traffic</h3>
            <p className="text-xs text-muted-foreground">Real-time updates</p>
          </Card>
          
          <Card 
            className="p-4 text-center hover:shadow-elegant transition-all duration-300 cursor-pointer"
            onClick={() => handleSuggestionClick("Show me construction detours")}
          >
            <Navigation className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Detours</h3>
            <p className="text-xs text-muted-foreground">Avoid construction</p>
          </Card>
          
          <Card 
            className="p-4 text-center hover:shadow-elegant transition-all duration-300 cursor-pointer"
            onClick={() => handleSuggestionClick("Fastest way to Pearson Airport")}
          >
            <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Airport</h3>
            <p className="text-xs text-muted-foreground">Quick airport routes</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;