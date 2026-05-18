"use client"

import * as React from "react"

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
        <div className="rounded-2xl border border-dashed border-zinc-300/70 bg-zinc-50 p-8 text-sm text-zinc-600 dark:border-zinc-800/70 dark:bg-zinc-950 dark:text-zinc-300">
          结果会显示在这里。建议输入尽量明确：动词 + 对象 / 业务名词 + 组件类型。
        </div>
      )}
    </div>
  )
}

