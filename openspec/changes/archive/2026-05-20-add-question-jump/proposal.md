# add-question-jump

## Why

当前的问卷编辑器仅支持静态题目排序，用户填答时所有题目按顺序展示，无法实现"根据作答跳过某些题目"的条件逻辑。添加跳题功能可以显著提升问卷的智能程度，支持筛选题等常见场景，增强用户体验。

## What Changes

- 新增单选组件的选项级跳题配置：每个选项可设置"跳过 N 题"
- 在右侧属性栏的选项编辑区，每个选项后面增加跳题数量输入框
- 答题页读取跳题配置，动态跳过指定数量的后续题目
- 跳过的题目在答卷中记录为"跳过"状态，不影响其他已答题目

## Capabilities

### New Capabilities

- `question-jump`: 单选题选项级跳题逻辑。用户选择某个选项后，自动跳过接下来指定数量的题目。
  - 选项可设置跳过数量（整数，默认为 0）
  - 多选项分别独立设置跳过数量
  - 渲染层根据选择动态计算哪些题目需要跳过
  - 答卷数据中标记跳过的题目 ID

### Modified Capabilities

- 无

## Impact

- **types/questionTypes.ts**: `QuestionRadioPropsType` 增加 `jumpTo: Record<string, number>` 字段
- **components/questionComponents/QuestionRadio/RadioPropComponent.tsx**: 选项列表 UI 增加跳题数量输入
- **pages/question/Stat/PageStat.tsx**: 答题页渲染层需要处理跳题逻辑