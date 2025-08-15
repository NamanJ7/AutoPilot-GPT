import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Settings, 
  Volume1,
  Play,
  Pause,
  SkipForward
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceSettings {
  enabled: boolean;
  volume: number;
  voice: "male" | "female" | "robotic";
  speed: number;
  announceTraffic: boolean;
  announceAlerts: boolean;
}

interface VoiceNavigationControlsProps {
  currentInstruction?: string;
  onSettingsChange: (settings: VoiceSettings) => void;
  className?: string;
}

const VoiceNavigationControls: React.FC<VoiceNavigationControlsProps> = ({
  currentInstruction = "Continue straight for 1.2 kilometers",
  onSettingsChange,
  className
}) => {
  const [settings, setSettings] = useState<VoiceSettings>({
    enabled: true,
    volume: 75,
    voice: "female",
    speed: 1.0,
    announceTraffic: true,
    announceAlerts: true
  });

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    onSettingsChange(settings);
  }, [settings, onSettingsChange]);

  const handleVolumeChange = (value: number[]) => {
    setSettings(prev => ({ ...prev, volume: value[0] }));
  };

  const handleSpeedChange = (value: number[]) => {
    setSettings(prev => ({ ...prev, speed: value[0] / 100 }));
  };

  const toggleVoice = () => {
    setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const playCurrentInstruction = () => {
    setIsSpeaking(true);
    // Simulate speech
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  const getVolumeIcon = () => {
    if (!settings.enabled || settings.volume === 0) return VolumeX;
    if (settings.volume < 50) return Volume1;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon();

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Voice Controls */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Voice Navigation</h3>
          <div className="flex items-center gap-2">
            <Badge variant={settings.enabled ? "default" : "secondary"}>
              {settings.enabled ? "Enabled" : "Disabled"}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Current Instruction */}
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">Next Instruction:</p>
              <p className="text-sm text-muted-foreground">{currentInstruction}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={playCurrentInstruction}
              disabled={!settings.enabled || isSpeaking}
              className="ml-2"
            >
              {isSpeaking ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Quick Controls */}
        <div className="flex items-center gap-3">
          <Button
            variant={settings.enabled ? "default" : "outline"}
            size="sm"
            onClick={toggleVoice}
            className="flex-1"
          >
            <VolumeIcon className="h-4 w-4 mr-2" />
            {settings.enabled ? "Voice On" : "Voice Off"}
          </Button>
          
          <Button
            variant={isListening ? "default" : "outline"}
            size="sm"
            onClick={toggleListening}
            className="flex-1"
          >
            {isListening ? (
              <Mic className="h-4 w-4 mr-2" />
            ) : (
              <MicOff className="h-4 w-4 mr-2" />
            )}
            {isListening ? "Listening" : "Voice Commands"}
          </Button>
        </div>
      </Card>

      {/* Voice Settings Panel */}
      {showSettings && (
        <Card className="p-4 animate-slide-up">
          <h4 className="font-semibold mb-4">Voice Settings</h4>
          
          <div className="space-y-6">
            {/* Volume Control */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Volume</label>
                <span className="text-sm text-muted-foreground">{settings.volume}%</span>
              </div>
              <Slider
                value={[settings.volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={5}
                className="w-full"
                disabled={!settings.enabled}
              />
            </div>

            {/* Speech Speed */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Speech Speed</label>
                <span className="text-sm text-muted-foreground">{settings.speed}x</span>
              </div>
              <Slider
                value={[settings.speed * 100]}
                onValueChange={handleSpeedChange}
                min={50}
                max={200}
                step={10}
                className="w-full"
                disabled={!settings.enabled}
              />
            </div>

            {/* Voice Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Voice Type</label>
              <div className="grid grid-cols-3 gap-2">
                {["female", "male", "robotic"].map((voice) => (
                  <Button
                    key={voice}
                    variant={settings.voice === voice ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettings(prev => ({ ...prev, voice: voice as any }))}
                    disabled={!settings.enabled}
                    className="text-xs"
                  >
                    {voice.charAt(0).toUpperCase() + voice.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Announcement Settings */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Announcements</label>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Traffic Updates</span>
                <Button
                  variant={settings.announceTraffic ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSettings(prev => ({ ...prev, announceTraffic: !prev.announceTraffic }))}
                  disabled={!settings.enabled}
                  className="text-xs"
                >
                  {settings.announceTraffic ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Safety Alerts</span>
                <Button
                  variant={settings.announceAlerts ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSettings(prev => ({ ...prev, announceAlerts: !prev.announceAlerts }))}
                  disabled={!settings.enabled}
                  className="text-xs"
                >
                  {settings.announceAlerts ? "On" : "Off"}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Voice Command Suggestions */}
      {isListening && (
        <Card className="p-4 border-primary bg-primary/5 animate-pulse-glow">
          <div className="flex items-center gap-2 mb-3">
            <Mic className="h-5 w-5 text-primary animate-pulse" />
            <span className="font-semibold text-primary">Listening for commands...</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">• "Find gas station"</div>
            <div className="text-muted-foreground">• "Avoid tolls"</div>
            <div className="text-muted-foreground">• "What's my ETA?"</div>
            <div className="text-muted-foreground">• "Add stop"</div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VoiceNavigationControls;