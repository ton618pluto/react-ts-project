import React, { FC, useEffect } from 'react'
import { QuestionRadioPropsType } from '@/types/questionTypes'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { OptionType } from '@/types/questionTypes'
import { nanoid } from 'nanoid'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'

const RadioPropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, value, options = [], onChange, isLocked, jumpTo = {} } = props
  const [form] = Form.useForm()
  const { visibleComponnents, selectedId } = useGetComponentInfo()

  // 过滤掉当前组件，获取可选的跳转目标
  const jumpTargetOptions = visibleComponnents
    .filter(comp => comp.fe_id !== selectedId)
    .map(comp => ({
      value: comp.fe_id,
      label: comp.title || (comp.props && (comp.props as { text?: string }).text),
    }))

  // 同步表单值，确保 options 中的 jumpTo 被正确设置
  useEffect(() => {
    const formValues = form.getFieldsValue()
    // 重建 options，把 jumpTo 设置到每个选项中
    const syncedOptions = options.map((opt, idx) => ({
      ...opt,
      jumpTo: formValues.options?.[idx]?.jumpTo || opt.value ? jumpTo[opt.value] : undefined,
    }))
    form.setFieldsValue({ title, isVertical, value, options: syncedOptions })
  }, [title, isVertical, value, options, jumpTo])

  function handleValuesChange() {
    if (onChange) {
      const fieldsValue = form.getFieldsValue() as QuestionRadioPropsType
      const rawOptions = fieldsValue.options || []

      // 检查：如果当前选中的值，在现有的 options 数组里不存在了，就把 value 重置
      const validOptions = rawOptions.filter(opt => opt && opt.text !== undefined)
      const isExist = validOptions.some(opt => opt.value === value)
      if (!isExist && value) {
        fieldsValue.value = ''
      }

      // 过滤后的选项
      const filteredOptions = validOptions.filter(opt => opt.text !== undefined)

      // 重置 value 如果选中的选项已被删除
      const idx = filteredOptions.findIndex(opt => opt.text === undefined)
      if (idx !== -1 && filteredOptions[idx].value === fieldsValue.value) {
        fieldsValue.value = ''
      }

      // 构建新的选项和 jumpTo
      const newOptions: OptionType[] = []
      const newJumpTo: Record<string, string> = { ...jumpTo }

      rawOptions.forEach((opt: OptionType | Record<string, unknown>) => {
        if (!opt || (opt as OptionType).text === undefined) return

        const option = opt as OptionType
        if (!option.value) {
          option.value = nanoid()
        }
        newOptions.push({ value: option.value, text: option.text })

        // 直接从 option 对象读取 jumpTo
        const jumpToVal = (opt as Record<string, unknown>).jumpTo
        if (jumpToVal && typeof jumpToVal === 'string') {
          newJumpTo[option.value] = jumpToVal
        }
      })

      fieldsValue.options = newOptions
      fieldsValue.jumpTo = newJumpTo

      onChange(fieldsValue)
    }
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, isVertical, value, options }}
      disabled={isLocked}
      onValuesChange={handleValuesChange}
      validateTrigger="onBlur"
    >
      <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
        <Input></Input>
      </Form.Item>
      <Form.Item label="选项" name="options">
        <Form.List name="options">
          {(fields, { add, remove }) => {
            return (
              <>
                {/* 遍历所有的选项 */}
                {fields.map(({ key, name }) => {
                  return (
                    <Space key={key} align="baseline">
                      {/* // 当前选项，输入框 */}
                      <Form.Item
                        name={[name, 'text']}
                        rules={[
                          { required: true, message: '请输入选项文字' },
                          {
                            validator: (_, text) => {
                              const { opts = [] } = form.getFieldsValue()
                              let num = 0
                              opts.forEach((opt: OptionType) => {
                                if (opt.text === text) num++ // 纪录text相同的个数，预期只有一个，就是它自己
                              })
                              if (num === 1 || num === 0) {
                                return Promise.resolve()
                              } else {
                                return Promise.reject('选项重复了')
                              }
                            },
                          },
                        ]}
                      >
                        <Input placeholder="请输入选项文字..."></Input>
                      </Form.Item>
                      {/* 跳题配置 - 选择跳转目标 */}
                      <Select
                        placeholder="跳转至"
                        allowClear
                        style={{ width: 120 }}
                        options={jumpTargetOptions}
                        value={form.getFieldValue(['options', name, 'jumpTo'])}
                        onChange={val => {
                          const currentOptions = form.getFieldValue('options') || []
                          if (currentOptions[name]) {
                            currentOptions[name] = {
                              ...currentOptions[name],
                              jumpTo: val || undefined,
                            }
                            form.setFieldValue('options', currentOptions)
                          }
                          // 触发 handleValuesChange 保存到 Redux
                          handleValuesChange()
                        }}
                      />
                      {/* 当前选项，删除按钮 */}
                      {fields.length > 2 && <MinusCircleOutlined onClick={() => remove(name)} />}
                    </Space>
                  )
                })}
                <Form.Item>
                  <Button
                    type="link"
                    icon={<PlusOutlined />}
                    onClick={() => add({ text: `选项${fields.length + 1}`, value: '' })}
                    block
                  >
                    添加选项
                  </Button>
                </Form.Item>
              </>
            )
          }}
        </Form.List>
      </Form.Item>
      <Form.Item name="value" label="默认选中">
        <Select
          options={options.map(item => ({ value: item.value, label: item.text || '' }))}
        ></Select>
      </Form.Item>
      <Form.Item name={'isVertical'} valuePropName="checked">
        <Checkbox>垂直显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default RadioPropComponent
