import React, { FC } from 'react'
import { QuestionCheckboxStatPropsType } from '@/types/questionTypes'
import {
  BarChart,
  Bar,
  // Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from 'recharts'

const CheckboxStatComponent: FC<QuestionCheckboxStatPropsType> = (
  props: QuestionCheckboxStatPropsType
) => {
  const { stat } = props
  return (
    <div style={{ width: '400px', height: '400px' }}>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      {/* 写height="100%"有警告 */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={400}
          height={300}
          data={stat}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CheckboxStatComponent
