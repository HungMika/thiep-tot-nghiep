"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { checkHostExists } from "./actions"

interface HomeFormState {
  hostName: string
  error: string
  loading: boolean
}

export function useHomeForm() {
  const router = useRouter()
  const [state, setState] = useState<HomeFormState>({
    hostName: "",
    error: "",
    loading: false,
  })

  const setHostName = (value: string) => {
    setState((prev) => ({ ...prev, hostName: value, error: "" }))
  }

  const validate = (): boolean => {
    if (state.hostName.trim().length < 2) {
      setState((prev) => ({
        ...prev,
        error: "Vui lòng nhập hostName ít nhất 2 ký tự.",
      }))
      return false
    }
    return true
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setState((prev) => ({ ...prev, loading: true }))

    const exists = await checkHostExists(state.hostName.trim())
    if (!exists) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Không tìm thấy thông tin của bạn trong hệ thống.",
      }))
      return
    }

    router.push(`/${state.hostName.trim()}`)
  }

  return { ...state, setHostName, onSubmit }
}
