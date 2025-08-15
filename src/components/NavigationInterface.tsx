import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Navigation, 
  MapPin, 
  Clock, 
  DollarSign,
  Route,
  AlertTriangle,
  Volume2,
  VolumeX,
  Settings,
  ArrowUpRight,
  ArrowRight,
  RotateCcw,
  Plus,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RouteOption {
  id: string;
  name: string;
  distance: string;
  duration: string;
  tolls: number;
  traffic: "light" | "moderate" | "heavy";
  isRecommended?: boolean;
}

interface NavigationStep {
  id: string;
  instruction: string;
  distance: string;
  icon: React.ReactNode;
  type: "straight" | "left" | "right" | "exit" | "merge";
}

interface NavigationInterfaceProps {
  fromLocation: string;
  toLocation: string;
  onClose?: () => void;
}

const NavigationInterface: React.FC<NavigationInterfaceProps> = ({
  fromLocation,
  toLocation,
  onClose
}) => {
  const [selectedRoute, setSelectedRoute] = useState<string>("route-1");
  const [isNavigating, setIsNavigating] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [routeProgress, setRouteProgress] = useState(0);
  const [showRouteOptions, setShowRouteOptions] = useState(true);

  const routeOptions: RouteOption[] = [
    {
      id: "route-1",
      name: "Fastest Route",
      distance: "32.5 km",
      duration: "28 min",
      tolls: 0,
      traffic: "moderate",
      isRecommended: true
    },
    {
      id: "route-2", 
      name: "Toll Route (407)",
      distance: "29.8 km",
      duration: "22 min",
      tolls: 8.50,
      traffic: "light"
    },
    {
      id: "route-3",
      name: "Scenic Route",
      distance: "38.2 km", 
      duration: "35 min",
      tolls: 0,
      traffic: "light"
    }
  ];

  const navigationSteps: NavigationStep[] = [
    {
      id: "1",
      instruction: "Head northeast on Main Street toward Highway 401",
      distance: "1.2 km",
      icon: <ArrowUpRight className="h-6 w-6" />,
      type: "straight"
    },
    {
      id: "2", 
      instruction: "Merge onto Highway 401 East",
      distance: "0.8 km",
      icon: <ArrowRight className="h-6 w-6" />,
      type: "merge"
    },
    {
      id: "3",
      instruction: "Take Exit 373 toward DVP South",
      distance: "15.5 km", 
      icon: <RotateCcw className="h-6 w-6" />,
      type: "exit"
    },
    {
      id: "4",
      instruction: "Continue on Don Valley Parkway",
      distance: "12.8 km",
      icon: <ArrowUpRight className="h-6 w-6" />,
      type: "straight"
    },
    {
      id: "5",
      instruction: "Take Exit 1 toward Lake Shore Boulevard",
      distance: "2.2 km",
      icon: <RotateCcw className="h-6 w-6" />,
      type: "exit"
    }
  ];

  useEffect(() => {
    if (isNavigating) {
      const interval = setInterval(() => {
        setRouteProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            setIsNavigating(false);
            return 100;
          }
          return newProgress;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isNavigating]);

  const handleStartNavigation = () => {
    setIsNavigating(true);
    setShowRouteOptions(false);
    setRouteProgress(0);
  };

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case "light": return "text-green-500";
      case "moderate": return "text-yellow-500"; 
      case "heavy": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getTrafficBadgeVariant = (traffic: string) => {
    switch (traffic) {
      case "light": return "default";
      case "moderate": return "secondary";
      case "heavy": return "destructive";
      default: return "outline";
    }
  };

  if (isNavigating) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col">
        {/* Navigation Header */}
        <div className="bg-gradient-primary text-primary-foreground p-4 shadow-elegant">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Navigation className="h-6 w-6" />
              <span className="font-semibold">Navigating</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="text-primary-foreground hover:bg-white/20"
              >
                {voiceEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsNavigating(false);
                  setShowRouteOptions(true);
                  setRouteProgress(0);
                }}
                className="text-primary-foreground hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Progress value={routeProgress} className="h-2 bg-white/20" />
          <div className="text-sm opacity-90 mt-1">
            {Math.round(routeProgress)}% complete • 18 min remaining
          </div>
        </div>

        {/* Current Step */}
        <div className="flex-1 p-6 bg-gradient-subtle">
          <div className="max-w-2xl mx-auto">
            <Card className="p-6 mb-6 shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground p-3 rounded-full">
                  {navigationSteps[currentStepIndex]?.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">
                    {navigationSteps[currentStepIndex]?.instruction}
                  </h2>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {navigationSteps[currentStepIndex]?.distance}
                    </span>
                    <Badge variant="outline">Next turn in 800m</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Upcoming Steps */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Route className="h-5 w-5" />
                Upcoming Steps
              </h3>
              <div className="space-y-3">
                {navigationSteps.slice(currentStepIndex + 1, currentStepIndex + 3).map((step, index) => (
                  <div key={step.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <div className="text-muted-foreground">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{step.instruction}</p>
                      <span className="text-xs text-muted-foreground">{step.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="border-t bg-card p-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-lg font-bold">18 min</div>
                <div className="text-xs text-muted-foreground">ETA 3:45 PM</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">32.5 km</div>
                <div className="text-xs text-muted-foreground">Distance</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Stop
              </Button>
              <Button variant="outline" size="sm">
                <Route className="h-4 w-4 mr-1" />
                Reroute
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Route Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Route</h2>
        <p className="text-muted-foreground">
          From <span className="font-medium">{fromLocation}</span> to <span className="font-medium">{toLocation}</span>
        </p>
      </div>

      {/* Route Options */}
      <div className="space-y-4">
        {routeOptions.map((route) => (
          <Card
            key={route.id}
            className={cn(
              "p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
              selectedRoute === route.id && "ring-2 ring-primary shadow-glow",
              route.isRecommended && "border-primary"
            )}
            onClick={() => setSelectedRoute(route.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{route.name}</h3>
                  {route.isRecommended && (
                    <Badge className="bg-primary text-primary-foreground">
                      Recommended
                    </Badge>
                  )}
                  <Badge variant={getTrafficBadgeVariant(route.traffic)}>
                    {route.traffic} traffic
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{route.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{route.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{route.tolls > 0 ? `$${route.tolls}` : "Free"}</span>
                  </div>
                </div>
              </div>
              <div className={cn("text-2xl font-bold", getTrafficColor(route.traffic))}>
                {route.duration.split(" ")[0]}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Route Details */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Route className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Route Preview</h3>
        </div>
        <div className="space-y-2">
          {navigationSteps.slice(0, 3).map((step, index) => (
            <div key={step.id} className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {index + 1}
              </div>
              <span>{step.instruction}</span>
            </div>
          ))}
          <div className="text-xs text-muted-foreground ml-9">
            ...and {navigationSteps.length - 3} more steps
          </div>
        </div>
      </Card>

      {/* Traffic Alerts */}
      <Card className="p-4 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
              Traffic Alert
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Moderate traffic on Highway 401 eastbound. Consider using the toll route for 6 minutes faster arrival.
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          onClick={handleStartNavigation}
          className="flex-1 h-12 text-lg font-semibold bg-gradient-primary hover:shadow-glow transition-all duration-200"
        >
          <Navigation className="h-5 w-5 mr-2" />
          Start Navigation
        </Button>
        <Button variant="outline" size="lg" className="px-6">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default NavigationInterface;