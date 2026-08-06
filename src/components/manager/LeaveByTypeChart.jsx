"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DATA = [
  { name: "Casual Leave", value: 12, percentage: "42.9%", color: "#10b981" },
  { name: "Sick Leave", value: 7, percentage: "25.0%", color: "#3b82f6" },
  { name: "Privilege Leave", value: 6, percentage: "21.4%", color: "#f59e0b" },
  { name: "Work From Home", value: 3, percentage: "10.7%", color: "#a855f7" },
];

export default function LeaveByTypeChart() {
  return (
    <Card className="border-slate-100 shadow-sm bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-800">
          Leave by Type
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
          {/* Pie Chart container */}
          <div className="relative w-[140px] h-[140px] flex items-center justify-center shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Content for Total */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-800">28</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Total</span>
            </div>
          </div>

          {/* Custom Legend */}
          <div className="flex-1 w-full space-y-2.5">
            {DATA.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between text-xs">
                <div className="flex items-start gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full mt-0.5 shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="min-w-0 leading-tight">
                    <p className="font-medium text-slate-700 truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400">
                      {item.value} ({item.percentage})
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800">Total:</span>
              <span className="font-bold text-slate-800">28</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
