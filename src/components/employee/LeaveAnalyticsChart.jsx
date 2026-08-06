"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const data = [
    {
        date: "May 12",
        approved: 35,
        pending: 18,
        rejected: 8,
    },
    {
        date: "May 13",
        approved: 58,
        pending: 28,
        rejected: 12,
    },
    {
        date: "May 14",
        approved: 62,
        pending: 30,
        rejected: 10,
    },
    {
        date: "May 15",
        approved: 48,
        pending: 22,
        rejected: 9,
    },
    {
        date: "May 16",
        approved: 55,
        pending: 25,
        rejected: 11,
    },
    {
        date: "May 17",
        approved: 75,
        pending: 18,
        rejected: 8,
    },
    {
        date: "May 18",
        approved: 60,
        pending: 26,
        rejected: 12,
    },
    {
        date: "May 19",
        approved: 60,
        pending: 26,
        rejected: 12,
    },
    {
        date: "May 20",
        approved: 60,
        pending: 26,
        rejected: 12,
    },
    {
        date: "May 21",
        approved: 60,
        pending: 26,
        rejected: 12,
    },

];

export default function LeaveAnalyticsChart() {
    return (
        <Card className="border-none shadow-sm">
            <CardHeader>
                <CardTitle className="text-xl">
                    Leave Analytics
                </CardTitle>

                <CardDescription>
                    Approved, Pending and Rejected Leave Requests
                </CardDescription>
            </CardHeader>

            <CardContent>
                <ResponsiveContainer width="100%" height={340}>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="approvedGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#22c55e"
                                    stopOpacity={0.35}
                                />

                                <stop
                                    offset="95%"
                                    stopColor="#22c55e"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="4 4"
                            opacity={0.25}
                        />

                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="approved"
                            stroke="#22c55e"
                            fill="url(#approvedGradient)"
                            strokeWidth={3}
                        />

                        <Area
                            type="monotone"
                            dataKey="pending"
                            stroke="#f59e0b"
                            fill="transparent"
                            strokeWidth={3}
                        />

                        <Area
                            type="monotone"
                            dataKey="rejected"
                            stroke="#ef4444"
                            fill="transparent"
                            strokeWidth={3}
                        />
                            
                    </AreaChart>
                </ResponsiveContainer>

                <div className="mt-6 flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        <span className="text-sm text-muted-foreground">
                            Approved
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500" />
                        <span className="text-sm text-muted-foreground">
                            Pending
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <span className="text-sm text-muted-foreground">
                            Rejected
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}