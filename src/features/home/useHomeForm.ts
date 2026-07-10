"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface HomeFormState {
  name: string
  error: string
  loading: boolean
}

export function useHomeForm() {
  const router = useRouter()
  const [state, setState] = useState<HomeFormState>({
    name: "",
    error: "",
    loading: false,
  })

  const setName = (value: string) => {
    setState((prev) => ({ ...prev, name: value, error: "" }))
  }

  const validate = (): boolean => {
    if (state.name.trim().length < 2) {
      setState((prev) => ({
        ...prev,
        error: "Vui lòng nhập họ và tên ít nhất 2 ký tự.",
      }))
      return false
    }
    return true
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setState((prev) => ({ ...prev, loading: true }))
    router.push(`/invite/${encodeURIComponent(state.name.trim())}`)
  }

  return { ...state, setName, onSubmit }
}
