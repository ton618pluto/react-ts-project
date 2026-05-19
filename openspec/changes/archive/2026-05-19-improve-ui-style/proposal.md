## Why

当前问卷平台的样式过于陈旧，缺乏统一的视觉规范。整体设计偏朴素，色彩单调，缺少层次感，用户体验不佳。需要进行一次系统性的样式迭代，升级为简约清新的现代风格，提升品牌辨识度和用户满意度。

## What Changes

- **全局样式**：移除过宽的 min-width 限制，定义统一的设计 token（配色、圆角、阴影、间距）
- **MainLayout**：Header 增加阴影层次感，Footer 样式优化
- **Home 首页**：去除过于"用力"的蓝色渐变，改为清新淡雅的白色/浅灰蓝背景
- **Login/Register**：表单增加卡片式设计，添加柔和阴影和圆角
- **Edit 编辑页**：三栏布局增加间距，面板改为圆角卡片，阴影轻柔化
- **QuestionCard 问卷卡片**：升级为白色卡片+阴影，取消灰暗背景
- **ManageLayout**：响应式宽度优化，适配不同屏幕

## Capabilities

### New Capabilities
- `design-system`: 定义全局设计规范（颜色、圆角、阴影、间距、字体），作为样式迭代的基础

### Modified Capabilities
<!-- 本次主要是样式迭代，不涉及功能需求变化 -->

## Impact

- 修改 `src/index.css` 全局样式
- 修改 `src/layouts/` 下 MainLayout、ManageLayout 的样式文件
- 修改 `src/pages/` 下各页面的样式文件（Home、Login、Register、Edit、QuestionList）
- 定义 CSS 变量体系，统一管理设计 token