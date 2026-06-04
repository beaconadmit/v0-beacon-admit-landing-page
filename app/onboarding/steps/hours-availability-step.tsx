"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Clock } from "lucide-react";
import { useState } from "react";
import { FacilityConfig } from "../wizard";

const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

interface HoursAvailabilityStepProps {
  config: FacilityConfig;
  setConfig: (config: FacilityConfig) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function HoursAvailabilityStep({
  config,
  setConfig,
  onNext,
  onPrevious,
}: HoursAvailabilityStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAfterHoursToggle = (enabled: boolean) => {
    setConfig({
      ...config,
      hours_availability: {
        ...config.hours_availability,
        after_hours_enabled: enabled,
      },
    });
  };

  const handleSameDayToggle = (enabled: boolean) => {
    setConfig({
      ...config,
      hours_availability: {
        ...config.hours_availability,
        same_day_admission_available: enabled,
      },
    });
  };

  const handleBusinessHoursChange = (
    day: string,
    type: "open" | "close",
    value: string
  ) => {
    const currentHours = config.hours_availability.business_hours_by_day[day] || [];
    const newHours = [...currentHours];

    if (type === "open") {
      newHours[0] = value;
    } else {
      newHours[1] = value;
    }

    // If both times are empty, set to empty array (closed)
    const finalHours = newHours.filter((h) => h);
    setConfig({
      ...config,
      hours_availability: {
        ...config.hours_availability,
        business_hours_by_day: {
          ...config.hours_availability.business_hours_by_day,
          [day]: finalHours.length > 0 ? finalHours : [],
        },
      },
    });
  };

  const handleDayToggle = (day: string) => {
    const currentHours = config.hours_availability.business_hours_by_day[day];
    const isClosed = !currentHours || currentHours.length === 0;

    setConfig({
      ...config,
      hours_availability: {
        ...config.hours_availability,
        business_hours_by_day: {
          ...config.hours_availability.business_hours_by_day,
          [day]: isClosed ? ["08:00", "17:00"] : [],
        },
      },
    });
  };

  const applyToAllDays = (openTime: string, closeTime: string) => {
    const newHours: Record<string, string[]> = {};
    DAYS_OF_WEEK.forEach((day) => {
      if (
        config.hours_availability.business_hours_by_day[day] &&
        config.hours_availability.business_hours_by_day[day].length > 0
      ) {
        newHours[day] = [openTime, closeTime];
      } else {
        newHours[day] = [];
      }
    });

    setConfig({
      ...config,
      hours_availability: {
        ...config.hours_availability,
        business_hours_by_day: newHours,
      },
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Check if at least one day has hours set
    const hasAnyHours = DAYS_OF_WEEK.some(
      (day) =>
        config.hours_availability.business_hours_by_day[day] &&
        config.hours_availability.business_hours_by_day[day].length > 0
    );

    if (!hasAnyHours && config.hours_availability.after_hours_enabled) {
      newErrors.hours =
        "Please set business hours or disable after-hours mode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Please fix the errors below.</AlertDescription>
        </Alert>
      )}

      {/* After-Hours Mode */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">After-Hours Mode</h3>
            <p className="text-sm text-gray-600">
              Enable AI agent to handle calls outside business hours
            </p>
          </div>
          <Checkbox
            checked={config.hours_availability.after_hours_enabled}
            onCheckedChange={(checked) =>
              "handleAfterHoursToggle(checked as boolean)"
            }
          />
        </div>

        {config.hours_availability.after_hours_enabled && (
          <Alert className="mt-4">
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Your AI agent will automatically handle calls outside the business
              hours defined below. During business hours, calls can be transferred
              to your staff.
            </AlertDescription>
          </Alert>
        )}
      </Card>

      {/* Business Hours */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
          <p className="text-sm text-gray-600">
            Set your facility's operating hours. The AI agent will handle calls
            outside these hours.
          </p>
        </div>

        <div className="space-y-4">
          {/* Apply to all button */}
          <div className="flex items-center gap-2 mb-4">
            <Label className="text-sm">Quick fill:</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => applyToAllDays("08:00", "17:00")}
            >
              Apply 8am-5pm to all weekdays
            </Button>
          </div>

          {/* Days of week */}
          {DAYS_OF_WEEK.map((day) => {
            const hours =
              config.hours_availability.business_hours_by_day[day] || [];
            const isOpen = hours.length > 0;
            const dayLabel =
              day.charAt(0).toUpperCase() + day.slice(1);

            return (
              <div
                key={day}
                className="flex items-center gap-4 p-3 border rounded-lg"
              >
                <Checkbox
                  checked={isOpen}
                  onCheckedChange={() => handleDayToggle(day)}
                  className="mt-0.5"
                />
                <Label className="w-24 font-medium">{dayLabel}</Label>

                {isOpen ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      value={hours[0] || "08:00"}
                      onChange={(e) =>
                        handleBusinessHoursChange(day, "open", e.target.value)
                      }
                      className="w-32"
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="time"
                      value={hours[1] || "17:00"}
                      onChange={(e) =>
                        handleBusinessHoursChange(day, "close", e.target.value)
                      }
                      className="w-32"
                    />
                  </div>
                ) : (
                  <span className="text-gray-400 italic">Closed</span>
                )}
              </div>
            );
          })}
        </div>

        {errors.hours && (
          <p className="mt-4 text-sm text-red-500">{errors.hours}</p>
        )}
      </Card>

      {/* Same-Day Admission */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">
              Same-Day Admission Available
            </h3>
            <p className="text-sm text-gray-600">
              Can patients be admitted on the same day they call?
            </p>
          </div>
          <Checkbox
            checked={
              config.hours_availability.same_day_admission_available
            }
            onCheckedChange={(checked) =>
              "handleSameDayToggle(checked as boolean)"
            }
          />
        </div>
      </Card>

      {/* Preview */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Hours Preview</h4>
        <div className="space-y-1 text-sm text-blue-800">
          {DAYS_OF_WEEK.map((day) => {
            const hours =
              config.hours_availability.business_hours_by_day[day] || [];
            const dayLabel =
              day.charAt(0).toUpperCase() + day.slice(1);
            const displayHours =
              hours.length > 0
                ? `${hours[0]} - ${hours[1]}`
                : "Closed";

            return (
              <div key={day} className="flex justify-between">
                <span>{dayLabel}:</span>
                <span className="font-medium">{displayHours}</span>
              </div>
            );
          })}
          <div className="pt-2 mt-2 border-t border-blue-200">
            <span className="font-medium">After-Hours:</span>{" "}
            <span
              className={
                config.hours_availability.after_hours_enabled
                  ? "text-green-700"
                  : "text-gray-600"
              }
            >
              {config.hours_availability.after_hours_enabled
                ? "AI Agent Active"
                : "Disabled"}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
