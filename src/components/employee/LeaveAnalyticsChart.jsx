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

export default function LeaveAnalyticsChart({ data = [] }) {
    // If no dynamic data is loaded, fallback to basic mock representation
    const chartData = data.length > 0 ? data.map(item => ({
        date: item.date,
        approved: item.leaves, // map date-wise count to approved leaves chart line
        pending: Math.round(item.leaves * 0.3), // mock proportions for demonstration
        rejected: Math.round(item.leaves * 0.1),
    })) : [
        { date: "Aug 01", approved: 2, pending: 1, rejected: 0 },
        { date: "Aug 05", approved: 3, pending: 2, rejected: 1 },
    ];

    return (
        <Card className="border border-slate-100 shadow-sm bg-white">
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
                        data={chartData}
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