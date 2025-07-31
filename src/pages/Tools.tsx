import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bus,
  Calculator,
  FileText,
  CreditCard,
  Calendar,
  MapPin,
  Phone,
  Clock,
  AlertCircle,
  ExternalLink,
  Search,
  Zap
} from "lucide-react";

const Tools = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const toolCategories = [
    {
      title: "Transit & Transportation",
      color: "text-blue-500",
      tools: [
        {
          icon: Bus,
          name: "Transit Tracker",
          description: "Real-time bus arrivals and route planning",
          action: "Track Buses",
          link: "#"
        },
        {
          icon: MapPin,
          name: "Parking Finder",
          description: "Find and pay for parking in downtown Brampton",
          action: "Find Parking",
          link: "#"
        },
      ]
    },
    {
      title: "City Services",
      color: "text-green-500",
      tools: [
        {
          icon: FileText,
          name: "Permits & Licenses",
          description: "Apply for building permits, business licenses",
          action: "Apply Now",
          link: "#"
        },
        {
          icon: CreditCard,
          name: "Pay Property Taxes",
          description: "View and pay your property tax bills online",
          action: "Pay Taxes",
          link: "#"
        },
        {
          icon: Calendar,
          name: "Book Services",
          description: "Schedule waste pickup, pool bookings, more",
          action: "Book Now",
          link: "#"
        },
      ]
    },
    {
      title: "Utilities & Calculators",
      color: "text-purple-500",
      tools: [
        {
          icon: Calculator,
          name: "Tax Calculator",
          description: "Calculate property taxes and fees",
          action: "Calculate",
          link: "#"
        },
        {
          icon: Zap,
          name: "Utility Bills",
          description: "View and pay electricity, water, gas bills",
          action: "View Bills",
          link: "#"
        },
      ]
    },
    {
      title: "Emergency & Contacts",
      color: "text-red-500",
      tools: [
        {
          icon: AlertCircle,
          name: "Report Issues",
          description: "Report potholes, broken streetlights, more",
          action: "Report",
          link: "#"
        },
        {
          icon: Phone,
          name: "Emergency Contacts",
          description: "Important city and emergency numbers",
          action: "View Contacts",
          link: "#"
        },
      ]
    }
  ];

  const quickServices = [
    {
      name: "Brampton Transit",
      hours: "5:00 AM - 1:00 AM",
      phone: "(905) 874-2999",
      status: "Running normally"
    },
    {
      name: "City Hall",
      hours: "8:30 AM - 4:30 PM",
      phone: "(905) 874-2000",
      status: "Open"
    },
    {
      name: "Recreation Services",
      hours: "6:00 AM - 11:00 PM",
      phone: "(905) 874-2804",
      status: "Open"
    },
    {
      name: "311 Service",
      hours: "24/7",
      phone: "311",
      status: "Available"
    }
  ];

  const filteredTools = toolCategories.map(category => ({
    ...category,
    tools: category.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.tools.length > 0);

  return (
    <div className="min-h-screen bg-gradient-subtle pt-20 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            City <span className="bg-gradient-primary bg-clip-text text-transparent">Tools</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access Brampton's digital services, utilities, and helpful tools all in one place
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 animate-slide-up">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools and services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Service Status */}
        <Card className="mb-8 p-6 animate-slide-up">
          <h3 className="text-xl font-semibold mb-4">Service Status</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickServices.map((service, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{service.name}</h4>
                  <div className={`w-2 h-2 rounded-full ${
                    service.status === "Open" || service.status === "Available" || service.status === "Running normally"
                      ? "bg-green-500" 
                      : "bg-yellow-500"
                  }`} />
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{service.hours}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span>{service.phone}</span>
                  </div>
                  <div className="text-green-600 font-medium">{service.status}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tools by Category */}
        <div className="space-y-8">
          {filteredTools.map((category, categoryIndex) => (
            <div key={categoryIndex} className="animate-slide-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-1 h-6 bg-gradient-to-b ${
                  category.color === "text-blue-500" ? "from-blue-400 to-blue-600" :
                  category.color === "text-green-500" ? "from-green-400 to-green-600" :
                  category.color === "text-purple-500" ? "from-purple-400 to-purple-600" :
                  "from-red-400 to-red-600"
                } rounded-full`} />
                <h2 className="text-xl font-bold">{category.title}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tools.map((tool, toolIndex) => {
                  const Icon = tool.icon;
                  return (
                    <Card 
                      key={toolIndex} 
                      className="p-6 hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${
                          category.color === "text-blue-500" ? "from-blue-100 to-blue-200" :
                          category.color === "text-green-500" ? "from-green-100 to-green-200" :
                          category.color === "text-purple-500" ? "from-purple-100 to-purple-200" :
                          "from-red-100 to-red-200"
                        }`}>
                          <Icon className={`h-6 w-6 ${category.color}`} />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{tool.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                          
                          <Button variant="outline" size="sm" className="w-full">
                            {tool.action}
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {searchQuery && filteredTools.length === 0 && (
          <Card className="p-8 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tools found</h3>
            <p className="text-muted-foreground">
              Try searching for something else or clear your search to see all tools.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          </Card>
        )}

        {/* Emergency Banner */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
          <div className="flex items-center gap-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="font-semibold text-red-800">Emergency Services</h3>
              <p className="text-sm text-red-600">
                For emergencies, call 911. For non-emergency police, call (905) 453-2121
              </p>
            </div>
            <Button variant="destructive" size="sm" className="ml-auto">
              Emergency Info
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Tools;