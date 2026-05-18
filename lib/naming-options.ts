import type { NamingStyle, NamingType } from "@/types/naming"

export const namingTypes = [
  { label: "项目名", value: "project" },
  { label: "组件名", value: "component" },
  { label: "CSS 类名", value: "cssClass" },
  { label: "变量名", value: "variable" },
  { label: "方法名", value: "function" },
  { label: "类名", value: "class" },
  { label: "API 方法名", value: "api" },
  { label: "Hook / Composable", value: "hook" },
] as const satisfies ReadonlyArray<{ label: string; value: NamingType }>

export const namingStyles = [
  { label: "通用前端", value: "frontend" },
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Node.js", value: "node" },
  { label: "Java", value: "java" },
  { label: "Python", value: "python" },
  { label: "企业项目风格", value: "enterprise" },
  { label: "简洁风格", value: "concise" },
] as const satisfies ReadonlyArray<{ label: string; value: NamingStyle }>

export const namingTypeValues = namingTypes.map((t) => t.value)
export const namingStyleValues = namingStyles.map((s) => s.value)

