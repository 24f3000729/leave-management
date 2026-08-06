"use client";

import { Check, Clock, X, Laptop } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ACTIVITIES = [
  {
    id: 1,
    name: "Amit Kumar",
    actionText: "'s leave was approved",
    details: "Casual Leave • May 16 - May 17, 2025",
    time: "2 hours ago",
    icon: Check,
    colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    id: 2,
    name: "Priya Singh",
    actionText: " requested a leave",
    details: "Sick Leave • May 19 - May 20, 2025",
    time: "4 hours ago",
    icon: Clock,
    colorClass: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    id: 3,
    name: "Rahul Verma",
    actionText: "'s leave was approved",
    details: "Privilege Leave • May 14 - May 16, 2025",
    time: "1 day ago",
    icon: Check,
    colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    id: 4,
    name: "Neha Patel",
    actionText: "'s leave was rejected",
    details: "Casual Leave • May 10 - May 11, 2025",
    time: "2 days ago",
    icon: X,
    colorClass: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    id: 5,
    name: "Sandeep Yadav",
    actionText: " requested WFH",
    details: "Work From Home • May 19, 2025",
    time: "2 days ago",
    icon: Laptop,
    colorClass: "bg-blue-50 text-blue-600 border-blue-100",
  },
];

export default function RecentActivities() {
  return (
    <Card className="border-slate-100 shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold text-slate-800">
          Recent Leave Activities
        </CardTitle>
        <button className="text-xs font-semibold text-teal-600 hover:text-teal-700 hover:underline transition-colors cursor-pointer">
          View All
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        {ACTIVITIES.map((activity) => {
          const IconComponent = activity.icon;
          return (
            <div key={activity.id} className="flex items-start justify-between gap-3 group">
              <div className="flex items-start gap-3 min-w-0">
                {/* Circle Icon Indicator */}
                <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shrink-0 border ${activity.colorClass}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                {/* Activity Description */}
                <div className="min-w-0 leading-snug">
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">
                      {activity.name}
                    </span>
                    {activity.actionText}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {activity.details}
                  </p>
                </div>
              </div>
              {/* Relative Time */}
              <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap pt-0.5 shrink-0">
                {activity.time}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
