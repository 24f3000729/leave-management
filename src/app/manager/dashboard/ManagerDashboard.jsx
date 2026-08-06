"use client"
import { useRouter } from "next/navigation";
import { Users, CalendarDays, Clock, CheckCircle2 } from "lucide-react";
import StatCard from "@/components/manager/StatCard";
import LeaveAnalyticsChart from "@/components/employee/LeaveAnalyticsChart";
import { TopHeader } from "@/components/manager/TopHeader";
import LeaveByTypeChart from "@/components/manager/LeaveByTypeChart";
import PendingApprovalsTable from "@/components/manager/PendingApprovalsTable";
import TodaysStatus from "@/components/manager/TodaysStatus";
import RecentActivities from "@/components/manager/RecentActivities";

export default function ManagerDashboard() {
  const navigate = useRouter();

  return (
    <>
      <div>
        <TopHeader />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 space-y-6 mx-auto mt-5" >
        <StatCard
          icon={Users}
          color="green"
          title="Total Staff"
          value={24}
          trendText="+2 from last month"
          trendType="up"
          onClick={() => navigate.push("/staff")}
        />
        <StatCard
          icon={CalendarDays}
          color="blue"
          title="Total Leaves"
          value={28}
          trendText="+8 from last month"
          trendType="up"
          onClick={() => navigate.push("/leaves")}
        />
        <StatCard
          icon={Clock}
          color="amber"
          title="Pending Approvals"
          value={5}
          trendText="Requires your action"
          trendType="action"
          onClick={() => navigate.push("/leaves/pending")}
        />
        <StatCard
          icon={CheckCircle2}
          color="purple"
          title="Approved Leaves"
          value={18}
          trendText="64% of total leaves"
          trendType="neutral"
          onClick={() => navigate.push("/leaves/approved")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-7">
        {/* Left Column - Leave Overview & Pending Approvals */}
        <div className="lg:col-span-2 space-y-6">
          <LeaveAnalyticsChart />
          <PendingApprovalsTable />
        </div>

        {/* Right Column - Leave by Type, Today's Status, Recent Activities */}
        <div className="lg:col-span-1 space-y-6">
          <LeaveByTypeChart />
          <TodaysStatus />
          <RecentActivities />
        </div>
      </div>
    </>

  );
}

