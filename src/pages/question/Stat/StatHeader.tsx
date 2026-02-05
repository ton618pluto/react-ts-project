import React, { FC, useRef } from 'react'
import { Space, Button, Typography, message, Input, Tooltip, Popover, QRCode } from 'antd'
// import QRCode from 'qrcode.react'
import type { InputRef } from 'antd'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import styles from './StatHeader.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'

const { Title } = Typography
const StatHeader: FC = () => {
  const nav = useNavigate()
  const { title, isPublished } = useGetPageInfo()
  const { id } = useParams()
  const urlInputRef = useRef<InputRef | null>(null)

  // 复制url功能
  async function handleCopy() {
    const element = urlInputRef.current
    if (element) {
      element.select()
      // await navigator.clipboard.writeText(element.input?.value || '')
      document.execCommand('copy')
      message.success('复制链接成功')
    }
  }

  function getLinkAndQRCodeElem() {
    if (!isPublished) return null

    const url = 'http://localhost:8000/' + id

    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url}></QRCode>
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={handleCopy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}></Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{getLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
