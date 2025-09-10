"use client";
import { useState } from "react";
import {
  Dumbbell,
  Activity,
  Send,
} from "lucide-react"; 

export const GymEqp = () => {
  const [selected, setSelected] = useState<string[]>([]);
 

  // Equipment with image + company brand
  const equipmentList: Record<
    string,
    { name: string; company: string; img: string }[]
  > = {
    "Upper Body": [
      { name: "Pull-up Bar", company: "Life Fitness", img: "/eq/pullup.jpg" },
      { name: "Shoulder Press Machine", company: "Technogym", img: "/eq/shoulderpress.jpg" },
      { name: "Dumbbells", company: "Decathlon", img: "/eq/dumbbells.jpg" },
    ],
    Chest: [
      { name: "Bench Press", company: "Hammer Strength", img: "/eq/benchpress.jpg" },
      { name: "Chest Fly Machine", company: "Cybex", img: "/eq/chestfly.jpg" },
      { name: "Push-up Handles", company: "Nike", img: "/eq/pushup.jpg" },
    ],
    Arms: [
      { name: "Bicep Curl Machine", company: "Technogym", img: "/eq/bicep.jpg" },
      { name: "Tricep Dip Bars", company: "Life Fitness", img: "/eq/tricep.jpg" },
      { name: "Resistance Bands", company: "Decathlon", img: "/eq/bands.jpg" },
    ],
    Back: [
      { name: "Lat Pulldown Machine", company: "Hammer Strength", img: "/eq/latpulldown.jpg" },
      { name: "Rowing Machine", company: "Concept2", img: "/eq/rower.jpg" },
      { name: "Deadlift Barbell", company: "Rogue", img: "/eq/barbell.jpg" },
    ],
    Legs: [
      { name: "Leg Press Machine", company: "Technogym", img: "/eq/legpress.jpg" },
      { name: "Squat Rack", company: "Rogue", img: "/eq/squat.jpg" },
      { name: "Leg Extension Machine", company: "Cybex", img: "/eq/legextension.jpg" },
    ],
  };

  const toggleSelect = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((eq) => eq !== item) : [...prev, item]
    );
  };

  const handleSend = () => {
    if (selected.length === 0) {
      toast({
        variant: "destructive",
        title: "⚠️ No Equipment Selected",
        description: "Please select at least one equipment before sending.",
      });
      return;
    }
    toast({
      title: "✅ Request Sent",
      description: "Your email has been sent successfully!",
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
    setSelected([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <Dumbbell className="h-8 w-8 text-purple-400" />
              Equipment Request
            </h1>
            <p className="text-gray-400">
              Select the equipment you need for your gym and submit a request
            </p>
          </div>
          <button
            onClick={handleSend}
            className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg flex items-center space-x-2 transition-colors text-white font-medium"
          >
            <Send className="h-5 w-5" />
            <span>Send Request</span>
          </button>
        </div>

        {/* Equipment Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(equipmentList).map(([category, items]) => (
            <div
              key={category}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  {category}
                  <Activity className="h-5 w-5 text-purple-400" />
                </h2>
                <span className="text-xs text-gray-400">
                  {items.length} items
                </span>
              </div>
              <div className="space-y-3">
                {items.map((item) => (
                  <label
                    key={item.name}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selected.includes(item.name)
                        ? "bg-purple-900/30 border border-purple-600"
                        : "bg-gray-700/40 border border-gray-600"
                    }`}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg border border-gray-600"
                    />
                    <div className="flex-1">
                      <span className="block text-white font-medium">
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {item.company}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={selected.includes(item.name)}
                      onChange={() => toggleSelect(item.name)}
                      className="w-5 h-5 accent-purple-600"
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GymEqp;