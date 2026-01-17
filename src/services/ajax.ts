import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd' // 假设使用 antd
import { getToken } from '../utils/user-token'
export interface ResType<T = any> {
  errno: number
  data?: T
  msg?: string
}

export type AnyObjType = {
  [key: string]: any
}

class MyRequest {
  private instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    // 请求拦截器
    this.instance.interceptors.request.use(
      config => {
        const token = getToken()
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse): any => {
        // 强制断言响应数据结构
        const resData = (res.data || {}) as ResType
        const { errno, data, msg } = resData

        if (errno === 0) {
          return data // 直接返回业务数据，这里的data变为any类型了，因为ResType里的data是个泛型
        } else {
          if (msg) message.error(msg)
          // 使用 Promise.reject 抛出错误，触发 catch
          return Promise.reject(new Error(msg || 'Error'))
        }
      },
      error => {
        // 处理 HTTP 网络错误 (404, 500 等)
        const errMsg = error.response?.data?.msg || '网络繁忙，请稍后再试'
        message.error(errMsg)
        return Promise.reject(error)
      }
    )
  }

  // 封装泛型请求方法
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request<any, T>(config)
  }

  get<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get<any, T>(url, { params, ...config })
  }

  post<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post<any, T>(url, data, config)
  }

  // PUT 方法：通常用于完整更新资源
  // 参数顺序：URL -> Data -> Config
  put<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put<any, T>(url, data, config)
  }

  // PATCH 方法：通常用于局部更新资源
  // 参数顺序：URL -> Data -> Config
  patch<T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch<any, T>(url, data, config)
  }

  // DELETE 方法：通常用于删除资源
  // 参数顺序：URL -> Config (参数放在 config.params 里)
  delete<T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete<any, T>(url, { params, ...config })
  }
}

// 导出实例
const request = new MyRequest({
  // baseURL: '/api',
  timeout: 5 * 1000,
})

export default request
