# 更新日志

## v0.1.0 (2026-08-29)

初始发布：

- 定位：元信 MCP server —— 把元信（yotta-verify）装前安全扫描暴露为 stdio MCP 工具
  （scan_skill / generate_badge / gate_check / get_report），补 MCP / Agent Plugins 生态的
  「装前信任 / 校验 / 治理」缺口（市场主线 M2 全渠道分发一环）。
- 引擎：零依赖（Python 3.8+ 标准库）；复用 yotta-verify 内核（yotta_verify.py +
  verify_rules.py 规则表单源），不重复实现扫描逻辑，避免双实现漂移。
- 工具：① scan_skill（目录 / 包 → verdict + 发现）；② generate_badge（audited 徽章）；
  ③ gate_check（CI 闸门）；④ get_report（JSON / Markdown 报告）。
- 传输：stdio MCP（JSON-RPC 2.0，换行分隔），协议版本 2025-03-26。
- 边界：本地离线静态扫描；目录扫描完全离线；npm 包扫描仅下载公开包（不上传被测内容）；
  不执行被测代码；结论需人工确认。
- 形态：三个发布件（GitHub YottaMeta/yotta-verify-mcp + npm @yottameta/yotta-verify-mcp +
  ClawHub 元信 MCP）；0 元免费开源（MIT）。
- 测试：32 用例双版本（Python 3.8 / 3.13）全绿（含 stdio 端到端、恶意检测、错误入参）。
