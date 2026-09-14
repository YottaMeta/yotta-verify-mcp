'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');

test('CLI --version 与 package.json / SKILL.md 一致', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const skill = fs.readFileSync(path.join(ROOT, 'SKILL.md'), 'utf8');
  const skillVersion = skill.match(/^version:\s*(\S+)$/m);
  assert.ok(skillVersion, 'SKILL.md 缺少 version');
  assert.strictEqual(skillVersion[1], pkg.version, 'SKILL.md 与 package.json 版本不一致');

  const bin = path.join(ROOT, 'bin', 'yotta-verify-mcp.js');
  const result = spawnSync(process.execPath, [bin, '--version'], { encoding: 'utf8', timeout: 10000 });
  assert.strictEqual(result.status, 0, result.stderr || result.stdout);
  assert.strictEqual(result.stdout.trim(), pkg.version, 'CLI --version 必须输出 MCP 包版本');
});
