"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Clock, User, Mail, Building, MessageSquare, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// Dynamic import for calendar to avoid SSR issues
const Calendar = React.lazy(() => import("@/components/ui/calendar").then((module) => ({ default: module.Calendar })))

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
]

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })
  const [isMounted, setIsMounted] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const webhookData = {
        date: selectedDate?.toISOString().split("T")[0],
        time: selectedTime,
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: formData.message,
        timestamp: new Date().toISOString(),
      }

      const response = await fetch("https://hook.eu2.make.com/m2m55kc9gr1pt52ettvqwcs2q6521m65", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      })

      if (response.ok) {
        console.log("Booking submitted successfully:", webhookData)
        // Reset form
        setFormData({ name: "", email: "", company: "", phone: "", message: "" })
        setSelectedDate(new Date())
        setSelectedTime("")
        onClose()
      } else {
        console.error("Failed to submit booking")
      }
    } catch (error) {
      console.error("Error submitting booking:", error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white mb-2">{t("booking.title")}</DialogTitle>
          <p className="text-gray-300">{t("booking.subtitle")}</p>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Calendar Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="w-5 h-5 text-emerald-500" />
                <Label className="text-white font-medium">{t("booking.selectDate")}</Label>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                {isMounted ? (
                  <React.Suspense
                    fallback={
                      <div className="animate-pulse">
                        <div className="h-8 bg-gray-700 rounded mb-4"></div>
                        <div className="grid grid-cols-7 gap-1">
                          {Array.from({ length: 42 }).map((_, i) => (
                            <div key={i} className="h-9 bg-gray-700 rounded"></div>
                          ))}
                        </div>
                      </div>
                    }
                  >
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                      className="text-white w-full"
                    />
                  </React.Suspense>
                ) : (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-700 rounded mb-4"></div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 42 }).map((_, i) => (
                        <div key={i} className="h-9 bg-gray-700 rounded"></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-emerald-500" />
                <Label className="text-white font-medium">{t("booking.selectTime")}</Label>
              </div>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                  <SelectValue placeholder={t("booking.chooseTime")} />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time} className="text-white hover:bg-gray-800">
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-emerald-500" />
                <Label htmlFor="name" className="text-white font-medium">
                  {t("booking.fullName")}
                </Label>
              </div>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
                placeholder={t("booking.enterName")}
                required
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-emerald-500" />
                <Label htmlFor="email" className="text-white font-medium">
                  {t("booking.email")}
                </Label>
              </div>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
                placeholder={t("booking.enterEmail")}
                required
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-5 h-5 text-emerald-500" />
                <Label htmlFor="company" className="text-white font-medium">
                  {t("booking.company")}
                </Label>
              </div>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
                placeholder={t("booking.enterCompany")}
                required
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-emerald-500" />
                <Label htmlFor="phone" className="text-white font-medium">
                  Phone Number
                </Label>
              </div>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-emerald-500" />
                <Label htmlFor="message" className="text-white font-medium">
                  {t("booking.message")}
                </Label>
              </div>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400 min-h-[100px]"
                placeholder={t("booking.messagePlaceholder")}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                {t("booking.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={
                  !selectedDate ||
                  !selectedTime ||
                  !formData.name ||
                  !formData.email ||
                  !formData.company ||
                  !formData.phone
                }
                className="flex-1 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white"
              >
                {t("booking.bookMeeting")}
              </Button>
            </div>
          </form>
        </div>

        {/* Meeting Details Summary */}
        {selectedDate && selectedTime && (
          <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <h4 className="text-emerald-400 font-medium mb-2">{t("booking.summary")}</h4>
            <p className="text-gray-300 text-sm">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at {selectedTime}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
