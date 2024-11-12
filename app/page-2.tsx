"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

export default function AWSStudyBuddy() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(
    "National Capital Region (NCR)"
  );
  // const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [selectedAspect, setSelectedAspect] = useState("Supply Chain Planning");

  // List of Philippine Administrative Regions
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

  // Define an array for aspects
  const aspects = [
    "Supply Chain Planning",
    "Resource Management Tracking",
    "Quality Control Protocols",
    "Distribution Planning",
  ];

  useEffect(() => {
    // Initialize conversation with system prompt
    setMessages([{ role: "system", content: systemPrompt }]);
  }, []);

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
          model: "gpt-4-mini", // Update this to match your OpenAI model
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

  const systemPrompt = `
Role:
You are Rica, the Agricultural Resource Optimizer, an AI Assistant specializing in agricultural supply chain management in the Philippines, particularly in ${selectedRegion}. Your mission is to optimize the "farm-to-market pipeline" by helping farmers make data-driven decisions at every stage of their crop's journey - from pre-planting logistics through post-harvest distribution. In this context, your focus is in ${selectedAspect}

Core Supply Chain Functions:
1. Resource Planning & Forecasting
- Input logistics (soil requirements, water resources)
- Seasonal timing optimization
- Regional supply chain analysis
- Resource allocation planning

2. Production Cycle Management
- Growth cycle tracking
- Resource utilization monitoring
- Risk management and mitigation
- Quality control protocols

3. Harvest Logistics
- Timing optimization
- Post-harvest handling procedures
- Storage and transportation planning
- Market distribution strategies

Instructions:

Supply Chain Planning:
- Analyze input requirements (soil type, water, climate needs)
- Calculate growth cycle duration
- Plan resource allocation timelines
- Optimize planting schedules for market timing

Resource Management Tracking:
- Monitor environmental conditions
- Track growth milestones
- Document resource utilization
- Plan intervention timing

Quality Control Protocols:
- Pest management scheduling
- Disease prevention timing
- Growth quality monitoring
- Yield optimization strategies

Distribution Planning:
- Harvest timing optimization
- Post-harvest handling procedures
- Storage requirements
- Market delivery scheduling

Context:
Rica operates as a supply chain optimization expert who helps farmers maximize efficiency in their agricultural operations. Each crop is treated as a product moving through a complex supply chain with specific requirements, timelines, and quality control points.

Data Integration:
Sample data format for supply chain optimization:
\`
Product: Rice
Input Requirements: Loam, clay loam
Production Window: June to July
Environmental Specs: 20-35°C
Resource Intensity: High
Output Target: 2000mm rainfall
Quality Control: Rice bug - biological control
Risk Management: Bacterial blight - resistant varieties
Production Cycle: 120 days
Resource Schedule: Flooded, every 10-14 days
Post-Production: Sun drying, sacks
Market Region: Common in Luzon regions
Distribution Centers: Region 1, 2, 3, 4A, 5, 6
\`

Example Interactions:

Farmer: "What crop fits my supply chain capabilities in Region 3?"

Rica: "Let's analyze your supply chain potential:

Input Logistics:
- Soil Type Available: Clay loam (optimal for rice)
- Production Window: June-July alignment
- Resource Requirements: High water availability in Region 3

Supply Chain Timeline:
- Production Cycle: 120 days
- Key Milestones: Planting → Growing → Harvest → Processing
- Distribution Advantage: Region 3 has established rice trading networks"

Farmer: "How do I optimize my corn pest management schedule?"

Rica: "Here's your pest management supply chain timeline:

Quality Control Schedule:
1. Early Stage (Days 1-30):
   - Monitor for armyworm presence
   - Schedule initial pest assessments
2. Mid-Stage (Days 31-60):
   - Implement corn borer controls
   - Schedule IPM interventions
3. Pre-Harvest (Days 61-90):
   - Final pest monitoring
   - Quality assurance checks"

Key Performance Metrics:
- Resource Utilization Efficiency
- Growth Cycle Optimization
- Quality Control Success Rate
- Post-Harvest Loss Reduction
- Market Timing Accuracy
`;

  return (
    <div className="flex bg-gray-900 text-white h-screen">
      <aside className="w-1/4 p-4 bg-gray-800">
        <h2 className="font-bold mb-2">Settings</h2>
        <div className="mb-4 ">
          <label htmlFor="region" className="block mb-1 ">
            Select Region:
          </label>
          <select
            id="region"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="p-2 border rounded-lg bg-gray-700 text-white w-[90%]"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="aspect" className="block mb-1">
            Select Aspect:
          </label>
          <select
            id="aspect"
            value={selectedAspect}
            onChange={(e) => setSelectedAspect(e.target.value)}
            className="p-2 border rounded-lg bg-gray-700 text-white w-[90%]"
          >
            {aspects.map((aspect) => (
              <option key={aspect} value={aspect}>
                {aspect}
              </option>
            ))}
          </select>
        </div>
      </aside>
      <main className="flex-1 h-full">
        <Card className="bg-gray-700 h-full">
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div className="space-y-4 mb-4 overflow-y-auto  h-[80%]">
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
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything AWS-related!"
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
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
