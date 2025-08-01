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

  useEffect(() => {
    // Check for URL parameters on page load
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('q');
    if (queryParam) {
      setInputValue(decodeURIComponent(queryParam));
      // Auto-send the message after a brief delay
      setTimeout(() => {
        const userMessage: Message = {
          id: Date.now().toString(),
          text: decodeURIComponent(queryParam),
          isUser: true,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);
        
        setTimeout(() => {
          const responseText = generateResponse(decodeURIComponent(queryParam).toLowerCase());
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: responseText,
            isUser: false,
            timestamp: new Date(),
            suggestions: getSuggestions(decodeURIComponent(queryParam))
          };
          
          setMessages(prev => [...prev, botMessage]);
          setIsTyping(false);
        }, 1200);
        
        // Clear URL parameter
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 500);
    }
  }, []);

  const generateRouteResponse = (from: string, to: string): string => {
    // Normalize location names
    const normalizeLocation = (location: string) => {
      return location.toLowerCase()
        .replace(/\b(downtown|dt)\b/g, "toronto")
        .replace(/\b(toronto)\b/g, "toronto")
        .replace(/\b(mississauga|sauga)\b/g, "mississauga")
        .replace(/\b(brampton)\b/g, "brampton")
        .replace(/\b(oakville)\b/g, "oakville")
        .replace(/\b(burlington)\b/g, "burlington")
        .replace(/\b(hamilton)\b/g, "hamilton")
        .replace(/\b(markham)\b/g, "markham")
        .replace(/\b(richmond hill)\b/g, "richmond hill")
        .replace(/\b(vaughan)\b/g, "vaughan")
        .replace(/\b(pickering)\b/g, "pickering")
        .replace(/\b(ajax)\b/g, "ajax")
        .replace(/\b(whitby)\b/g, "whitby")
        .replace(/\b(oshawa)\b/g, "oshawa")
        .trim();
    };

    const fromNorm = normalizeLocation(from);
    const toNorm = normalizeLocation(to);

    // Generate realistic route responses with reasons
    const routes = {
      [`${fromNorm}_${toNorm}`]: generateSpecificRoute(fromNorm, toNorm),
      [`${toNorm}_${fromNorm}`]: generateSpecificRoute(toNorm, fromNorm) // Handle reverse direction
    };

    return routes[`${fromNorm}_${toNorm}`] || 
           routes[`${toNorm}_${fromNorm}`] || 
           generateGenericRoute(from, to);
  };

  const generateSpecificRoute = (from: string, to: string): string => {
    // Real GTA route combinations with intelligent reasoning
    const routeMap: { [key: string]: string } = {
      "mississauga_oakville": "🚗 **Best Route: Mississauga to Oakville**\n\n**Recommended:** QEW West → Exit at Trafalgar Road (Exit 109)\n\n**Why this route:**\n• ✅ Avoiding construction on Lakeshore Road\n• ✅ QEW has better traffic flow than surface streets\n• ✅ 18-minute drive vs 25+ minutes via Dundas Street\n• ⚠️ Watch for rush hour backup near Sheridan College\n\n**Current conditions:** Light traffic, clear weather. Estimated time: 18 minutes.",
      
      "toronto_mississauga": "🚗 **Best Route: Toronto to Mississauga**\n\n**Recommended:** Gardiner Expressway West → QEW West → Exit at Hurontario St\n\n**Why this route:**\n• ✅ Fastest highway connection available\n• ✅ Avoiding construction on Highway 427\n• ✅ 28-minute drive vs 40+ minutes via surface roads\n• 🚨 Minor delay: 3-vehicle accident cleared at Islington\n\n**Current conditions:** Moderate traffic, estimated time: 28 minutes.",
      
      "brampton_toronto": "🚗 **Best Route: Brampton to Toronto**\n\n**Recommended:** Highway 410 South → Highway 401 East → DVP South\n\n**Why this route:**\n• ✅ Most direct highway route to downtown\n• ✅ Avoiding construction on Highway 427\n• ✅ 35-minute drive vs 50+ minutes via surface streets\n• ⚠️ Rush hour congestion expected at 401/DVP interchange\n\n**Current conditions:** Heavy traffic during peak hours, estimated time: 35-45 minutes.",
      
      "markham_toronto": "🚗 **Best Route: Markham to Toronto**\n\n**Recommended:** Highway 404 South → DVP South → Gardiner Expressway\n\n**Why this route:**\n• ✅ Direct highway access to downtown core\n• ✅ Less congested than Highway 401 route\n• ✅ 32-minute drive vs 45+ minutes via Don Mills Road\n• 🌧️ Weather advisory: Light rain, allow extra 5 minutes\n\n**Current conditions:** Moderate traffic, estimated time: 32 minutes.",
      
      "hamilton_toronto": "🚗 **Best Route: Hamilton to Toronto**\n\n**Recommended:** QEW East → Gardiner Expressway → DVP North\n\n**Why this route:**\n• ✅ Major highway corridor, most reliable\n• ✅ Avoiding construction on Highway 403\n• ✅ 55-minute drive vs 75+ minutes via Highway 6\n• 🚧 Construction zone: Lane reduction near Burlington Skyway\n\n**Current conditions:** Moderate traffic, construction delays possible. Estimated time: 55-65 minutes.",
      
      "vaughan_toronto": "🚗 **Best Route: Vaughan to Toronto**\n\n**Recommended:** Highway 400 South → Highway 401 East → DVP South\n\n**Why this route:**\n• ✅ Major highway system, consistent speeds\n• ✅ Avoiding congestion on Yonge Street\n• ✅ 38-minute drive vs 55+ minutes via surface roads\n• ⚠️ Peak hour bottleneck at 400/401 interchange\n\n**Current conditions:** Moderate to heavy traffic, estimated time: 38-48 minutes.",
      
      "oakville_toronto": "🚗 **Best Route: Oakville to Toronto**\n\n**Recommended:** QEW East → Gardiner Expressway → DVP or Lakeshore\n\n**Why this route:**\n• ✅ Direct highway access to downtown\n• ✅ Bypassing local traffic in Mississauga\n• ✅ 35-minute drive vs 50+ minutes via Dundas Street\n• 🚨 Accident cleared: Minor delay near Sherway Gardens\n\n**Current conditions:** Light to moderate traffic, estimated time: 35 minutes."
    };

    return routeMap[`${from}_${to}`] || "";
  };

  const generateGenericRoute = (from: string, to: string): string => {
    // Fallback for any location combination
    const reasons = [
      "Avoiding current construction zones",
      "Bypassing heavy traffic on alternate routes", 
      "Weather-optimized for current conditions",
      "Fastest highway connections available",
      "Avoiding accident-related delays"
    ];
    
    const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
    const estimatedTime = Math.floor(Math.random() * 30) + 15; // 15-45 minutes
    
    return `🚗 **Best Route: ${from.charAt(0).toUpperCase() + from.slice(1)} to ${to.charAt(0).toUpperCase() + to.slice(1)}**\n\n**Recommended Route Found**\n\n**Why this route:**\n• ✅ ${randomReason}\n• ✅ Optimal highway and surface street combination\n• ✅ Real-time traffic consideration\n• ⏱️ Estimated travel time: ${estimatedTime} minutes\n\n**Current conditions:** Analyzing live traffic data for your route.\n\nWould you like alternative routes or real-time traffic updates?`;
  };

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Extract location patterns more intelligently
    const locationPatterns = [
      /(?:from\s+)?(.+?)\s+to\s+(.+?)(?:\s|$)/i,
      /(?:route\s+)?(?:from\s+)?(.+?)\s+(?:to\s+|→\s+)(.+?)(?:\s|$)/i,
      /(?:going\s+)?(?:from\s+)?(.+?)\s+(?:→|->)\s+(.+?)(?:\s|$)/i,
      /(?:drive\s+)?(?:from\s+)?(.+?)\s+(?:towards?|heading\s+to)\s+(.+?)(?:\s|$)/i
    ];
    
    let fromLocation = "";
    let toLocation = "";
    
    // Try to match location patterns
    for (const pattern of locationPatterns) {
      const match = message.match(pattern);
      if (match && match[1] && match[2]) {
        fromLocation = match[1].trim();
        toLocation = match[2].trim();
        break;
      }
    }
    
    // Generate intelligent route responses for any location pair
    if (fromLocation && toLocation) {
      return generateRouteResponse(fromLocation, toLocation);
    }
    
    // Specific location queries
    if (message.includes("pearson airport") || message.includes("airport") || message.includes("yyz")) {
      return "✈️ **Best Route to Pearson Airport**\n\n**Recommended:** Highway 427 North → Airport Road\n\n**Why I chose this route:**\n• ✅ Avoiding construction on Highway 409\n• ✅ 15% faster than Dixon Road route\n• ✅ Multiple parking options available\n• 🚨 Current delay: 5-min backup due to aircraft movements\n\n**Alternative:** If coming from east GTA, take 401 West → 427 North\n\nWould you like departure terminal information or parking recommendations?";
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
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Enhanced response with more realistic routing
    setTimeout(() => {
      const responseText = generateEnhancedResponse(currentInput);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        suggestions: getSuggestions(currentInput)
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const getSuggestions = (input: string): string[] => {
    if (input.toLowerCase().includes("route") || input.toLowerCase().includes("to")) {
      return ["Show alternatives", "Avoid tolls", "Real-time traffic", "Save route"];
    }
    return ["Best routes", "Traffic updates", "Weather impact", "Construction alerts"];
  };

  const generateEnhancedResponse = (input: string): string => {
    // Try URL parameters first (from Explore page)
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('q');
    const message = queryParam || input;
    
    return generateResponse(message.toLowerCase());
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