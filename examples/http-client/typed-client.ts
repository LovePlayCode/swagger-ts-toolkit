// HTTP 客户端实现示例
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * 类型化的 HTTP 客户端
 */
class TypedHttpClient {
  private client: AxiosInstance;

  constructor(baseURL?: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 请求拦截器
    this.client.interceptors.request.use(
      (config) => {
        // 添加认证token等
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 响应拦截器
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        // 统一错误处理
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET 请求
   */
  async get<T>(url: string, params?: any): Promise<T> {
    const config: AxiosRequestConfig = {};
    if (params) {
      // 处理路径参数
      url = this.replacePathParams(url, params);
      // 处理查询参数
      config.params = this.extractQueryParams(params);
    }
    return this.client.get<T>(url, config);
  }

  /**
   * POST 请求
   */
  async post<T>(url: string, data?: any): Promise<T> {
    return this.client.post<T>(url, data);
  }

  /**
   * PUT 请求
   */
  async put<T>(url: string, data?: any): Promise<T> {
    return this.client.put<T>(url, data);
  }

  /**
   * DELETE 请求
   */
  async delete<T>(url: string, params?: any): Promise<T> {
    const config: AxiosRequestConfig = {};
    if (params) {
      url = this.replacePathParams(url, params);
      config.params = this.extractQueryParams(params);
    }
    return this.client.delete<T>(url, config);
  }

  /**
   * PATCH 请求
   */
  async patch<T>(url: string, data?: any): Promise<T> {
    return this.client.patch<T>(url, data);
  }

  /**
   * 替换路径参数
   */
  private replacePathParams(url: string, params: any): string {
    let processedUrl = url;
    const pathParams = url.match(/\{(\w+)\}/g);
    
    if (pathParams && params) {
      pathParams.forEach((param) => {
        const key = param.slice(1, -1); // 移除 { }
        if (params[key] !== undefined) {
          processedUrl = processedUrl.replace(param, params[key]);
        }
      });
    }
    
    return processedUrl;
  }

  /**
   * 提取查询参数（排除路径参数）
   */
  private extractQueryParams(params: any): any {
    if (!params) return undefined;
    
    const queryParams = { ...params };
    // 这里可以根据具体需求过滤掉路径参数
    
    return queryParams;
  }
}

// 创建默认实例
export const typedHttp = new TypedHttpClient(process.env.REACT_APP_API_BASE_URL);

// 导出类以便创建自定义实例
export { TypedHttpClient };