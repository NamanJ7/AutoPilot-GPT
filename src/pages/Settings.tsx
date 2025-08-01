import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  User,
  Bell,
  MapPin,
  Shield,
  Palette,
  Info,
  Heart,
  Smartphone,
  Volume2
} from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    transit: true,
    weather: true,
    cityUpdates: false,
    emergencies: true
  });

  const [preferences, setPreferences] = useState({
    language: "English",
    units: "Metric",
    darkMode: false,
    location: "Brampton, ON"
  });

  const [profile, setProfile] = useState({
    name: "GTA Resident",
    email: "user@example.com",
    phone: "+1 (905) 555-0123"
  });

  const settingSections = [
    {
      title: "Profile",
      icon: User,
      items: [
        {
          label: "Display Name",
          type: "input",
          value: profile.name,
          description: "How you'd like to be addressed",
          onChange: (value: string) => setProfile(prev => ({ ...prev, name: value }))
        },
        {
          label: "Email",
          type: "input",
          value: profile.email,
          description: "For important notifications and updates",
          onChange: (value: string) => setProfile(prev => ({ ...prev, email: value }))
        },
        {
          label: "Phone",
          type: "input",
          value: profile.phone,
          description: "For emergency alerts and SMS updates",
          onChange: (value: string) => setProfile(prev => ({ ...prev, phone: value }))
        }
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          label: "Transit Alerts",
          type: "switch",
          value: notifications.transit,
          description: "Route delays, service interruptions",
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, transit: value }))
        },
        {
          label: "Weather Updates",
          type: "switch",
          value: notifications.weather,
          description: "Severe weather warnings and forecasts",
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, weather: value }))
        },
        {
          label: "City Updates",
          type: "switch",
          value: notifications.cityUpdates,
          description: "Council meetings, city events",
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, cityUpdates: value }))
        },
        {
          label: "Emergency Alerts",
          type: "switch",
          value: notifications.emergencies,
          description: "Critical safety and emergency information",
          onChange: (value: boolean) => setNotifications(prev => ({ ...prev, emergencies: value }))
        }
      ]
    },
    {
      title: "Preferences",
      icon: Palette,
      items: [
        {
          label: "Language",
          type: "select",
          value: preferences.language,
          options: ["English", "French", "Spanish"],
          description: "Interface and content language"
        },
        {
          label: "Units",
          type: "select",
          value: preferences.units,
          options: ["Metric", "Imperial"],
          description: "Temperature, distance measurements"
        },
        {
          label: "Dark Mode",
          type: "switch",
          value: preferences.darkMode,
          description: "Use dark theme for better nighttime viewing",
          onChange: (value: boolean) => setPreferences(prev => ({ ...prev, darkMode: value }))
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      items: [
        {
          label: "Location Services",
          type: "switch",
          value: true,
          description: "Allow location-based recommendations and services"
        },
        {
          label: "Data Sharing",
          type: "switch",
          value: false,
          description: "Share usage data to improve city services"
        },
        {
          label: "Biometric Login",
          type: "switch",
          value: true,
          description: "Use fingerprint or face ID for quick access"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle pt-20 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Settings</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Customize your AutoPilotGPT experience and manage your preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingSections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <Card 
                key={sectionIndex} 
                className="p-6 animate-slide-up"
                style={{ animationDelay: `${sectionIndex * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>

                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                      
                      <div className="ml-4">
                        {item.type === "switch" && (
                          <Switch
                            checked={item.value as boolean}
                            onCheckedChange={item.onChange}
                          />
                        )}
                        
                        {item.type === "input" && (
                          <Input
                            value={item.value as string}
                            onChange={(e) => item.onChange?.(e.target.value)}
                            className="w-48"
                            placeholder={item.label}
                          />
                        )}
                        
                        {item.type === "select" && (
                          <select className="w-32 p-2 border border-border rounded-lg bg-background">
                            {item.options?.map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300 cursor-pointer">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Update Location</h3>
            <p className="text-sm text-muted-foreground">Change your default area or neighborhood</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300 cursor-pointer">
            <Smartphone className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Mobile App</h3>
            <p className="text-sm text-muted-foreground">Download the official Brampton app</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300 cursor-pointer">
            <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Feedback</h3>
            <p className="text-sm text-muted-foreground">Help us improve your experience</p>
          </Card>
        </div>

        {/* About Section */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center gap-4">
            <Info className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">About AutoPilotGPT</h3>
              <p className="text-sm text-muted-foreground">
                Version 2.0.1 • Your intelligent Brampton assistant powered by AI
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-4 text-sm">
            <Button variant="link" className="p-0 h-auto">Privacy Policy</Button>
            <Button variant="link" className="p-0 h-auto">Terms of Service</Button>
            <Button variant="link" className="p-0 h-auto">Contact Support</Button>
            <Button variant="link" className="p-0 h-auto">Release Notes</Button>
          </div>
        </Card>

        {/* Save Button */}
        <div className="text-center mt-8">
          <Button size="lg" className="px-12">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;