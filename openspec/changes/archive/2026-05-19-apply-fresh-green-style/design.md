## Context

当前问卷平台使用蓝色主题色 (`#1890ff`)，视觉风格偏传统商务。需要切换为薄荷绿清新风格，匹配"轻量问卷"的产品定位。

现有 CSS 变量体系已建立在 `src/index.css` 的 `:root` 中，但 antd 组件使用硬编码颜色，需要通过 antd ConfigProvider 进行全局主题覆盖，并统一所有页面颜色。

## Goals / Non-Goals

**Goals:**
- 通过 `ConfigProvider` 配置 antd Design Token，覆盖组件默认蓝色
- 切换为更清新柔和的薄荷绿配色（不再刺眼）
- 统一页面背景、卡片、边框、文字颜色
- 所有页面色调协调一致

**Non-Goals:**
- 不改变阴影、圆角、间距等非颜色设计 token
- 不修改组件结构或布局
- 不修改业务逻辑代码

## Decisions

### 1. 实现方案：antd ConfigProvider + CSS Variables

**选择**：在 `App.tsx` 根组件使用 `ConfigProvider` + 在 `index.css` 定义完整 CSS 变量体系

```tsx
import { ConfigProvider } from 'antd'

<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#4ECDC4',
      colorSuccess: '#7ED6A4',
      colorBgPage: '#E8F8F5',
      colorText: '#2C5F52',
      colorTextSecondary: '#6B8E8A',
    },
  }}
>
  <App />
</ConfigProvider>
```

**理由**：
- antd 5.x 使用 CSS-in-JS 机制，ConfigProvider 会自动传递主题到所有 antd 组件
- CSS 变量用于自定义组件和覆盖 antd 未能覆盖的部分

### 2. 配色方案 - Mint Fresh Palette

| Token | 旧值 | 新值 | 说明 |
|-------|------|------|------|
| `colorPrimary` | `#1890ff` | `#4ECDC4` | 柔和薄荷绿，不再刺眼 |
| `colorSuccess` | `#52c41a` | `#7ED6A4` | 嫩绿 |
| `colorBgPage` | `#f7f7f7` | `#E8F8F5` | 暖调淡薄荷绿背景 |
| `colorText` | `#262626` | `#2C5F52` | 深青灰，柔和的深色 |
| `colorTextSecondary` | `#8c8c8c` | `#6B8E8A` | 中青灰 |
| CSS `--color-border` | (无) | `#B8D4D0` | 淡薄荷边框 |
| CSS `--color-gray` | `#f5f5f5` | `#E0EBE8` | 淡灰绿替代原灰色 |

**理由**：
- `#4ECDC4` 比 `#36cfc9` 更浅更清新，不会过于饱和刺眼
- `#E8F8F5` 比 `#f0fdf4` 更暖，与薄荷绿更协调
- `#2C5F52` 深青灰比 `#1a3a2a` 更柔和，不沉闷
- 淡灰绿 `#E0EBE8` 替代纯灰 `#f5f5f5`，与环境协调

### 3. 覆盖范围

通过 ConfigProvider + CSS Variable 覆盖：
- 所有 antd 组件（Button、Input、Select、Table、Tag 等）
- 页面背景色
- 卡片、面板背景色
- 边框色
- 文字颜色

## Risks / Trade-offs

[风险] 部分组件可能不读取 antd Token 或 CSS 变量
→ 缓解：通过逐个检查并补充覆盖