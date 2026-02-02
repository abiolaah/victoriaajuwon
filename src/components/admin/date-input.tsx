import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, ChevronDown } from "lucide-react";

// Type definitions
interface DayObject {
  day: number;
  isCurrentMonth: boolean;
  isPrevMonth: boolean;
  date: Date;
}

interface CalendarPickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
  onClose: () => void;
  variant?: "default" | "monthYear";
}

interface DateInputProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  error?: string;
  variant?: "default" | "monthYear";
  icon?: React.ComponentType<{ className?: string }>;
  showIcon?: boolean;
}

const CalendarPicker = ({
  selectedDate,
  onDateChange,
  onClose,
  variant = "default", // 'default' or 'monthYear'
}: CalendarPickerProps) => {
  const [viewMode, setViewMode] = useState(
    variant === "monthYear" ? "months" : "days"
  );
  const [viewYear, setViewYear] = useState(
    (selectedDate || new Date()).getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    (selectedDate || new Date()).getMonth()
  );

  // Months string array
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Days of the week string array
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Get days in month for calendar grid
  const getDaysInMonth = (year: number, month: number): DayObject[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: DayObject[] = [];

    // Previous month's trailing days
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();

    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isPrevMonth: true,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        isPrevMonth: false,
        date: new Date(year, month, day),
      });
    }

    // Next month's leading days
    const remainingCells = 42 - days.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isPrevMonth: false,
        date: new Date(year, month + 1, day),
      });
    }

    return days;
  };

  // Day select function
  const handleDaySelect = (dayObj: DayObject): void => {
    onDateChange(dayObj.date);
    onClose();
  };

  // Month select function
  const handleMonthSelect = (monthIndex: number): void => {
    if (variant === "monthYear") {
      const newDate = new Date(viewYear, monthIndex, 1);
      onDateChange(newDate);
      onClose();
    } else {
      setViewMonth(monthIndex);
      setViewMode("days");
    }
  };

  // Year select function
  const handleYearSelect = (year: number): void => {
    setViewYear(year);
    setViewMode(variant === "monthYear" ? "months" : "days");
    if (variant !== "monthYear") {
      setViewMonth(0); // Reset to January when changing year in full calendar
    }
  };

  // Navigate Month
  const navigateMonth = (direction: number): void => {
    const newDate = new Date(viewYear, viewMonth + direction, 1);
    setViewYear(newDate.getFullYear());
    setViewMonth(newDate.getMonth());
  };

  // Navigate Year
  const navigateYear = (direction: number): void => {
    if (viewMode === "months" || viewMode === "days") {
      setViewYear((prev: number) => prev + direction);
    } else {
      const startYear = Math.floor(viewYear / 12) * 12;
      const newStartYear = startYear + direction * 12;
      setViewYear(newStartYear);
    }
  };

  // Get Year Range
  const getYearRange = (): number[] => {
    const startYear = Math.floor(viewYear / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => startYear + i);
  };

  // Get Header Text
  const getHeaderText = (): string => {
    if (viewMode === "years") {
      const startYear = Math.floor(viewYear / 12) * 12;
      return `${startYear} - ${startYear + 11}`;
    } else if (viewMode === "months") {
      return viewYear.toString();
    } else {
      return `${months[viewMonth]} ${viewYear}`;
    }
  };

  // Check if date is selected
  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return selectedDate.toDateString() === date.toDateString();
  };

  // Check date is today's date
  const isDateToday = (date: Date): boolean => {
    const today = new Date();
    return today.toDateString() === date.toDateString();
  };

  // Function to get days
  const days = viewMode === "days" ? getDaysInMonth(viewYear, viewMonth) : [];

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-black border rounded-lg shadow-lg z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <button
          type="button"
          onClick={() =>
            viewMode === "days" ? navigateMonth(-1) : navigateYear(-1)
          }
          className="p-1 hover:bg-gray-700 rounded-md transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className=" text-white h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => {
            if (viewMode === "days") {
              setViewMode("months");
            } else if (viewMode === "months") {
              setViewMode("years");
            } else {
              setViewMode(variant === "monthYear" ? "months" : "days");
            }
          }}
          className="text-sm text-white font-semibold hover:bg-gray-700 px-2 py-1 rounded-md transition-colors"
        >
          {getHeaderText()}
        </button>

        <button
          type="button"
          onClick={() =>
            viewMode === "days" ? navigateMonth(1) : navigateYear(1)
          }
          className="p-1 hover:bg-gray-700 rounded-md transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="text-white h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        {viewMode === "days" && (
          <>
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="p-2 text-xs font-medium text-gray-200 text-center"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((dayObj, index) => {
                const isSelected = isDateSelected(dayObj.date);
                const isToday = isDateToday(dayObj.date);

                return (
                  <button
                    type="button"
                    key={index}
                    onClick={() => handleDaySelect(dayObj)}
                    className={`
                      p-2 text-sm rounded-md transition-colors font-medium h-8 w-8 flex items-center justify-center
                      ${
                        isSelected
                          ? "bg-red-400 text-white"
                          : isToday
                            ? "bg-red-100 text-red-500 hover:bg-red-200"
                            : dayObj.isCurrentMonth
                              ? "text-gray-300 hover:bg-gray-100 hover:text-black"
                              : "text-gray-400 hover:bg-gray-50 hover:text-black"
                      }
                    `}
                  >
                    {dayObj.day}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {viewMode === "months" && (
          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => {
              const isSelected =
                variant === "monthYear"
                  ? selectedDate?.getMonth() === index &&
                    selectedDate?.getFullYear() === viewYear
                  : viewMonth === index;
              const isCurrentMonth =
                new Date().getMonth() === index &&
                new Date().getFullYear() === viewYear;

              return (
                <button
                  type="button"
                  key={month}
                  onClick={() => handleMonthSelect(index)}
                  className={`
                    p-2 text-sm rounded-md transition-colors font-medium
                    ${
                      isSelected
                        ? "bg-red-600 text-white"
                        : isCurrentMonth
                          ? "bg-red-600 text-gray-200 hover:bg-gray-200 hover:text-black"
                          : "text-gray-300 hover:bg-gray-100 hover:text-black"
                    }
                  `}
                >
                  {month.slice(0, 3)}
                </button>
              );
            })}
          </div>
        )}

        {viewMode === "years" && (
          <div className="grid grid-cols-3 gap-2">
            {getYearRange().map((year) => {
              const isSelected =
                variant === "monthYear"
                  ? selectedDate?.getFullYear() === year
                  : viewYear === year;
              const isCurrentYear = new Date().getFullYear() === year;

              return (
                <button
                  type="button"
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  className={`
                    p-2 text-sm rounded-md transition-colors font-medium
                    ${
                      isSelected
                        ? "bg-red-600 text-white"
                        : isCurrentYear
                          ? "bg-red-600 text-gray-200 hover:bg-gray-200 hover:text-black"
                          : "text-gray-300 hover:bg-gray-100 hover:text-black"
                    }
                  `}
                >
                  {year}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t flex justify-between">
        <button
          type="button"
          onClick={() => {
            const today = new Date();
            onDateChange(today);
            onClose();
          }}
          className="px-3 py-1 text-sm text-green-400 hover:bg-red-50 rounded-md transition-colors"
        >
          Present
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1 text-sm text-red-600 hover:bg-gray-700 rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const DateInput = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  variant = "default",
  icon: Icon = Calendar,
  showIcon,
}: DateInputProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  const formatDate = (date: Date | null): string => {
    if (!date) return "";

    if (variant === "monthYear") {
      return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="relative" ref={pickerRef}>
      <label className="block text-sm font-medium text-white mb-2">
        {showIcon && <Icon className="inline h-4 w-4 mr-1" />}
        {label}
      </label>
      <div
        onClick={() => setShowPicker(!showPicker)}
        className={`w-full px-3 py-2 border rounded-lg cursor-pointer bg-zinc-800/50 flex items-center justify-between transition-colors ${
          error ? "border-red-500" : "border-gray-300 hover:border-gray-400"
        } ${showPicker ? "ring-2 ring-blue-500 border-blue-500" : ""}`}
      >
        <span className={value ? "text-white" : "text-gray-300"}>
          {formatDate(value) || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-200 transition-transform ${
            showPicker ? "rotate-180" : ""
          }`}
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {showPicker && (
        <CalendarPicker
          selectedDate={value}
          onDateChange={onChange}
          onClose={() => setShowPicker(false)}
          variant={variant}
        />
      )}
    </div>
  );
};

export default DateInput;
