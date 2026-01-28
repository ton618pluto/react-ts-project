import React, { FC, useEffect } from 'react'
import { QuestionRadioPropsType } from '@/types/questionTypes'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { OptionType } from '@/types/questionTypes'
import { nanoid } from 'nanoid'

const RadioPropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, value, options = [], onChange, isLocked } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options })
  }, [title, isVertical, value, options])

  function handleValuesChange() {
    if (onChange) {
      // form.setFieldsValue({ title, isVertical, value, options })
      const fieldsValue = form.getFieldsValue() as QuestionRadioPropsType
      const { options = [] } = fieldsValue

      // 检查：如果当前选中的值，在现有的 options 数组里不存在了，就把 value 重置
      const isExist = options.some(opt => opt.value === value)
      if (!isExist && value) {
        // 必须要value不为空时才重置
        fieldsValue.value = ''
      }
      // 删除之后text会变成undefined，需要过滤一下
      const idx = options.findIndex(opt => opt.text === undefined)
      if (idx !== -1 && options[idx].value === fieldsValue.value) {
        fieldsValue.value = ''
      }

      fieldsValue.options = options.filter(opt => opt.text !== undefined)

      // 新增的选项修改value
      options.forEach(opt => {
        if (!opt.value) {
          opt.value = nanoid()
        }
      })

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
