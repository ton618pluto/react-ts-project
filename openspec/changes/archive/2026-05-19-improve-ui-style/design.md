## Context

问卷平台样式老化，缺乏统一设计规范。本次迭代目标是升级为"简约清新"风格，核心是建立一套设计 token 体系，在不改变功能的前提下优化视觉体验。

当前问题：
- 全局 min-width: 1500px 过宽，小屏体验差
- 色彩单调，只有蓝色渐变，无层次
- 卡片/面板缺少圆角和阴影，质感粗糙
- 间距不统一，布局松散
- Footer 太简陋

## Goals / Non-Goals

**Goals:**
- 定义 CSS 变量体系（颜色、圆角、阴影、间距），统一管理设计 token
- 所有页面保持一致的视觉语言
- 修复全屏宽高、响应式布局等体验问题
- 提升整体质感和品牌辨识度

**Non-Goals:**
- 不改变现有组件的功能逻辑
- 不重构代码结构，只改样式层
- 不引入新的 UI 框架或库
- 不涉及后端 API 变更

## Decisions

### 1. CSS 变量方案
**选择**：在 `:root` 定义全局 CSS 变量，替代散落在各 scss 文件中的硬编码值

**理由**：
- 便于统一管理和修改
- 主题切换（如未来做 dark mode）成本低
- antd 已经使用 CSS 变量机制，兼容性好

**变量定义**：
```css
:root {
  --color-primary: #1890ff;
  --color-success: #52c41a;
  --color-text: #262626;
  --color-text-secondary: #8c8c8c;
  --color-bg-page: #f7f9fc;
  --color-bg-card: #ffffff;
  --border-radius: 8px;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.12);
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
}
```

### 2. 色彩体系
**选择**：以浅灰蓝 `#f7f9fc` 为页面背景，白色为卡片背景，低饱和蓝 `#1890ff` 为主色，青色 `#36cfc9` 为点缀

**理由**：
- 浅灰蓝比纯白柔和，配合白色卡片层次分明
- 保留 antd 蓝作为主色，降低用户认知成本
- 青色点缀增加活力，但不破坏清新感

### 3. 圆角与阴影
**选择**：统一 8px 圆角，轻柔阴影 `0 2px 8px rgba(0,0,0,0.08)`

**理由**：
- 8px 是业界常见圆角值，舒适且不过度
- 阴影不宜过重，清新风格强调"轻"的感觉

### 4. 响应式策略
**选择**：
- 移除全局 min-width: 1500px
- ManageLayout 宽度从 1200px 改为 max-width: 1200px + auto margin

**理由**：
- 避免在小屏上出现横向滚动条
- max-width + margin auto 让大屏保持适中宽度，小屏自适应

### 5. 不引入 Tailwind / CSS-in-JS
**理由**：
- 改动范围是样式迭代，不需要改变技术栈
- 现有 scss 体系运行良好，只需优化变量使用方式

## Risks / Trade-offs

[风险] 部分页面依赖硬编码颜色值，改动可能遗漏
→ 缓解：通过 grep 搜索确认所有颜色值已迁移到 CSS 变量

[风险] antd 组件默认样式可能被覆盖
→ 缓解：CSS 变量仅用于自定义样式，antd Token 通过 ConfigProvider 覆盖

## Migration Plan

1. 先定义全局 CSS 变量到 `src/index.css`
2. 修改 MainLayout（Header/Footer）
3. 修改 Home 页面
4. 修改 Login/Register 页面
5. 修改 Edit 编辑页
6. 修改 QuestionCard 和 ManageLayout
7. 验证各页面在 1280px / 1920px 下的显示效果

每步完成后本地验证，确认无 regression 再进行下一步。

## Open Questions

- 是否需要处理 antd 主题定制？当前主要是自定义页面样式，antd 组件保持默认即可
- Footer 文案"小慕问卷 © 2026"是否需要更新为更现代的样式？