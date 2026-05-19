## Why

当前问卷平台使用蓝色主题色，视觉风格较为传统。需要切换为薄荷绿清新风格，匹配"轻量问卷"的产品定位，让用户在创建和填写问卷时感受到清新、轻松的氛围。

## What Changes

- 更新 `src/index.css` 中的 CSS 变量配色方案
- 将主色从 `#1890ff` 改为 `#36cfc9` (薄荷绿)
- 将成功色从 `#52c41a` 改为 `#73d13d` (嫩绿)
- 将页面背景从 `#f7f9fc` 改为 `#f0fdf4` (极淡绿)
- 文字颜色调整为深绿灰以配合整体风格
- 所有使用 CSS 变量的组件将自动应用新配色

## Capabilities

### New Capabilities
- `color-system`: 定义薄荷绿清新配色体系，作为全局设计 token

### Modified Capabilities
- `design-system`: 扩展现有 design-system spec，更新配色方案为薄荷绿体系

## Impact

- 修改 `src/index.css` 中的 CSS 变量定义
- 所有使用 `--color-primary`、`--color-bg-page` 等变量的组件和页面自动生效
- 无需修改业务逻辑代码，纯视觉更新