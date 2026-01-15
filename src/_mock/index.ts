import Mock from 'mockjs'

// mock一个接口
Mock.mock('/api/test', 'get', () => {
  return {
    errno: 0,
    data: {
      name: 'ton618',
    },
  }
})
