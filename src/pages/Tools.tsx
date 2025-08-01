import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const handleToolAction = (toolName: string, action: string) => {
    // Route to real services based on tool type
    const serviceUrls: { [key: string]: string } = {
      "GTA Transit Hub": "https://www.ttc.ca/",
      "Smart Parking": "https://www.greenp.com/",
      "GTA Permits Hub": "https://www.toronto.ca/services-payments/permits-licences-bylaws/",
      "Property Tax Center": "https://www.toronto.ca/services-payments/property-taxes-utilities/",
      "Municipal Services": "https://www.toronto.ca/home/311-toronto-at-your-service/",
      "GTA Cost Calculator": "/?q=Calculate%20GTA%20costs%20taxes%20tolls",
      "Utility Manager": "https://www.torontohydro.com/",
      "Report Regional Issues": "https://www.toronto.ca/home/311-toronto-at-your-service/",
      "GTA Emergency Guide": "/?q=Emergency%20contacts%20GTA%20municipalities"
    };

    const url = serviceUrls[toolName];
    if (url) {
      if (url.startsWith('http')) {
        window.open(url, '_blank');
      } else {
        window.location.href = url;
      }
      
      toast({
        title: `${toolName}`,
        description: `Opening ${action.toLowerCase()} service...`,
      });
    } else {
      toast({
        title: `${toolName}`,
        description: `${action} feature in development. Redirecting to general info...`,
      });
      window.location.href = `/?q=${encodeURIComponent(toolName + " " + action)}`;
    }
  };

  const toolCategories = [
    {
      title: "Transit & Transportation",
      color: "text-blue-500",
      tools: [
        {
          icon: Bus,
          name: "GTA Transit Hub",
          description: "Real-time TTC, GO Transit, and local bus arrivals",
          action: "Track Transit",
          link: "#"
        },
        {
          icon: MapPin,
          name: "Smart Parking",
          description: "Find and pay for parking across Toronto, Mississauga, Brampton",
          action: "Find Parking",
          link: "#"
        },
      ]
    },
    {
      title: "Municipal Services",
      color: "text-green-500",
      tools: [
        {
          icon: FileText,
          name: "GTA Permits Hub",
          description: "Apply for permits across GTA municipalities",
          action: "Apply Now",
          link: "#"
        },
        {
          icon: CreditCard,
          name: "Property Tax Center",
          description: "View and pay property taxes for any GTA city",
          action: "Pay Taxes",
          link: "#"
        },
        {
          icon: Calendar,
          name: "Municipal Services",
          description: "Book services across Toronto, Mississauga, Brampton",
          action: "Book Services",
          link: "#"
        },
      ]
    },
    {
      title: "Utilities & Tools",
      color: "text-purple-500",
      tools: [
        {
          icon: Calculator,
          name: "GTA Cost Calculator",
          description: "Calculate taxes, tolls, and fees across the region",
          action: "Calculate",
          link: "#"
        },
        {
          icon: Zap,
          name: "Utility Manager",
          description: "Manage hydro, gas, and water bills region-wide",
          action: "Manage Bills",
          link: "#"
        },
      ]
    },
    {
      title: "Emergency & Support",
      color: "text-red-500",
      tools: [
        {
          icon: AlertCircle,
          name: "Report Regional Issues",
          description: "Report problems to the right municipality",
          action: "Report Issue",
          link: "#"
        },
        {
          icon: Phone,
          name: "GTA Emergency Guide",
          description: "All emergency and municipal contact numbers",
          action: "View Contacts",
          link: "#"
        },
      ]
    }
  ];

  const quickServices = [
    {
      name: "TTC Service",
      hours: "24/7 on main lines",
      phone: "(416) 393-4636",
      status: "Running normally"
    },
    {
      name: "GO Transit",
      hours: "5:00 AM - 1:30 AM",
      phone: "(888) 438-6646",
      status: "On schedule"
    },
    {
      name: "Toronto 311",
      hours: "24/7",
      phone: "311",
      status: "Available"
    },
    {
      name: "Peel Region 311",
      hours: "24/7",
      phone: "(905) 615-4311",
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
            GTA <span className="bg-gradient-primary bg-clip-text text-transparent">Tools</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access digital services, utilities, and helpful tools across the Greater Toronto Area
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
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleToolAction(tool.name, tool.action)}
                          >
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
            <Button 
              variant="destructive" 
              size="sm" 
              className="ml-auto"
              onClick={() => handleToolAction("Emergency Services", "View emergency information")}
            >
              Emergency Info
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Tools;