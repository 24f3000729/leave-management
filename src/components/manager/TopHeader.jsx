"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function TopHeader({ dateRange, onDateRangeChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full justify-between">
      <div>
        <h2 className="text-xl font-semibold">
          Welcome back 👋
        </h2>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-70 justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />

            {dateRange?.from
              ? `${format(dateRange.from, "dd MMM yyyy")} - ${format(
                  dateRange.to,
                  "dd MMM yyyy"
                )}`
              : "Select Date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0 animate-fade-in z-50">
          <Calendar
            mode="range"
            defaultMonth={dateRange.from}
            selected={dateRange}
            numberOfMonths={2}
            onSelect={(range) => {
              onDateRangeChange(range);

              if (range?.from && range?.to) {
                setOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}