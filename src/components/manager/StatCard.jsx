import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const COLOR_MAP = {
  green: { bg: "bg-emerald-50", text: "text-emerald-600" },
  blue: { bg: "bg-blue-50", text: "text-blue-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-600" },
  purple: { bg: "bg-violet-50", text: "text-violet-600" },
};

export default function StatCard({
  icon: Icon,
  color = "blue",
  title,
  value,
  trendText,
  trendType = "neutral",
  onClick,
  href,
}) {
  const palette = COLOR_MAP[color] || COLOR_MAP.blue;

  const trendColor =
    trendType === "up"
      ? "text-emerald-600"
      : trendType === "action"
      ? "text-amber-600"
      : "text-muted-foreground";

  const handleClick = () => {
    if (onClick) return onClick();
    if (href) window.location.href = href;
  };

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 border-slate-200"
    >
      <CardContent className="p-5 flex items-start gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${palette.bg}`}>
          <Icon className={`w-5 h-5 ${palette.text}`} />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-2xl font-semibold text-slate-900 mt-0.5">{value}</p>
          {trendText && (
            <p className={`text-xs font-medium mt-1 flex items-center gap-1 ${trendColor}`}>
              {trendType === "up" && <ArrowUpRight className="w-3 h-3" />}
              {trendText}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}