"use client";

import { MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";

const PENDING_DATA = [
  {
    id: 1,
    name: "Amit Kumar",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&fit=crop&q=80",
    leaveType: "Casual Leave",
    from: "May 20, 2025",
    to: "May 21, 2025",
    days: 2,
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&q=80",
    leaveType: "Sick Leave",
    from: "May 19, 2025",
    to: "May 20, 2025",
    days: 2,
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Backend Developer",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&fit=crop&q=80",
    leaveType: "Privilege Leave",
    from: "May 22, 2025",
    to: "May 24, 2025",
    days: 3,
  },
  {
    id: 4,
    name: "Neha Patel",
    role: "HR Executive",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&fit=crop&q=80",
    leaveType: "Casual Leave",
    from: "May 23, 2025",
    to: "May 23, 2025",
    days: 1,
  },
  {
    id: 5,
    name: "Sandeep Yadav",
    role: "QA Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80",
    leaveType: "Work From Home",
    from: "May 19, 2025",
    to: "May 19, 2025",
    days: 1,
  },
];

export default function PendingApprovalsTable() {
  return (
    <Card className="border-slate-100 shadow-sm bg-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold text-slate-800">
          Pending Approvals
        </CardTitle>
        <button className="text-xs font-semibold text-teal-600 hover:text-teal-700 hover:underline transition-colors cursor-pointer">
          View All
        </button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-3">Employee</th>
                <th className="px-4 py-3">Leave Type</th>
                <th className="px-4 py-3">From</th>
                <th className="px-4 py-3">To</th>
                <th className="px-4 py-3 text-center">Days</th>
                <th className="px-6 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PENDING_DATA.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/30 transition-colors">
                  {/* Employee cell */}
                  <td className="px-6 py-3.5 flex items-center gap-3">
                    <img
                      src={row.avatar}
                      alt={row.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 truncate leading-tight">
                        {row.name}
                      </p>
                      <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
                        {row.role}
                      </p>
                    </div>
                  </td>
                  {/* Leave Type cell */}
                  <td className="px-4 py-3.5 text-slate-600 font-medium">
                    {row.leaveType}
                  </td>
                  {/* From cell */}
                  <td className="px-4 py-3.5 text-slate-500 font-medium">
                    {row.from}
                  </td>
                  {/* To cell */}
                  <td className="px-4 py-3.5 text-slate-500 font-medium">
                    {row.to}
                  </td>
                  {/* Days cell */}
                  <td className="px-4 py-3.5">
                    <div className="flex justify-center">
                      <span className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center text-xs font-semibold">
                        {row.days}
                      </span>
                    </div>
                  </td>
                  {/* Actions cell */}
                  <td className="px-6 py-3.5 text-right">
                    <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100 cursor-pointer">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
