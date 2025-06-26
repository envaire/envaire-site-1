"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  className?: string
  showOutsideDays?: boolean
}

function Calendar({ className, selected, onSelect, disabled, showOutsideDays = true, ...props }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className={cn("p-3 w-full", className)}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 42 }).map((_, i) => (
              <div key={i} className="h-9 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const today = new Date()
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  // Get first day of month and how many days in month
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  // Get previous month's last days
  const prevMonth = new Date(year, month - 1, 0)
  const daysInPrevMonth = prevMonth.getDate()

  const days = []

  // Previous month's days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    const date = new Date(year, month - 1, day)
    days.push({
      date,
      isCurrentMonth: false,
      day: day.toString(),
    })
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    days.push({
      date,
      isCurrentMonth: true,
      day: day.toString(),
    })
  }

  // Next month's days
  const remainingDays = 42 - days.length
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day)
    days.push({
      date,
      isCurrentMonth: false,
      day: day.toString(),
    })
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const isSelected = (date: Date) => {
    if (!selected) return false
    return date.toDateString() === selected.toDateString()
  }

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  const isDisabled = (date: Date) => {
    return disabled ? disabled(date) : false
  }

  const handleDateClick = (date: Date) => {
    if (isDisabled(date)) return
    onSelect?.(date)
  }

  const monthNames = [
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
  ]

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  return (
    <div className={cn("p-3 w-full", className)}>
      {/* Header */}
      <div className="flex justify-center pt-1 relative items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-gray-800 border-gray-600 text-white p-0 opacity-70 hover:opacity-100 hover:bg-gray-700 absolute left-1",
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="text-sm font-medium text-white">
          {monthNames[month]} {year}
        </div>

        <button
          onClick={goToNextMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-gray-800 border-gray-600 text-white p-0 opacity-70 hover:opacity-100 hover:bg-gray-700 absolute right-1",
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-gray-400 text-center text-xs font-medium py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((dayObj, index) => {
          const { date, isCurrentMonth, day } = dayObj
          const selected = isSelected(date)
          const today = isToday(date)
          const disabled = isDisabled(date)

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={disabled}
              className={cn(
                "h-9 w-full p-0 font-normal text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500",
                // Base styles
                "hover:bg-gray-700 hover:text-white",
                // Current month vs outside days
                isCurrentMonth ? "text-white" : "text-gray-500 opacity-50",
                // Selected state
                selected && "bg-emerald-500 text-black hover:bg-emerald-600 hover:text-black font-medium",
                // Today state
                today && !selected && "bg-gray-700 text-white font-medium",
                // Disabled state
                disabled && "text-gray-600 opacity-30 cursor-not-allowed hover:bg-transparent hover:text-gray-600",
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
