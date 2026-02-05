import React, { FC, useMemo } from 'react'
import {
  PieChart,
  Pie,
  // Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
// import { STAT_COLORS } from '../../../constants'
import { STAT_COLORS } from '@/constants'
import { QuestionRadioStatPropsType } from '@/types/questionTypes'

function format(n: number) {
  return (n * 100).toFixed(2) + '%'
}

const RadioStatComponent: FC<QuestionRadioStatPropsType> = (props: QuestionRadioStatPropsType) => {
  const { stat } = props

  //   count求和
  const sum = useMemo(() => {
    return stat.reduce((sum, item) => {
      return sum + item.count
    }, 0)
  }, [stat])

  // 2. 核心改进：将颜色（fill）直接注入数据，彻底解决 Cell 弃用问题
  const chartData = useMemo(() => {
    return stat.map((item, index) => ({
      ...item,
      // 循环取色，防止数据项超过颜色数组长度
      fill: STAT_COLORS[index % STAT_COLORS.length],
    }))
  }, [stat])

  return (
    <div style={{ width: '350px', height: '400px' }}>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="count"
            data={chartData}
            cx="50%" // x 轴的偏移
            cy="50%" // y 轴的偏移
            outerRadius={50} // 饼图的直径
            fill="#8884d8"
            label={({ payload, percent }) => {
              // 也可以直接利用 recharts 提供的 percent 属性，更精准
              const displayPercent = percent
                ? (percent * 100).toFixed(2) + '%'
                : format(payload.count / sum)
              return `${payload.name}: ${displayPercent}`
            }}
          >
            {/* {stat.map((i, index) => {
              return <Cell key={index} fill={STAT_COLORS[index]} />
            })} */}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RadioStatComponent
