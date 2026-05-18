import type { NamingResponse, NamingSuggestion } from "@/types/naming"

function toScore(value: unknown) {
  const n = typeof value === "number" ? value : Number(value)
  if (!Number.isFinite(n)) return 0
  return Math.max(1, Math.min(10, Math.round(n)))
}

function toSuggestion(value: unknown): NamingSuggestion | null {
  if (!value || typeof value !== "object") return null
  const v = value as Record<string, unknown>
  if (typeof v.name !== "string" || typeof v.reason !== "string") return null
  return { name: v.name, reason: v.reason, score: toScore(v.score) }
}

export function parseNamingResponse(text: string): NamingResponse {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim()

  const start = cleaned.indexOf("{")
  const end = cleaned.lastIndexOf("}")
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("AI 返回格式异常：未找到 JSON 对象")
  }

  const jsonText = cleaned.slice(start, end + 1)
  const parsed = JSON.parse(jsonText) as unknown

  if (!parsed || typeof parsed !== "object") {
    throw new Error("AI 返回格式异常：JSON 不是对象")
  }

  const obj = parsed as Record<string, unknown>

  const recommended = toSuggestion(obj.recommended)
  if (!recommended) {
    throw new Error("AI 返回格式异常：recommended 不合法")
  }

  const alternativesRaw = Array.isArray(obj.alternatives) ? obj.alternatives : []
  const alternatives = alternativesRaw
    .map(toSuggestion)
    .filter((v): v is NamingSuggestion => Boolean(v))

  const explanation = typeof obj.explanation === "string" ? obj.explanation : ""
  const warnings = Array.isArray(obj.warnings)
    ? obj.warnings.filter((w): w is string => typeof w === "string")
    : []

  return {
    recommended,
    alternatives,
    explanation,
    warnings,
  }
}

