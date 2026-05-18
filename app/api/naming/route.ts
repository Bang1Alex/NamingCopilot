import { buildNamingPrompts } from "@/lib/prompt"
import { createChatCompletion } from "@/lib/openai"
import { parseNamingResponse } from "@/lib/parse-json"
import { namingStyleValues, namingTypeValues } from "@/lib/naming-options"
import type { NamingRequest } from "@/types/naming"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<NamingRequest> | null

    const type = body?.type
    const style = body?.style
    const description = typeof body?.description === "string" ? body.description.trim() : ""

    if (!type || !namingTypeValues.includes(type)) {
      return Response.json({ error: "命名类型不合法。" }, { status: 400 })
    }

    if (!style || !namingStyleValues.includes(style)) {
      return Response.json({ error: "技术风格不合法。" }, { status: 400 })
    }

    if (!description) {
      return Response.json({ error: "请输入需要命名的中文释义。" }, { status: 400 })
    }

    const input: NamingRequest = { type, style, description }
    const { system, user } = buildNamingPrompts(input)

    const raw = await createChatCompletion({ system, user })
    const parsed = parseNamingResponse(raw)

    const warnings = Array.from(new Set([...(parsed.warnings ?? [])]))
    if (parsed.alternatives.length < 3) {
      warnings.push("备选命名数量不足，建议重新生成一次。")
    }

    return Response.json({ ...parsed, warnings })
  } catch (err) {
    const message = err instanceof Error ? err.message : "生成失败，请稍后重试。"
    const isFormatError =
      typeof message === "string" &&
      (message.includes("AI 返回格式异常") ||
        message.includes("recommended") ||
        message.includes("JSON"))

    if (isFormatError) {
      return Response.json({ error: "AI 返回格式异常，请重新生成。" }, { status: 500 })
    }

    return Response.json({ error: message || "生成失败，请稍后重试。" }, { status: 500 })
  }
}

