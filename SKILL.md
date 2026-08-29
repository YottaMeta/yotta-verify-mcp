---
name: yotta-verify-mcp
description: 元信MCP（yotta-verify-mcp）—— 把元信（yotta-verify）装前安全扫描暴露为 stdio MCP server，提供 scan_skill（目录/包 → verdict+发现）、generate_badge（audited 徽章）、gate_check（CI 闸门）、get_report（JSON/Markdown 报告）四个 MCP 工具。触发：给 MCP 客户端配置元信MCP、把装前信任扫描接入智能体/工作流、调用上列 MCP 工具做扫描；或用户说 MCP元信/元信MCP/trust-mcp/scan-mcp 等。边界：本地离线静态扫描，不上传被测内容、不执行被测代码、不联网；结论需人工确认。
version: 0.1.0
license: MIT
---

# 元信MCP（yotta-verify-mcp）

把元信（yotta-verify）的装前安全扫描做成 **stdio MCP server**——装任何技能 / 插件 / MCP 服务器之前，
先拿到确定性 verdict。零依赖（Python 3.8+ 标准库），复用 yotta_verify.py 内核与 verify_rules.py
规则表（单源），本地离线静态扫描。

## 何时使用

- 用户要在 MCP 客户端里配置「元信 MCP」server，或问「怎么接元信 MCP」；
- 在智能体 / 工作流里调用 `scan_skill` / `generate_badge` / `gate_check` / `get_report`
  对某个技能、目录或 npm 包做装前信任扫描；
- 用户说 **MCP元信 / 元信MCP / trust-mcp / scan-mcp / 装前扫描** 等。

**Do NOT trigger**：只做确定性静态扫描与报告——不执行被测代码、扫描中不联网、不装包、
不修复、不做动态分析；目录扫描完全离线，npm 包扫描仅下载公开包到临时目录；最终结论由人类确认。

## 四个 MCP 工具

| 工具 | 说明 |
|---|---|
| `scan_skill` | 只读参数 `target`（目录 / .tgz / npm 包）。返回 verdict + 严重级统计 + 发现 |
| `generate_badge` | 生成 audited 徽章（本地 SVG + shields.io URL）。可带 `target` 自动 scan 取 verdict、或直接给 `verdict`，并可并入 `validate/vetter/audit/version/tests` |
| `gate_check` | CI 闸门。`target` + `max_severity`（默认 medium），返回 `pass/verdict/worst/code` |
| `get_report` | 生成报告。`target` + `format`（json/markdown）、可写 `out` |

## 使用流程

1. **配置**：在 MCP 客户端 `mcpServers` 加一项。`command=python` +
   `args=["<绝对路径>/scripts/yotta_verify_mcp.py"]`，或 `command=npx + args=["-y","@yottameta/yotta-verify-mcp"]`。
2. **确认**：初始化后应看到四个工具。对目标调用 `scan_skill`，或直接 `gate_check` / `get_report`。
3. **解读**：verdict（SAFE TO INSTALL / INSTALL WITH CAUTION / REVIEW REQUIRED / DO NOT INSTALL）
   是确定性静态结论；发现里 low/info（如 URL 类）属预期，需人工复核是否真风险。
4. **收尾自检**：给用户「一句话 verdict + 是否建议安装」；涉及「该装 / 不该装」的决策必须说明
   「这是扫描结论，请自行确认」。

## 边界与提示

- `generate_badge` 的 `version` 段**默认取扫描引擎（yotta-verify）版本**（如 0.1.1），不是 MCP 包版本；
  想显示别的版本传 `version`。
- 目录扫描完全离线；npm 包扫描仅下载公开包（临时目录，扫后删除），不上传被测内容。
- 只扫描用户**有权评估**的目标。

## 范围声明（Scope Guard）

元信 MCP 的作用域是**装前信任验证**：在安装 / 使用一个技能、插件或 MCP 服务器之前，
给出确定性静态扫描结论。它**不**做运行时沙箱、**不**做动态分析、**不**做渗透测试、
**不**修复目标——超出装前静态验证范围的事不做。

## 授权声明

- 本工具只对**用户有权检查的目标**做静态扫描：自有技能 / 包、已获授权评估的第三方技能与包。
- 扫描只读：不执行被测代码、扫描中不联网、不装包、不修改目标文件；输出报告仅供授权范围内的安全评估使用。
- 请勿对无权评估的目标使用；如目标来自他人分享，先确认你有权检查其内容。

## 法律 / 红线声明

- 本工具仅提供**确定性静态安全校验与报告**，不输出攻击 payload、不指导利用、不含双用途内容；
  检测规则与教学文档仅用于装前安全验证与安全教学。
- 使用本工具须遵守所在地法律与相关平台条款；对任何目标的使用责任由使用者自负。
- 与元阁安全家族一致：检测 / 扫描类规则与样例属固有属性，仅用于「让用户敢装」的信任验证，绝不用于攻击。

## 渐进披露

- 细节放 `references/`，按需读取，不要每次全读。
- `references/trust-checklist.md` — MCP 服务器 / 插件装前信任清单（来源可核 / 装前扫描 /
  权限声明核对 / 最低权限 / 审计留痕 / 定期复查）。
