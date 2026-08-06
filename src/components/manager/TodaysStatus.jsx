"use client";

import { UserCheck, UserMinus, Clock, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATUS_ITEMS = [
  {
    label: "Present",
    value: 16,
    icon: UserCheck,
    colorClass: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "On Leave",
    value: 5,
    icon: UserMinus,
    colorClass: "bg-amber-50 text-amber-600",
  },
  {
    label: "Half Day",
    value: 2,
    icon: Clock,
    colorClass: "bg-violet-50 text-violet-600",
  },
  {
    label: "Absent",
    value: 1,
    icon: UserX,
    colorClass: "bg-rose-50 text-rose-600",
  },
];

export default function TodaysStatus() {
  return (
    <Card className="border-slate-100 shadow-sm bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-800">
          Today's Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {STATUS_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-600">
                  {item.label}
                </span>
              </div>
              <span className="text-base font-bold text-slate-800">
                {item.value}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
