import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  DollarSign, 
  Clock, 
  MapPin, 
  TrendingUp, 
  TrendingDown,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RouteComparison {
  tollRoute: {
    distance: string;
    duration: string;
    cost: number;
    savings: string;
  };
  freeRoute: {
    distance: string;
    duration: string;
    cost: number;
    extraTime: string;
  };
}

interface TollRouteToggleProps {
  comparison: RouteComparison;
  onToggle: (useTolls: boolean) => void;
  defaultTolls?: boolean;
}

const TollRouteToggle: React.FC<TollRouteToggleProps> = ({
  comparison,
  onToggle,
  defaultTolls = false
}) => {
  const [useTolls, setUseTolls] = useState(defaultTolls);

  const handleToggle = (enabled: boolean) => {
    setUseTolls(enabled);
    onToggle(enabled);
  };

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Toggle Control */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold">Use Toll Routes</h3>
              <p className="text-sm text-muted-foreground">
                Pay for faster travel times
              </p>
            </div>
          </div>
          <Switch
            checked={useTolls}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </Card>

      {/* Route Comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Toll Route */}
        <Card className={cn(
          "p-4 transition-all duration-200",
          useTolls ? "ring-2 ring-primary bg-primary/5" : "opacity-75"
        )}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-primary">Toll Route (407)</h4>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              <TrendingUp className="h-3 w-3 mr-1" />
              Fastest
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{comparison.tollRoute.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{comparison.tollRoute.distance}</span>
              </div>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Toll Cost:</span>
                <span className="font-semibold text-lg">${comparison.tollRoute.cost}</span>
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                Saves {comparison.tollRoute.savings}
              </div>
            </div>
          </div>
        </Card>

        {/* Free Route */}
        <Card className={cn(
          "p-4 transition-all duration-200",
          !useTolls ? "ring-2 ring-primary bg-primary/5" : "opacity-75"
        )}>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-primary">Free Route</h4>
            <Badge variant="outline">
              <DollarSign className="h-3 w-3 mr-1" />
              No Tolls
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{comparison.freeRoute.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{comparison.freeRoute.distance}</span>
              </div>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Toll Cost:</span>
                <span className="font-semibold text-lg text-green-600 dark:text-green-400">
                  Free
                </span>
              </div>
              <div className="text-xs text-orange-600 dark:text-orange-400 mt-1 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                +{comparison.freeRoute.extraTime} longer
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Cost Analysis */}
      <Card className="p-4 bg-gradient-subtle">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-semibold mb-2">Route Analysis</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-primary">Time Value</p>
                <p className="text-muted-foreground">
                  Toll route saves {comparison.tollRoute.savings} for ${comparison.tollRoute.cost}
                </p>
              </div>
              <div>
                <p className="font-medium text-primary">Best For</p>
                <p className="text-muted-foreground">
                  {useTolls 
                    ? "Time-sensitive trips, business travel"
                    : "Budget-conscious travel, leisure trips"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <Button
          variant={useTolls ? "default" : "outline"}
          size="sm"
          onClick={() => handleToggle(true)}
          className="flex-1"
        >
          <TrendingUp className="h-4 w-4 mr-1" />
          Fastest (Tolls)
        </Button>
        <Button
          variant={!useTolls ? "default" : "outline"}
          size="sm"
          onClick={() => handleToggle(false)}
          className="flex-1"
        >
          <DollarSign className="h-4 w-4 mr-1" />
          Free Route
        </Button>
      </div>
    </div>
  );
};

export default TollRouteToggle;