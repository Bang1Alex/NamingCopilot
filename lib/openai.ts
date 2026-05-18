import OpenAI from "openai"

function getOpenAIClient() {
  const apiKey = process.env.ARK_API_KEY
  if (!apiKey) {
    throw new Error("ARK_API_KEY 未配置")
  }

  return new OpenAI({
    apiKey,
    baseURL: process.env.ARK_BASE_URL ?? "https://ark.cn-beijing.volces.com/api/v3",
  })
}

function readMessageContent(
  content:
    | string
    | Array<{
        type?: string
        text?: string
      }>
    | null
    | undefined
) {
  if (typeof content === "string") {
    return content
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => (item?.type === "text" ? item.text ?? "" : ""))
      .join("")
      .trim()
  }

  return ""
}

export async function createChatCompletion(args: {
  system: string
  user: string
}) {
  const model =  process.env.ARK_MODEL
  if (!model) {
    throw new Error(JSON.stringify({ model }))
  }

  const openai = getOpenAIClient()
  const response = await openai.chat.completions.create({
    model,
    temperature: 0.2,
    messages: [
      { role: "system", content: args.system },
      { role: "user", content: args.user },
    ],
  })

  const content = readMessageContent(response.choices?.[0]?.message?.content)
  if (!content) {
    throw new Error("OpenAI 返回为空")
  }

  return content
}
