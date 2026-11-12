# rea/ui skill

让 AI 编程助手搜索 rea/ui 组件、读取真实 Props，并将完整的 **TSX + CSS** 文件复制到 React 项目。

[在线预览](https://sinofolks.github.io/rea-ui-site/) · [来源与许可](skills/rea-ui/assets/catalog/NOTICE.md)

## 安装

通过 [skills CLI](https://github.com/vercel-labs/skills) 安装（当前 CLI 需要 Node.js 22.20 或更新版本）：

```sh
npx skills add sinofolks/rea-ui-skill --skill rea-ui
```

在交互界面选择使用的编程助手。只安装到 Codex 的当前项目：

```sh
npx skills add sinofolks/rea-ui-skill --skill rea-ui --agent codex
```

安装后可这样请求：

> 使用 rea-ui，为我的 React 页面加入 AI Answer。先检查实际 Props，再复制完整 TSX 和独立 CSS，接入现有数据。

Codex 也可以用 `$rea-ui` 显式调用。该 skill 自带离线数据与 helper，无需连接 MCP 或访问维护者的私有仓库。

## 包含内容

| 分类 | 数量 |
| --- | ---: |
| Components | 90 |
| Screens | 35 |
| Blocks | 14 |
| Illustrations | 26 |
| Motion | 8 |

共 173 个目录条目、277 组完整 TSX/CSS 文件，包含可用的 default / clean 版本、实际 Props、使用示例和设计 tokens。部分资源是演示预览，不具有组件级可配置 Props；helper 会明确返回 API 是否可用。

## 直接使用 helper

helper 本身只需要 Node.js 20.6 或更新版本，没有 npm 依赖。将 `<skill-dir>` 替换为安装后的 `rea-ui` 目录：

```sh
node <skill-dir>/scripts/rea-ui.mjs search "AI Answer"
node <skill-dir>/scripts/rea-ui.mjs describe components/ai-answer
node <skill-dir>/scripts/rea-ui.mjs api components/ai-answer
node <skill-dir>/scripts/rea-ui.mjs usage components/ai-answer --raw
node <skill-dir>/scripts/rea-ui.mjs copy components/ai-answer --out ./src/components
```

`copy` 同时交付 TSX 和 CSS，已有同名文件会被保留并返回错误。复制后的组件需要 React 19 与支持 CSS import 的构建工具；依赖与远程图片地址可通过 `describe` 检查。默认使用本地文件，`--mode package` 仅适用于已经拥有维护者私有包的项目。

## 维护与验证

此仓库是由私有维护仓库生成的公开分发快照，不包含私有历史。更新通过新提交分发；已安装的技能可用 `npx skills update` 更新。

```sh
npm test
```

验证无需安装依赖：检查所有源文件的 SHA-256、目录完整性、Props、tokens，以及在临时项目中复制组件和保护已有文件的实际行为。

## 来源与许可

本项目为独立维护的分发版本。helper 和技能说明使用 [MIT 许可](LICENSE.helper.txt)；该许可不覆盖全部组件和资源。官方免费源文件的 MIT 声明单独保留；从公开浏览器预览重建的实现仍保留其上游权利与许可状态。完整说明见 [NOTICE](NOTICE.md) 与 [资产来源](skills/rea-ui/assets/catalog/NOTICE.md)。
