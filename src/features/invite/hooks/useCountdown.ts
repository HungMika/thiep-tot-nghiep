"use client"

import { useState, useEffect } from "react"
import { EVENT } from "../constants"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function calcTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    isPast: false,
  }
}

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(EVENT.datetime))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(EVENT.datetime)), 1000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}
