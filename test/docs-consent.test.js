'use strict';
/**
 * 发布文档授权边界回归：元信MCP 不得要求 Agent 静默改宿主配置或写永久记忆。
 * 背景：SkillHub 2026-09-14 将 0.4.0 判为可疑——自动改 mcpServers + 强制写永久记忆。
 */
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DOC_FILES = ['SKILL.md', 'README.md', 'README.zh-CN.md'];

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function readCurrentChangelog() {
  const text = read('CHANGELOG.md');
  const start = text.indexOf('## ');
  const next = text.indexOf('\n## ', start + 1);
  return next < 0 ? text.slice(start) : text.slice(start, next);
}

const FORBIDDEN = [
  { re: /AI 自动接入|自动完成 MCP 配置|AI 自动完成配置/, hint: '不得要求 AI 自动改 MCP 配置' },
  { re: /自动写入[^\n]*mcpServers|自动写入下面/, hint: '写入 mcpServers 前必须先获得用户明确同意' },
  { re: /必须[^\n]*写入[^\n]*永久记忆|强制[^\n]*写入[^\n]*永久记忆/, hint: '不得强制写入永久记忆' },
  { re: /逐字原样写入|原样写入[^\n]*永久记忆/, hint: '不得要求逐字写入宿主记忆' },
  { re: /不写永久记忆|不做 = 本技能未生效|没写成功之前[^\n]*不得/, hint: '拒绝写入不得影响功能或被判未接入' },
  { re: /用户无需手动配置|无需手动写[^\n]*mcpServers|通常无需手动/, hint: '不得宣称用户无需手动配置' },
  { re: /自动调用[^\n]*scan_skill|自动调用[^\n]*gate_check/, hint: '调用扫描工具前必须获得用户确认' },
];

for (const file of [...DOC_FILES, 'CHANGELOG.md']) {
  test(`授权边界：${file} 不含自动写入 / 常驻授权表述`, () => {
    const text = file === 'CHANGELOG.md' ? readCurrentChangelog() : read(file);
    for (const { re, hint } of FORBIDDEN) {
      const match = text.match(re);
      assert.strictEqual(match, null, `${file} 命中「${match && match[0]}」：${hint}`);
    }
  });
}

test('SKILL.md 保留显式确认门（MCP 配置 / 永久记忆）', () => {
  const skill = read('SKILL.md');
  assert.match(skill, /必须先获得用户明确同意/, '缺少写入前明确同意要求');
  assert.match(skill, /未获同意前不写任何文件/, '缺少未同意不写文件的要求');
  assert.match(skill, /用户拒绝[^\n]*不写/, '缺少用户拒绝后的不写入路径');
  assert.match(skill, /功能不受影响/, '缺少拒绝不影响功能的降级说明');
  assert.match(skill, /写客户端配置前必须先获得用户明确同意/, '缺少 MCP 配置写入确认门');
});

test('SKILL.md 提供不写配置的 CLI 降级路径', () => {
  const skill = read('SKILL.md');
  assert.match(skill, /自动降级 CLI|直接使用 CLI/, '缺少不写配置时的 CLI 降级路径');
  assert.match(skill, /yotta_verify_mcp\.py/, '缺少本地 Python CLI 入口');
});
