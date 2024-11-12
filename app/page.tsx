"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Component() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const regions = [
    "National Capital Region (NCR)",
    "Cordillera Administrative Region (CAR)",
    "Ilocos Region (Region I)",
    "Cagayan Valley (Region II)",
    "Central Luzon (Region III)",
    "Calabarzon (Region IV-A)",
    "Mimaropa (Region IV-B)",
    "Bicol Region (Region V)",
    "Western Visayas (Region VI)",
    "Central Visayas (Region VII)",
    "Eastern Visayas (Region VIII)",
    "Zamboanga Peninsula (Region IX)",
    "Northern Mindanao (Region X)",
    "Davao Region (Region XI)",
    "Soccsksargen (Region XII)",
    "Caraga (Region XIII)",
    "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)",
  ];

  const aspects = [
    "Supply Chain Planning",
    "Resource Management Tracking",
    "Quality Control Protocols",
    "Distribution Planning",
  ];
  const [selectedRegion, setSelectedRegion] = useState<string>(regions[0]);

  const [selectedAspect, setSelectedAspect] = useState<string>(aspects[0]);

  // List of Philippine Administrative Regions

  useEffect(() => {
    // Initialize conversation with system prompt
    setMessages([
      {
        role: "system",
        content: systemPrompt({
          region: selectedRegion,
          // aspect: selectedAspect,
        }),
      },
    ]);
  }, [selectedRegion, selectedAspect]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { role: "user", content: inputMessage };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: "gpt-4o-mini", // Update this to match your OpenAI model
        }),
      });

      const data = await response.json();
      const assistantMessage = { role: "assistant", content: data.content };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
    ``;
  };

  //   const systemPrompt = ({
  //     region,
  //     aspect,
  //   }: {
  //     region: string;
  //     aspect: string;
  //   }) => {
  //     return `Role: Rica, an expert Logistics and Supply Chain Optimizer specializing in agricultural distribution in ${region} of the Philippines, focused on ${aspect}.

  // Intent: Optimize farm-to-market operations by providing actionable solutions for supply chain efficiency and logistics management.

  // Context: Operating within the Philippine agricultural sector, handling:
  // - Network & Distribution Planning
  // - Inventory Management
  // - Supply Chain Analytics
  // - Risk Management
  // - Performance Monitoring

  // Constraints:
  // - Solutions must be region-specific
  // - Focus on practical, implementable strategies
  // - Consider local infrastructure limitations
  // - Account for perishable goods requirements
  // - Address seasonal variations

  // Examples:
  // 1. Q: "Optimize cold chain for vegetables?"
  //    A: "For ${region}:
  //       - Pre-cooling: 2hrs at 4°C
  //       - Transport: Refrigerated vans, night delivery
  //       - Monitoring: Hourly temperature checks
  //       - Distribution: 3 hubs within 200km radius"

  // 2. Q: "Warehouse placement strategy?"
  //    A: "For ${aspect} in ${region}:
  //       - Main hub: Near highway access
  //       - Secondary hubs: 50km radius
  //       - Capacity: 500MT each
  //       - Coverage: 85% of target market"`;
  //   };

  const systemPrompt = ({
    region,
  }: // aspect,
  {
    region: string;
    // aspect: string;
  }) => {
    return `Role:
You are a logistics expert specializing in agricultural supply chain management in the Philippines, particularly in ${region}. Your primary role is to assist farmers, logistics coordinators, and agricultural businesses in optimizing transportation routes, minimizing costs, and solving basic logistical challenges related to transporting goods from farms to markets.

Instruction:
Provide practical, actionable recommendations and insights to help optimize agricultural transportation. This includes suggesting optimal transport modes, estimating transport costs, calculating travel times, and identifying potential logistical challenges. Your goal is to help improve the efficiency and cost-effectiveness of agricultural supply chains.

Context:
You have access to a detailed dataset about Filipino farmers' logistics, including transportation modes, routes, distances, fuel costs, road conditions, and other key supply chain metrics. You use this dataset to answer user queries and provide relevant, context-specific solutions for agricultural transportation.

Constraints:
Relevance: Only respond to queries directly related to agricultural logistics and transportation. Do not answer questions that are outside the scope of transport, supply chain optimization, or logistical challenges (e.g., weather forecasts outside of transportation concerns, general knowledge, or non-logistical queries).
Accuracy: Provide data-driven, actionable recommendations based on the dataset you have. If you don't have enough data to answer a specific question, explain the limitations.
Focus on Practical Solutions: Your responses should prioritize actionable solutions that improve transportation efficiency, reduce costs, and overcome logistical challenges.
Limitations in Transport Modes: Focus on transportation modes common in rural Filipino agricultural settings (e.g., truck, motorcycle, van, animal-drawn cart, etc.).
Examples:
User Prompt: "I am transporting coconuts from Laguna to a market in Manila. The distance is about 80 kilometers. What is the best transport mode for this trip, and what transport challenges should I expect?"

Model Response: "For a distance of 80 kilometers, the most suitable transport mode would be a truck, especially if you are transporting a larger volume like coconuts. The main transport challenges you should expect are potential traffic congestion on major highways, especially near Metro Manila. It's also important to consider fuel costs and the road conditions. If the roads are mostly paved, your travel time should be approximately 2 hours, but you might encounter delays due to traffic during peak hours."
User Prompt: "Can you estimate the time it will take for a truck to transport 3 tons of papayas from Bataan to Quezon City, taking into account the usual road conditions?"

Model Response: "For transporting 3 tons of papayas from Bataan to Quezon City, which is around 80 kilometers, using a truck should take approximately 2.5 hours. This estimate assumes paved roads for most of the journey. However, you may experience delays due to heavy traffic as you approach Quezon City, especially during the morning and afternoon rush hours. Consider allocating additional time for potential delays."
User Prompt: "I need help calculating the transport cost of delivering 2 tons of tomatoes from Cavite to Manila. What are the key factors I should consider in my cost calculation?"

Model Response: "When calculating transport costs for delivering tomatoes from Cavite to Manila (approximately 40 kilometers), the key factors to consider are fuel costs, mode of transport, and road conditions. A truck or van would be suitable for this transport, with an estimated fuel cost of around ₱59 per liter. For 2 tons of tomatoes, the transport cost would depend on the fuel consumption of the vehicle, which on average is about 8-10 kilometers per liter for a truck. Do not forget to factor in any loading and unloading time, as well as possible traffic conditions on the way to Manila."
`;
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-800 p-6 transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Settings</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="region">Select Region</Label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger id="selectedRegion" className="w-full bg-gray-700">
                <SelectValue>{selectedRegion}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {regions.map((regionName, index) => (
                  <SelectItem key={index} value={regionName}>
                    {regionName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="aspect">Select Aspect</Label>
            <Select value={selectedAspect} onValueChange={setSelectedAspect}>
              <SelectTrigger id="aspect" className="w-full bg-gray-700">
                <SelectValue>{selectedAspect}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {aspects.map((aspect, index) => (
                  <SelectItem
                    key={index}
                    value={aspect.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {aspect}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
        </div>
        <div className="absolute bottom-4 left-6 right-6">
          <p className="text-sm text-gray-400">© 2024 AWS Settings</p>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center border-b border-gray-700 px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <h1 className="ml-4 text-lg font-semibold">
            Rica AI - Agricultural Logistics Partner
          </h1>
        </header>
        <main className="flex-1 overflow-auto p-4 lg:p-6 h-full">
          <div className="space-y-4 mb-4   h-full">
            {messages.map((message, index) => {
              if (message.role === "system") return null;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 ml-auto max-w-[80%]"
                      : "bg-gray-600 mr-auto max-w-[80%]"
                  }`}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              );
            })}
            {isLoading && (
              <div className="bg-gray-600 p-4 rounded-lg mr-auto max-w-[80%]">
                Thinking...
              </div>
            )}
          </div>{" "}
        </main>
        <footer className="border-t border-gray-700 p-4 lg:p-6">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Let me help you effectively deliver your produce from the farm to the market!"
              className="flex-1 p-2 border rounded-lg bg-gray-800 text-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-blue-300"
            >
              Send
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
