"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Users, CalendarDays, Clock, CheckCircle2 } from "lucide-react";
import { format, addDays } from "date-fns";
import StatCard from "@/components/manager/StatCard";
import LeaveAnalyticsChart from "@/components/employee/LeaveAnalyticsChart";
import { TopHeader } from "@/components/manager/TopHeader";
import LeaveByTypeChart from "@/components/manager/LeaveByTypeChart";
import PendingApprovalsTable from "@/components/manager/PendingApprovalsTable";
import TodaysStatus from "@/components/manager/TodaysStatus";
import RecentActivities from "@/components/manager/RecentActivities";
import { API_BASE_URL } from "@/constants";

export default function ManagerDashboard() {
  const navigate = useRouter();

  // Date Range state initialized matching TopHeader defaults (January 12 to Feb 11, 2026/Current Year)
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), 7, 1), // Aug 01
    to: addDays(new Date(new Date().getFullYear(), 7, 1), 30), // Aug 31
  });

  const [stats, setStats] = useState({
    totalStaff: 0,
    activeStaff: 0,
    inactiveStaff: 0,
    onLeaveStaff: 0,
    totalLeavesInRange: 0,
    pendingApprovals: 0,
    approvedLeaves: 0,
    analytics: [],
    leaveByType: [],
    recentLeaves: [],
  });

  const [loading, setLoading] = useState(true);

  // Fetch stats when dateRange changes
  const fetchDashboardStats = async () => {
    if (!dateRange?.from || !dateRange?.to) return;
    setLoading(true);
    try {
      const fromStr = format(dateRange.from, "yyyy-MM-dd");
      const toStr = format(dateRange.to, "yyyy-MM-dd");
      
      const res = await fetch(
        `${API_BASE_URL}/manager/dashboard-stats?from=${fromStr}&to=${toStr}`
      );
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, [dateRange]);

  return (
    <>
      <div>
        <TopHeader dateRange={dateRange} onDateRangeChange={setDateRange} />
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 font-sans">Loading statistics...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 space-y-6 mx-auto mt-5" >
            <StatCard
              icon={Users}
              color="green"
              title="Total Staff"
              value={stats.totalStaff}
              trendText={`Active: ${stats.activeStaff}`}
              trendType="up"
              onClick={() => navigate.push("/manager/employees")}
            />
            <StatCard
              icon={CalendarDays}
              color="blue"
              title="Total Leaves"
              value={stats.totalLeavesInRange}
              trendText="Selected range total"
              trendType="neutral"
              onClick={() => navigate.push("/manager/leave-details")}
            />
            <StatCard
              icon={Clock}
              color="amber"
              title="Pending Approvals"
              value={stats.pendingApprovals}
              trendText="Requires action"
              trendType="action"
              onClick={() => navigate.push("/manager/leave-requests")}
            />
            <StatCard
              icon={CheckCircle2}
              color="purple"
              title="Approved Leaves"
              value={stats.approvedLeaves}
              trendText="In selected range"
              trendType="neutral"
              onClick={() => navigate.push("/manager/leave-details")}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-7">
            {/* Left Column - Leave Overview & Pending Approvals */}
            <div className="lg:col-span-2 space-y-6">
              <LeaveAnalyticsChart data={stats.analytics} />
              <PendingApprovalsTable data={stats.recentLeaves} />
            </div>

            {/* Right Column - Leave by Type, Today's Status, Recent Activities */}
            <div className="lg:col-span-1 space-y-6">
              <LeaveByTypeChart data={stats.leaveByType} />
              <TodaysStatus />
              <RecentActivities />
            </div>
          </div>
        </>
      )}
    </>
  );
}
