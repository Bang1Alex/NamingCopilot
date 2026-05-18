import OpenAI from "openai"

/**
 * 创建并返回 OpenAI 客户端实例
 * 用于对接火山引擎 ARK 平台的大模型接口
 * @returns OpenAI 客户端实例
 * @throws 当未配置 ARK_API_KEY 时抛出异常
 */
function getOpenAIClient() {
  // 从环境变量获取 API Key
  const apiKey = process.env.ARK_API_KEY
  // 校验 API Key 是否存在
  if (!apiKey) {
    throw new Error("ARK_API_KEY 未配置")
  }

  // 初始化并返回 OpenAI 客户端（兼容火山引擎 ARK 接口）
  return new OpenAI({
    apiKey,
    // 自定义接口地址，未配置时使用默认火山引擎北京区地址
    baseURL: process.env.ARK_BASE_URL ?? "https://ark.cn-beijing.volces.com/api/v3",
  })
}

/**
 * 统一解析并提取消息内容
 * 兼容字符串、OpenAI 消息内容数组等多种格式
 * @param content - 消息内容（支持字符串、数组、null/undefined）
 * @returns 提取后的纯文本内容
 */
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
  // 如果内容是字符串，直接返回
  if (typeof content === "string") {
    return content
  }

  // 如果内容是数组（OpenAI 多模态内容格式）
  if (Array.isArray(content)) {
    return content
      // 只提取 type 为 text 的内容，拼接成纯文本
      .map((item) => (item?.type === "text" ? item.text ?? "" : ""))
      .join("")
      .trim()
  }

  // 其他情况（null/undefined）返回空字符串
  return ""
}

/**
 * 调用大模型创建对话补全
 * 传入系统提示词 + 用户问题，返回模型回答的纯文本
 * @param args - 包含 system（系统提示）和 user（用户问题）
 * @returns 模型返回的纯文本回答
 * @throws 缺少模型配置 / 模型返回为空 时抛出异常
 */
export async function createChatCompletion(args: {
  system: string
  user: string
}) {
  // 从环境变量获取模型名称
  const model = process.env.ARK_MODEL
  // 校验模型是否配置
  if (!model) {
    throw new Error(JSON.stringify({ model }))
  }

  // 获取 OpenAI 客户端
  const openai = getOpenAIClient()
  const startTime = Date.now()
  // 调用对话接口
  const response = await openai.chat.completions.create({
    model,
    temperature: 0.2, // 温度值越低，回答越确定、保守
    messages: [
      { role: "system", content: args.system }, // 系统角色：设定行为、规则
      { role: "user", content: args.user },    // 用户角色：提问内容
    ],
    // @ts-expect-error ARK supports `thinking`, but the current OpenAI SDK types do not.
    thinking: {
      type: "disabled",
    }
  })

  // 安全提取并解析返回内容
  const content = readMessageContent(response.choices?.[0]?.message?.content)

  // 校验返回内容是否为空
  if (!content) {
    throw new Error("OpenAI 返回为空")
  }
  console.log(`ARK 耗时：${Date.now() - startTime}ms`)
  // 返回最终纯文本回答
  return content
}
