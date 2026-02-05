import React, { FC, useEffect, useState } from 'react'
import { Typography } from 'antd'
// import PieDemo from './PieDemo'
// import BarDemo from './BarDemo'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getComponentStatService } from '@/services/stat'
import { StatType } from '@/types/questionTypes'
import { getComponentConfByType } from '@/components/questionComponents'

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const { Title } = Typography

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props
  const [stat, setStat] = useState<StatType[] | []>([])
  const { id = '' } = useParams()
  const { run } = useRequest(
    async (questionId: string, componentId: string) =>
      await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        const { stat } = res
        setStat(stat)
      },
    }
  )

  useEffect(() => {
    if (selectedComponentId) {
      run(id, selectedComponentId)
    }
  }, [id, selectedComponentId])

  function getStatElem() {
    if (!selectedComponentId) {
      return <div>未选中组件</div>
    } else {
      const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
      if (StatComponent) {
        return <StatComponent stat={stat}></StatComponent>
      } else {
        return <div>该组件无统计信息</div>
      }
      // return <div>{JSON.stringify(stat)}</div>
    }
  }

  return (
    <>
      <Title level={3}>图表统计</Title>
      {/* <div style={{ width: '400px', height: '400px' }}> */}
      <div>
        {/* <PieDemo></PieDemo> */}
        {/* <BarDemo></BarDemo> */}
        {getStatElem()}
      </div>
    </>
  )
}

export default ChartStat
