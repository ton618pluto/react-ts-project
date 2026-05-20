# improve-preview-mode

## Why

当前问卷编辑器的预览模式切换体验不够明显。用户点击预览按钮后，仅工具栏按钮变蓝色，视觉变化过于微妙，导致用户不确定自己是否真的进入了预览模式。这会影响编辑效率，尤其是新手用户。

## What Changes

- **顶部横幅**：预览模式时显示可点击的提示横幅，点击可退出预览
- **Message 提示**：每次进入预览模式时显示 `message.info` 提示
- **画布样式**：预览模式时画布边框/背景色明显区别于编辑模式
- **工具栏增强**：预览按钮变为"退出预览"文字，按钮高亮

## Capabilities

### New Capabilities

- `preview-mode-improvements`: 增强问卷编辑器的预览模式体验，让用户清晰感知预览状态的进入和退出

## Impact

- 修改 `src/pages/question/Edit/EditCanvas.tsx` 及对应样式
- 修改 `src/pages/question/Edit/EditToolbar.tsx` 工具栏提示文字