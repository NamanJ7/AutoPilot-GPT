import React, { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Navigation2, 
  Layers, 
  ZoomIn, 
  ZoomOut,
  Locate,
  Route,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MapLocation {
  lat: number;
  lng: number;
  name: string;
}

interface NavigationMapProps {
  fromLocation: MapLocation;
  toLocation: MapLocation;
  showTraffic?: boolean;
  routeType?: "fastest" | "toll" | "scenic";
  className?: string;
}

const NavigationMap: React.FC<NavigationMapProps> = ({
  fromLocation,
  toLocation,
  showTraffic = true,
  routeType = "fastest",
  className
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [mapType, setMapType] = useState<"satellite" | "terrain" | "roadmap">("roadmap");
  const [trafficEnabled, setTrafficEnabled] = useState(showTraffic);

  // Simulated route points for demonstration
  const routePoints = [
    { lat: fromLocation.lat, lng: fromLocation.lng },
    { lat: fromLocation.lat + 0.01, lng: fromLocation.lng + 0.02 },
    { lat: fromLocation.lat + 0.03, lng: fromLocation.lng + 0.04 },
    { lat: toLocation.lat, lng: toLocation.lng }
  ];

  const trafficData = [
    { point: 1, level: "heavy", color: "bg-red-500" },
    { point: 2, level: "moderate", color: "bg-yellow-500" },
    { point: 3, level: "light", color: "bg-green-500" }
  ];

  useEffect(() => {
    // In a real implementation, this would initialize the actual map
    console.log("Map initialized with:", { fromLocation, toLocation, routeType });
  }, [fromLocation, toLocation, routeType]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1));
  };

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      {/* Map Container */}
      <div 
        ref={mapRef}
        className="h-80 md:h-96 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 relative"
      >
        {/* Simulated Map Content */}
        <div className="absolute inset-0 p-4">
          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <polyline
              points="20,60 100,80 200,120 300,180"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              strokeDasharray={routeType === "toll" ? "10,5" : "none"}
              className="animate-pulse"
            />
          </svg>

          {/* Start Location */}
          <div className="absolute top-12 left-4 flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
            <Badge variant="secondary" className="text-xs">
              {fromLocation.name}
            </Badge>
          </div>

          {/* End Location */}
          <div className="absolute bottom-16 right-8 flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
            <Badge variant="secondary" className="text-xs">
              {toLocation.name}
            </Badge>
          </div>

          {/* Traffic Indicators */}
          {trafficEnabled && (
            <div className="absolute top-20 left-20 space-y-1">
              {trafficData.map((traffic, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", traffic.color)}></div>
                  <span className="text-xs bg-white/80 dark:bg-black/80 px-1 rounded">
                    {traffic.level}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Route Type Indicator */}
          <div className="absolute top-4 left-4">
            <Badge variant="outline" className="bg-white/90 dark:bg-black/90">
              <Route className="h-3 w-3 mr-1" />
              {routeType === "toll" ? "Toll Route" : 
               routeType === "scenic" ? "Scenic Route" : "Fastest Route"}
            </Badge>
          </div>

          {/* Construction Alert */}
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-yellow-500 text-yellow-900 p-1 rounded-full animate-pulse">
              <AlertCircle className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleZoomIn}
            className="w-8 h-8 p-0 bg-white/90 dark:bg-black/90"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleZoomOut}
            className="w-8 h-8 p-0 bg-white/90 dark:bg-black/90"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="w-8 h-8 p-0 bg-white/90 dark:bg-black/90"
          >
            <Locate className="h-4 w-4" />
          </Button>
        </div>

        {/* Layer Controls */}
        <div className="absolute bottom-4 right-4 flex gap-1">
          <Button
            variant={mapType === "roadmap" ? "default" : "secondary"}
            size="sm"
            onClick={() => setMapType("roadmap")}
            className="text-xs px-2 py-1 h-6"
          >
            Map
          </Button>
          <Button
            variant={mapType === "satellite" ? "default" : "secondary"}
            size="sm"
            onClick={() => setMapType("satellite")}
            className="text-xs px-2 py-1 h-6"
          >
            Sat
          </Button>
          <Button
            variant={trafficEnabled ? "default" : "secondary"}
            size="sm"
            onClick={() => setTrafficEnabled(!trafficEnabled)}
            className="text-xs px-2 py-1 h-6"
          >
            Traffic
          </Button>
        </div>
      </div>

      {/* Map Info Bar */}
      <div className="p-3 border-t bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-primary" />
              Zoom: {zoomLevel}x
            </span>
            <span className="flex items-center gap-1">
              <Layers className="h-4 w-4 text-primary" />
              {mapType}
            </span>
          </div>
          <div className="text-muted-foreground">
            Real-time traffic: {trafficEnabled ? "On" : "Off"}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NavigationMap;