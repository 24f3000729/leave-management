"use client";

import { MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { differenceInDays, parseISO, format } from "date-fns";

export default function PendingApprovalsTable({ data = [] }) {
  const pendingLeaves = data.filter((l) => l.status === "Pending");

  const formatDate = (dateStr) => {
    try {
      return format(parseISO(dateStr), "MMM dd, yyyy");
    } catch {
      return dateStr;
    }
  };

  const getDays = (start, end) => {
    try {
      const days = differenceInDays(parseISO(end), parseISO(start)) + 1;
      return days;
    } catch {
      return 1;
    }
  };

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
              {pendingLeaves.length > 0 ? (
                pendingLeaves.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/30 transition-colors">
                    {/* Employee cell */}
                    <td className="px-6 py-3.5 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 object-cover shrink-0">
                        {row.employeeName ? row.employeeName.split(" ").map(n => n[0]).join("").slice(0, 2) : "EE"}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 truncate leading-tight">
                          {row.employeeName}
                        </p>
                        <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
                          Employee
                        </p>
                      </div>
                    </td>
                    {/* Leave Type cell */}
                    <td className="px-4 py-3.5 text-slate-600 font-medium">
                      {row.type}
                    </td>
                    {/* From cell */}
                    <td className="px-4 py-3.5 text-slate-500 font-medium">
                      {formatDate(row.startDate)}
                    </td>
                    {/* To cell */}
                    <td className="px-4 py-3.5 text-slate-500 font-medium">
                      {formatDate(row.endDate)}
                    </td>
                    {/* Days cell */}
                    <td className="px-4 py-3.5">
                      <div className="flex justify-center">
                        <span className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center text-xs font-semibold">
                          {getDays(row.startDate, row.endDate)}
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
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-slate-400 font-medium font-sans">
                    No pending approvals inside selected date range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
