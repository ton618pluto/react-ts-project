import React, { FC, useState } from 'react'
import { getQuestionStatListService } from '@/services/stat'
import { useRequest } from 'ahooks'
import { ListType } from '@/services/stat'
import { useParams } from 'react-router-dom'
import { Typography, Spin, Table, Pagination } from 'antd'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { STAT_PAGE_SIZE } from '@/constants'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const { Title } = Typography

const PageStat: FC<PropsType> = (props: PropsType) => {
  const { id = '' } = useParams()
  const [total, setTotal] = useState(0)
  const [list, setList] = useState<ListType | []>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)
  const { componentsList } = useGetComponentInfo()
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

  const columns = componentsList.map(c => {
    const { fe_id, title, props: componentProps, type } = c
    const colTitle =
      (componentProps as { text?: string })?.text ||
      (componentProps as { title?: string })?.title ||
      title

    return {
      title: (
        <div style={{ cursor: 'pointer' }}>
          <span
            style={{ color: fe_id === selectedComponentId ? 'var(--color-primary)' : 'inherit' }}
            onClick={() => {
              setSelectedComponentId(fe_id)
              setSelectedComponentType(type)
            }}
          >
            {colTitle}
          </span>
        </div>
      ), // 这个列对应的中文名称
      dataIndex: fe_id, // 这个列对应的name
    }
  })

  const TableElem = (
    <>
      <Table columns={columns} dataSource={list} pagination={false} rowKey={q => q._id}></Table>
      <div
        style={{
          marginTop: '25px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={page => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
        ></Pagination>
      </div>
    </>
  )

  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page: 1, pageSize: 10 })
      return res
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list } = res
        setTotal(total)
        setList(list)
      },
    }
  )
  return (
    <div>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin></Spin>
        </div>
      )}
      {!loading && TableElem}
    </div>
  )
}

export default PageStat
