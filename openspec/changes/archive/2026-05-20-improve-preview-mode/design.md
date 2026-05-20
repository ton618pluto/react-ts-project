# improve-preview-mode Design

## Context

当前的预览模式切换体验不够明显，用户点击预览按钮后仅工具栏按钮变蓝色，视觉变化过于微妙。

## Decisions

### 1. 顶部横幅

预览模式时在画布上方显示横幅：

```tsx
<div className={styles['preview-banner']}>
  <span>您正在预览问卷</span>
  <Button type="link" onClick={togglePreview}>点击退出预览</Button>
</div>
```

**样式：**
- 背景色：`var(--color-primary)` 或警示色
- 文字白色，居中显示
- 固定在画布顶部，不随滚动

### 2. Message 提示

进入预览模式时显示提示：

```tsx
import { message } from 'antd'

function handlePreview() {
  message.info('已进入预览模式，点击右上角退出')
  dispatch(togglePreviewMode())
}
```

### 3. 画布样式变化

```scss
.canvas {
  // 编辑模式默认样式
  
  &.preview-mode {
    background-color: var(--color-bg-page); // 略变背景
    border: 2px dashed var(--color-primary); // 虚线边框区分
  }
}
```

### 4. 工具栏增强

```tsx
<Tooltip title={previewMode ? '退出预览' : '预览问卷'}>
  <Button 
    icon={<PlayCircleOutlined />}
    type={previewMode ? 'primary' : 'default'}
    onClick={handlePreview}
  >
    {previewMode ? '退出预览' : '预览'}
  </Button>
</Tooltip>
```

## Risks

- 横幅占位可能影响布局，需要确保 EditCanvas 区域正确处理
- message 提示每次进入都会显示，频繁切换可能干扰用户，可考虑加 `setTimeout` 防抖或一次性提示