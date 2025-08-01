import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Star, 
  Clock, 
  Phone,
  ExternalLink,
  Camera,
  Utensils,
  ShoppingBag,
  TreePine,
  Building
} from "lucide-react";

const Explore = () => {
  const { toast } = useToast();

  const handleDirections = (placeName: string) => {
    // Open Google Maps directions to the place
    const destination = encodeURIComponent(`${placeName}, Toronto, ON, Canada`);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(mapsUrl, '_blank');
    
    toast({
      title: "Opening Directions",
      description: `Navigating to ${placeName} in Google Maps...`,
    });
  };

  const handleDetails = (placeName: string) => {
    // Search for the place on Google
    const searchQuery = encodeURIComponent(`${placeName} Toronto GTA information hours reviews`);
    const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
    window.open(searchUrl, '_blank');
    
    toast({
      title: "Place Details",
      description: `Opening detailed information for ${placeName}...`,
    });
  };

  const handleQuickAction = (action: string) => {
    // Navigate to chat with pre-filled message
    const searchQuery = encodeURIComponent(`Find the best ${action.toLowerCase()} in the GTA`);
    window.location.href = `/?q=${searchQuery}`;
    
    toast({
      title: `${action} Search`,
      description: `Starting search for the best ${action.toLowerCase()} in the GTA...`,
    });
  };
  const categories = [
    { icon: Utensils, label: "Restaurants", count: 2800, color: "text-orange-500" },
    { icon: ShoppingBag, label: "Shopping", count: 850, color: "text-purple-500" },
    { icon: TreePine, label: "Parks", count: 180, color: "text-green-500" },
    { icon: Building, label: "Services", count: 450, color: "text-blue-500" },
  ];

  const featuredPlaces = [
    {
      id: 1,
      name: "CN Tower",
      category: "Attraction",
      rating: 4.9,
      distance: "Downtown Toronto",
      image: "🗼",
      description: "Iconic Toronto landmark with observation decks and dining",
      hours: "9:00 AM - 10:30 PM",
      phone: "(416) 868-6937"
    },
    {
      id: 2,
      name: "Square One Shopping Centre",
      category: "Shopping",
      rating: 4.5,
      distance: "Mississauga",
      image: "🛍️",
      description: "Ontario's largest shopping mall with 360+ stores",
      hours: "10:00 AM - 9:00 PM",
      phone: "(905) 270-3860"
    },
    {
      id: 3,
      name: "Casa Loma",
      category: "Historic Site",
      rating: 4.7,
      distance: "Toronto",
      image: "🏰",
      description: "Gothic Revival castle with beautiful gardens",
      hours: "9:30 AM - 5:00 PM",
      phone: "(416) 923-1171"
    },
    {
      id: 4,
      name: "Centre Island Beach",
      category: "Recreation",
      rating: 4.6,
      distance: "Toronto Islands",
      image: "🏖️",
      description: "Sandy beach with stunning city skyline views",
      hours: "Dawn to Dusk",
      phone: "(416) 392-8186"
    }
  ];

  const weatherInfo = {
    temperature: "22°C",
    condition: "Partly Cloudy",
    humidity: "65%",
    windSpeed: "12 km/h"
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pt-20 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Explore the <span className="bg-gradient-primary bg-clip-text text-transparent">GTA</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the best places, services, and attractions across the Greater Toronto Area
          </p>
        </div>

        {/* Weather Card */}
        <Card className="mb-8 p-6 bg-gradient-accent text-accent-foreground animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-1">Current Weather</h3>
              <p className="text-accent-foreground/80">Perfect day to explore the GTA!</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{weatherInfo.temperature}</div>
              <div className="text-sm">{weatherInfo.condition}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-accent-foreground/20">
            <div className="text-center">
              <div className="text-sm opacity-80">Humidity</div>
              <div className="font-semibold">{weatherInfo.humidity}</div>
            </div>
            <div className="text-center">
              <div className="text-sm opacity-80">Wind</div>
              <div className="font-semibold">{weatherInfo.windSpeed}</div>
            </div>
            <div className="text-center">
              <div className="text-sm opacity-80">UV Index</div>
              <div className="font-semibold">5 (Moderate)</div>
            </div>
            <div className="text-center">
              <div className="text-sm opacity-80">Air Quality</div>
              <div className="font-semibold">Good</div>
            </div>
          </div>
        </Card>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index} 
                className="p-6 text-center hover:shadow-elegant transition-all duration-300 cursor-pointer hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className={`h-8 w-8 mx-auto mb-3 ${category.color}`} />
                <h3 className="font-semibold mb-1">{category.label}</h3>
                <p className="text-sm text-muted-foreground">{category.count} places</p>
              </Card>
            );
          })}
        </div>

        {/* Featured Places */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Featured Places</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPlaces.map((place, index) => (
              <Card 
                key={place.id} 
                className="overflow-hidden hover:shadow-elegant transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{place.image}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{place.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{place.category}</span>
                          <span>•</span>
                          <span>{place.distance}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 text-yellow-600 fill-current" />
                      <span className="text-xs font-medium text-yellow-600">{place.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{place.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{place.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{place.phone}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDirections(place.name)}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Directions
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDetails(place.name)}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Explore Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col gap-2"
              onClick={() => handleQuickAction("Photo Spots")}
            >
              <Camera className="h-6 w-6" />
              <span className="text-sm">Photo Spots</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col gap-2"
              onClick={() => handleQuickAction("Best Eats")}
            >
              <Utensils className="h-6 w-6" />
              <span className="text-sm">Best Eats</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col gap-2"
              onClick={() => handleQuickAction("Nature Trails")}
            >
              <TreePine className="h-6 w-6" />
              <span className="text-sm">Nature Trails</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col gap-2"
              onClick={() => handleQuickAction("GTA Services")}
            >
              <Building className="h-6 w-6" />
              <span className="text-sm">GTA Services</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Explore;