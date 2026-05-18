"use client"

import * as React from "react"

import { Sparkles } from "lucide-react"
import type { NamingRequest, NamingResponse, NamingStyle, NamingType } from "@/types/naming"
import { NamingForm } from "@/components/NamingForm"
import { NamingResult } from "@/components/NamingResult"

export function NamingTool() {
  const [type, setType] = React.useState<NamingType>("variable")
  const [style, setStyle] = React.useState<NamingStyle>("frontend")
  const [description, setDescription] = React.useState("")
  const [result, setResult] = React.useState<NamingResponse | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function onGenerate() {
    const desc = description.trim()
    if (!desc) {
      setError("请输入需要命名的中文释义。")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const payload: NamingRequest = { type, style, description: desc }
      const res = await fetch("/api/naming", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = (await res.json()) as NamingResponse | { error?: string }
      if (!res.ok) {
        setResult(null)
        setError((data as { error?: string })?.error || "生成失败，请稍后重试。")
        return
      }

      setResult(data as NamingResponse)
    } catch {
      setResult(null)
      setError("网络错误，请检查连接后重试。")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <NamingForm
        type={type}
        style={style}
        description={description}
        onTypeChange={setType}
        onStyleChange={setStyle}
        onDescriptionChange={setDescription}
        onGenerate={onGenerate}
        loading={loading}
        error={error}
      />

      {result ? (
        <NamingResult result={result} />
      ) : (
        <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50/50 px-8 py-16 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="mb-4 rounded-full bg-zinc-100 p-3 dark:bg-zinc-800">
            <svg className="h-6 w-6 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="mb-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">暂无结果</h3>
          <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            请在左侧表单中输入上下文信息并点击生成，您的命名建议将显示在这里。
          </p>
        </div>
      )}
    </div>
  )
}

