## 1. 类型定义更新

- [x] 1.1 `QuestionRadioPropsType` 增加 `jumpTo?: Record<string, number>` 字段

## 2. 编辑器属性栏 UI

- [x] 2.1 RadioPropComponent 选项列表每行增加跳题数量输入框
- [x] 2.2 InputNumber min=0，支持整数
- [x] 2.3 表单 onChange 时同步 jumpTo 数据到父组件

## 3. 答卷渲染层逻辑

- [x] 3.1 读取题目组件的 jumpTo 配置
- [x] 3.2 根据用户选择的选项值查 skipCount
- [x] 3.3 动态跳过 skipCount 数量的后续题目
- [x] 3.4 答卷提交时记录跳过的题目 ID

## 4. 验证

- [ ] 4.1 单选题选择不同选项验证跳过数量是否正确
- [ ] 4.2 跳过数量超出剩余题目时验证是否正常结束
- [ ] 4.3 截图确认 UI 显示正确